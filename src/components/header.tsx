import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse, faRunning, faX, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Html } from '@kitajs/html';

type pathType = {
    href: string;
    label: string;
};

const paths: Readonly<pathType[]> = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
] as const;
console.log(paths);

const Header = ({ path: string }) => {
    const isOpen = false;
    return (
        <header class="z-50 mx-auto w-screen md:container">
            <div class="mx-auto flex w-full flex-row justify-between bg-white p-4 drop-shadow-md dark:bg-black md:bg-inherit">
                <a
                    href="/"
                    class="my-auto text-3xl duration-200 ease-in hover:text-prime-900 dark:hover:text-prime-200"
                >
                    Svenlaa
                </a>

                {/* Section with hamburger for smaller screens */}
                <div class="flex flex-row md:hidden ">
                    <button
                        class="translate aspect-square rounded-full bg-prime-600 text-3xl text-white"
                        aria-label="hamburger menu"
                        type="button"
                        onclick={() => setIsOpen(!isOpen)}
                    >
                        {/*<FontAwesomeIcon*/}
                        {/*    icon={isOpen ? faX : faBars}*/}
                        {/*    class="aspect-square scale-90 p-2"*/}
                        {/*/>*/}
                    </button>
                </div>

                {/* Section that shows tabs on larger screens */}
                <div class="hidden gap-4 md:flex md:flex-row">
                    {paths.map((path) => (
                        <HeaderLink to={path.href} isActive={path.href === path} key={path.href}>
                            {path.label}
                        </HeaderLink>
                    ))}
                </div>
            </div>

            {/* Dropdown for smaller screens */}
            <div
                class={`${
                    isOpen ? 'flex ' : 'hidden'
                } absolute w-full flex-col rounded-b-xl bg-white px-4 drop-shadow-md dark:bg-gray-900 md:hidden`}
            >
                {paths.map((path) => (
                    <HeaderLink to={path.href} isActive={path.href === path} key={path.href}>
                        {path.label}
                    </HeaderLink>
                ))}
            </div>
        </header>
    );
};

type LinkProps = {
    to: string;
    children: ReactNode;
    isActive?: boolean;
};

const HeaderLink = (props: LinkProps) => {
    const { to, children } = props;
    return (
        <a
            href={to}
            class={`${
                props.isActive
                    ? 'text-prime-700 md:bg-prime-700 md:text-white md:hover:bg-prime-600'
                    : 'hover:text-prime-700 md:bg-white md:text-gray-800 md:hover:bg-prime-700 md:hover:text-white md:dark:bg-gray-800 md:dark:text-gray-400'
            } transition-text whitespace-nowrap rounded-md p-2 px-3 text-xl drop-shadow-sm delay-75 duration-500 ease-out`}
        >
            {children}
        </a>
    );
};

export default Header;
