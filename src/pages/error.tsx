import BaseLayout from '../layout/base.js';
import Html from '@kitajs/html';
import { JSX } from './../index.tsx';

type Props = {
    code: string;
    message: string;
    links: {
        href: string;
        label: string;
    }[];
};

const Page = ({ code, message, links }: Props): string | Promise<string> => {
    return (
        <BaseLayout class="flex flex-col  items-center justify-center">
            <div class="flex flex-col justify-between">
                <div class="flex flex-col flex-grow items-center justify-center p-6 rounded-2xl bg-white/50 shadow-2xl dark:bg-white/10 text-lg w-[30ch] h-[30ch">
                    <h3 class="text-5xl font-bold dark:text-red-700 text-red-600">{code}</h3>
                    <span class="dark:text-red-800 text-red-700">{message}</span>
                </div>
                <div class="flex flex-row gap-2 m-4">
                    {!!links.length &&
                        links.map((l) => (
                            <a
                                href={l.href}
                                class="whitespace-nowrap shadow-sm rounded-md bg-prime-600 py-1 px-2 text-white transition-colors duration-200 hover:bg-prime-700"
                            >
                                {l.label}
                            </a>
                        ))}
                </div>
            </div>
        </BaseLayout>
    );
};

export default Page;
