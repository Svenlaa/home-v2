import { Html } from '@kitajs/html';
import { PATH, blogData } from '../index.js';

type Path = {
    href: string;
    label: string;
    icon?: string;
};

const Header = () => {
    const paths: Readonly<Path[]> = [
        { href: '/', label: 'Home', icon: 'bi-house' },
        { href: '/blog', label: 'Blog', icon: 'bi-newspaper' },
    ] as const;
    return (
        <header
            class="z-50 w-full bg-gray-50/50 dark:bg-white/10 backdrop-blur-xl"
            x-data="{open: false}"
        >
            <div class="md:container mx-auto">
                <div class="mx-auto flex w-full flex-row justify-between p-4 drop-shadow-md md:bg-inherit">
                    <a
                        href="/"
                        class="my-auto text-3xl duration-200 ease-in hover:text-prime-900 dark:text-white dark:hover:text-prime-200"
                    >
                        Svenlaa
                    </a>

                    {!!paths.length && (
                        <>
                            {/* Section with hamburger for smaller screens */}
                            <div class="flex flex-row md:hidden ">
                                <button
                                    class="translate aspect-square rounded-full bg-prime-600 text-3xl text-white"
                                    aria-label="hamburger menu"
                                    type="button"
                                    x-on:click="open = !open"
                                >
                                    <i
                                        x-bind:class="{'bi-list': !open, 'bi-x': open}"
                                        class="bi-list aspect-square scale-90 p-2"
                                    />
                                </button>
                            </div>

                            {/* Section that shows tabs on larger screens */}
                            <div class="hidden gap-4 md:flex md:flex-row">
                                {paths.map((p) => (
                                    <HeaderLink to={p.href} key={p.href} icon={p.icon}>
                                        {p.label}
                                    </HeaderLink>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Dropdown for smaller screens */}
                {!!paths.length && (
                    <div
                        x-bind:class="{'flex': open, 'hidden': !open}"
                        class="absolute w-full hidden flex-col rounded-b-xl px-4 drop-shadow-md md:hidden backdrop-blur-xl bg-gray-50/50 dark:bg-white/10"
                    >
                        {paths.map((p) => (
                            <HeaderLink to={p.href} key={p.href} icon={p.icon}>
                                {p.label}
                            </HeaderLink>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
};

type LinkProps = {
    to: string;
    children: ReactNode;
    icon?: string;
};

const HeaderLink = (props: LinkProps) => {
    const { to, children, icon } = props;
    const isActive = to === PATH || (to !== '/' && PATH.startsWith(to));
    return (
        <a
            href={to === '/blog' ? blogData[0].path : to}
            class={`${
                isActive
                    ? 'text-prime-700 md:bg-prime-700 md:text-white md:hover:bg-prime-600 dark:text-prime-500 md:dark:text-prime-50'
                    : 'text-prime-950 hover:text-prime-700 md:bg-white md:text-prime-800 md:hover:bg-prime-700 md:hover:text-white dark:md:bg-gray-800 dark:text-prime-50 dark:hover:text-prime-500 dark:md:hover:text-prime-50'
            } transition-text whitespace-nowrap rounded-md p-2 px-3 text-xl drop-shadow-sm delay-75 duration-500 ease-out`}
        >
            {icon ? <i class={`${icon} text-md pr-2`} /> : null}
            {children}
        </a>
    );
};

export default Header;
