import Html from '@kitajs/html';
import type { BlogDatum } from '../index.tsx';
import BaseLayout from '../layout/base.tsx';
import { formatDateYMD } from '../util.ts';

const Page = ({ blogData }: { blogData: BlogDatum[] }) => {
    const blogMeta = blogData.map((i) => i.metadata);
    console.log(blogMeta);
    return (
        <BaseLayout class="text-lg flex mt-8 mx-2 flex-col md:flex-row lg:gap-8 gap-4 justify-center">
            <div class="flex flex-col h-min gap-4">
                <div class="flex flex-row gap-4">
                    <a
                        href="/blog.xml"
                        target="_blank"
                        rel="noreferrer"
                        class=" text-orange-400 font-bold text-2xl bg-white py-1 px-2 rounded-sm shadow-sm hover:text-orange-500 hover:bg-gray-50 hover:shadow-md "
                    >
                        <span class="bi bi-rss-fill mr-2" />
                        RSS
                    </a>
                </div>
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
