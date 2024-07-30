import { Html } from '@kitajs/html';

const Footer = () => {
    return (
        <footer class="z-50 flex flex-row items-end justify-end content-end">
            <span class="text-green-600 p-3 first:rounded-t-lg bg-gray-50/50 dark:bg-white/10">
                <i class="text-md pr-2">🍃</i>
                Powered by renewable energy
            </span>
        </footer>
    );
};

export default Footer;
