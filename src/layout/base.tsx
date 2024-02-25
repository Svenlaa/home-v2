import Html from '@kitajs/html';
import Header from '../components/header';
import IntrinsicElements = JSX.IntrinsicElements;

type Props = {
    title?: string;
} & IntrinsicElements['main'];
const BaseLayout = (props: Props) => {
    const { children, title } = props;
    const className = `gutter z-10 mx-auto h-full w-full flex-grow px-4 md:container ${
        props?.class ?? ''
    }`.trim();

    //remove extracted elements from props
    props.children = undefined;
    props.class = undefined;
    props.title = undefined;
    // noinspection HtmlUnknownTarget
    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="en" data-generated={new Date().toISOString().split('T')[0]}>
                <head>
                    <title>{title ?? 'Svenlaa'}</title>
                    <link rel="stylesheet" href="/style.css" />
                    <link rel="stylesheet" href="/marked.css" />
                    <script src="https://unpkg.com/alpinejs" defer />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
                        rel="stylesheet"
                    />

                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
                    />
                </head>
                <body class="relative flex min-h-screen w-full flex-col bg-white dark:bg-stone-900">
                    <Header />
                    <main
                        style={{ scrollbarGutter: 'stable both-edges' }}
                        {...props}
                        class={`gutter z-10 mx-auto h-full w-full flex-grow px-4 md:container ${className}`}
                    >
                        {children}
                    </main>
                </body>
            </html>
        </>
    );
};

export default BaseLayout;
