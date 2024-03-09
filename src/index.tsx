import { Html } from '@kitajs/html';
import { mkdir, rm, writeFile, cp, readdir, readFile } from 'node:fs/promises';
import { run } from './util.ts';
import Index from './pages/index.tsx';
import BlogPost, { getDescription } from './pages/blog-post.tsx';
import parseMD from 'parse-md';
import ErrorPage from './pages/error.tsx';
import { markdownToTxt } from 'markdown-to-txt';

// biome-ignore lint/correctness/noEmptyPattern:
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type JSX = ({}: { [k: string]: any }) => string | Promise<string>;
export let PATH = '/';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type tPage = { path: string; Page: JSX; props?: { [k: string]: any } };
const pages: tPage[] = [
    {
        path: '/',
        Page: Index,
    },
    {
        path: '/404',
        Page: ErrorPage,
        props: {
            code: 404,
            message: 'Page not found',
            links: [{ label: 'Home', href: '/' }],
        },
    },
    {
        path: '/500',
        Page: ErrorPage,
        props: {
            code: 500,
            message: 'Internal server error',
            links: [{ label: 'Home', href: '/' }],
        },
    },
];

export type BlogMetadata = {
    longTitle?: string;
    title: string;
    createdAt: Date;
    updatedAt?: Date;
};
type BlogDatum = { content: string; metadata: BlogMetadata };
export const blogData: (BlogDatum & { path: string })[] = [];

const getBlogFilenames = async (): Promise<string[]> => {
    const filenames = await readdir('posts');
    if (!filenames.length) return [];
    await mkdir('dist/blog');
    return filenames;
};

const populateBlogData = async (slugs: string[]): Promise<void> => {
    for (const slug of slugs) {
        const file = await readFile(`posts/${slug}`, { encoding: 'utf8' });
        const datum = parseMD(file) as BlogDatum;
        blogData.push({ ...datum, path: `/blog/${slug.replace('.md', '')}` });
    }
    blogData.sort((a, b) => b.metadata.createdAt.getTime() - a.metadata.createdAt.getTime());
};

const renderBlog = async (): Promise<void> => {
    const filenames = await getBlogFilenames();
    if (!filenames.length) return;
    await populateBlogData(filenames);
    await renderPage({
        Page: ErrorPage,
        path: '/blog/404',
        props: {
            code: 404,
            message: 'Post not found',
            links: [
                { label: 'Home', href: '/' },
                { label: 'Latest Post', href: blogData[0].path },
            ],
        },
    });
    const rssItems: string[] = [];
    for (const blogDatum of blogData) {
        const { path, ...props } = blogDatum;
        const description = getDescription(markdownToTxt(props.content));
        rssItems.push(
            `<item><title>${
                props.metadata.title
            }</title><pubDate>${props.metadata.createdAt.toDateString()}</pubDate><link>https://svenlaa.com${path}</link><guid>https://svenlaa.com${path}</guid><description>${description}</description></item>`,
        );
        await renderPage({ Page: BlogPost, path, props });
    }
    const rss = `<rss version="2.0"><channel><title>Svenlaa</title><link>https://svenlaa.com</link><description>My blog</description>${rssItems.join(
        '',
    )}</channel>`;

    await render('/blog.xml', rss);
};

const render = async (path: string, content: string): Promise<void> => {
    await writeFile(`dist${path}`, content);
};

const renderPage = async (renderProps: tPage): Promise<void> => {
    const { path, Page, props } = renderProps;
    console.log(`Generating ${path === '/' ? 'index' : path}.html`);
    PATH = path;
    const html = await (<Page {...props} />);
    if (path === '/') {
        await render('/index.html', html);
        return;
    }
    await render(`${path}.html`, html);
};

const initDist = async (): Promise<void> => {
    await rm('dist', { recursive: true, force: true });
    await mkdir('dist');
    await cp('static', 'dist', { recursive: true });
};

const boot = async (): Promise<number> => {
    const now = Date.now();
    await initDist();
    await renderBlog();
    for (const page of pages) {
        await renderPage(page);
    }
    return Date.now() - now;
};

boot().then((duration) => {
    console.log(`\nDone in ${duration}ms`);
    run('pnpm build:css');
});
