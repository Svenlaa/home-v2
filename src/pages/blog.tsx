import type { BlogDatum } from '../index.tsx';
import BaseLayout from '../layout/base.tsx';
import Html from '@kitajs/html';
import { formatDateYMD } from '../util.ts';

const Page = ({ blogData }: { blogData: BlogDatum[] }) => {
    const blogMeta = blogData.map((i) => i.metadata);
    console.log(blogMeta);
    return (
        <BaseLayout class="text-lg flex mt-8 mx-2 flex-col md:flex-row lg:gap-8 gap-4 justify-center">
            <div class="flex flex-col h-min gap-4">
                {blogData.map((i) => {
                    return (
                        <a href={i.path} class="flex flex-row flex-1 items-end group">
                            <span class="w-28 text-sm text-gray-500 group-hover:text-gray-900">
                                {formatDateYMD(i.metadata.createdAt)}
                            </span>
                            <h2 class="flex-grow group-hover:text-prime-600">
                                {i.metadata.longTitle ?? i.metadata.title}
                            </h2>
                        </a>
                    );
                })}
            </div>
        </BaseLayout>
    );
};

export default Page;
