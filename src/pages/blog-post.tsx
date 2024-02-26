import Html from '@kitajs/html';
import BaseLayout from '../layout/base.tsx';
import { marked } from 'marked';
import BlogNavigation from '../components/blog/nav.js';

const Page = (props: tBlogpage): Promise<string> | string => {
    const { metadata: meta, content } = props;
    const post = marked.parse(content);

    return (
        <BaseLayout
            class="text-lg flex mt-8 mx-2 flex-col md:flex-row lg:gap-8 gap-4 justify-center"
            title={`${meta.title} - Svenlaa`}
        >
            <div class="flex-1 max-w-[80ch]">
                <h1 class="text-3xl font-bold bg-gradient-to-br from-prime-800 dark:from-prime-700 to-prime-500 dark:to-prime-400 bg-clip-text text-transparent ">
                    {meta.title}
                </h1>
                <div class="text-gray-500 text-sm mt-1 mb-4 flex flex-col">
                    <span>posted on {new Date(meta.createdAt).toLocaleDateString()}</span>
                    {!!meta.updatedAt && (
                        <span>updated on {new Date(meta.updatedAt).toLocaleDateString()}</span>
                    )}
                </div>
                <article class="prose dark:prose-invert max-w-[80ch]">{post}</article>
            </div>
            <BlogNavigation />
        </BaseLayout>
    );
};

export default Page;
