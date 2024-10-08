import { Html } from '@kitajs/html';
import BaseLayout from '../layout/base.tsx';

const Page = (): Promise<string> | string => {
    const profile = {
        name: 'Sven Lammertink',
        pictureUrl: '/Svenlaa.webp',
        role: 'Web developer',
        links: [
            { href: 'https://github.com/Svenlaa', icon: 'bi-github', label: 'GitHub' },
            { href: 'https://gitlab.com/Svenlaa', icon: 'bi-gitlab', label: 'GitLab' },
            {
                href: 'https://linkedin.com/in/svenlaa',
                icon: 'bi-linkedin',
                label: 'LinkedIn',
            },
            {
                href: 'https://mas.to/@Svenlaa',
                icon: 'bi-mastodon',
                label: 'Mastodon'
            },
            {
                href: 'mailto:mail@svenlaa.com',
                icon: 'bi-envelope-fill',
                label: 'email',
            },
        ],
    };

    return (
        <BaseLayout class="flex h-full items-center justify-center">
            <div class="m-4 flex flex-col rounded-2xl bg-white/50 p-8 pb-4 drop-shadow-2xl dark:bg-white/10">
                <span class="relative mx-auto h-72 w-72">
                    <img
                        src={profile.pictureUrl}
                        alt={profile.name}
                        class="aspect-square rounded-lg shadow-inner"
                    />
                </span>
                <span class="mx-auto mt-4 text-center text-2xl font-bold dark:text-gray-200">
                    {profile.name}
                </span>
                <span class="text-center text-gray-600 dark:text-gray-400">{profile.role}</span>
                {profile.links && (
                    <div class="my-2 flex flex-row justify-center gap-2">
                        {profile.links.map((l) => (
                            <ProfileLink href={l.href} icon={l.icon} label={l.label} />
                        ))}
                    </div>
                )}
            </div>
        </BaseLayout>
    );
};

type pathType = {
    readonly href: string;
    readonly icon: string;
    readonly label: string;
};
const ProfileLink = (props: pathType) => {
    return (
        <div class="relative rounded-md bg-white/80 dark:bg-black/80 drop-shadow-sm justify-center h-8 w-8 text-lg text-black/80 transition-colors duration-200 hover:bg-gray-300 dark:text-gray-400 md:hover:bg-prime-700 md:hover:text-white">
            <div class="opacity-0 bg-prime-700 absolute h-full w-full top-0 -z-50 rounded-lg" />
            <a
                href={props.href}
                target="_blank"
                aria-label={props.label}
                class="h-full w-full flex justify-center items-center flex-row "
                rel={props.icon === 'bi-mastodon' ? 'me' : 'noreferrer'}
                title={props.label}
            >
                <i class={`${props.icon}`} />
            </a>
        </div>
    );
};

export default Page;
