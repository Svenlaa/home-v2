import Html from '@kitajs/html';
import { blogData, PATH } from '../../index.js';

const BlogNavigation = async () => {
    return (
        <nav class="w-72 p-8 bg-white/50 rounded-b-none drop-shadow-2xl rounded-2xl dark:bg-white/10">
            <ul>
                {blogData.map((datum) => (
                    <li>
                        <a
                            href={datum.path}
                            class="text-prime-700 hover:text-prime-800 dark:text-prime-600 dark:hover:text-prime-700"
                        >
                            <h5 class={`inline ${PATH === datum.path ? 'font-bold' : ''}`}>
                                {datum.metadata.title}
                            </h5>
                            <span class="text-gray-500 ms-2 text-sm">
                                {new Date(datum.metadata.createdAt).toLocaleDateString()}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default BlogNavigation;
