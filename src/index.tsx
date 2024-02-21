import { Html } from '@kitajs/html';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import BaseLayout from './layout/base';
import HomePage from './pages/home';

const pages = [
    {
        path: 'index',
        element: <HomePage />,
    },
];

const renderPage = async (element: string | Promise<string>, path: string): Promise<void> => {
    console.log(`Generating ${path}.html`);
    const html = await (<BaseLayout>{element}</BaseLayout>);
    await writeFile(`dist/${path}.html`, html);
};

const boot = async (): Promise<number> => {
    const now = Date.now();
    await rm('dist', { recursive: true, force: true });
    await mkdir('dist');
    for (const page of pages) {
        await renderPage(page.element, page.path);
    }
    return Date.now() - now;
};

boot().then((duration) => {
    console.log(`\nDone in ${duration}ms`);
});
