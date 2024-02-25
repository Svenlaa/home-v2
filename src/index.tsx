import { Html } from '@kitajs/html';
import { mkdir, rm, writeFile, cp } from 'node:fs/promises';
import { run } from './util';
import Index from './pages/index';

type tPage = ({ path }: { path: string }) => string | Promise<string>;

const pages: { path: string; Page: tPage }[] = [
    {
        path: '/',
        Page: Index,
    },
];

const renderPage = async (Page: tPage, path: string): Promise<void> => {
    console.log(`Generating ${path === '/' ? 'index' : path}.html`);
    const html = await (<Page path={path === 'index' ? '/' : path} />);
    if (path === '/') {
        await writeFile('dist/index.html', html);
        return;
    }
    await writeFile(`dist/${path}.html`, html);
};

const boot = async (): Promise<number> => {
    const now = Date.now();
    await rm('dist', { recursive: true, force: true });
    await mkdir('dist');
    await cp('static', 'dist', { recursive: true });
    for (const page of pages) {
        await renderPage(page.Page, page.path);
    }
    return Date.now() - now;
};

boot().then((duration) => {
    console.log(`\nDone in ${duration}ms`);
    run('pnpm build:css');
});
