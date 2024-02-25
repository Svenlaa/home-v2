import { Html } from '@kitajs/html';
import { mkdir, rm, writeFile, cp, readdir, readFile } from 'node:fs/promises';
import { run } from './util.ts';
import Index from './pages/index.tsx';
import BlogPost from './pages/blog-post.tsx';
import parseMD from 'parse-md';

// biome-ignore lint/correctness/noEmptyPattern:
export type JSX = ({}: { [k: string]: string | number }) => string | Promise<string>;
export let PATH = '/';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type tPage = { path: string; Page: JSX; props?: { [k: string]: any } };
const pages: tPage[] = [
    {
        path: '/',
        Page: Index,
    },
];

export type BlogMetadata = {
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
    for (const blogDatum of blogData) {
        const { path, ...props } = blogDatum;
        await renderPage({ Page: BlogPost, path, props });
    }
};

const renderPage = async (renderProps: tPage): Promise<void> => {
    const { path, Page, props } = renderProps;
    console.log(`Generating ${path === '/' ? 'index' : path}.html`);
    PATH = path;
    const html = await (<Page {...props} />);
    if (path === '/') {
        await writeFile('dist/index.html', html);
        return;
    }
    await writeFile(`dist${path}.html`, html);
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
