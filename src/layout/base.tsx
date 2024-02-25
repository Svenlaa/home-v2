import Html from '@kitajs/html';
import Header from '../components/header';
import IntrinsicElements = JSX.IntrinsicElements;

type Props = {
    title?: string;
    path: string;
} & IntrinsicElements['main'];
const BaseLayout = (props: Props) => {
    const { children, title, path } = props;
    const className = `gutter z-10 mx-auto h-full w-full flex-grow px-4 md:container ${
        props?.class ?? ''
    }`.trim();

    //remove extracted elements from props
    props.children = undefined;
    props.class = undefined;
    props.title = undefined;
    props.path = undefined;
    // noinspection HtmlUnknownTarget
    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="en" data-generated={new Date().toISOString().split('T')[0]}>
                <head>
                    <title>{title ?? 'Svenlaa'}</title>
                    <link rel="stylesheet" href="style.css" />
                    <script src="https://unpkg.com/alpinejs" defer />
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
                    />
                </head>
                <body class="relative flex min-h-screen w-full flex-col">
                    <Header path={path} />
                    <main
                        style={{ scrollbarGutter: 'stable both-edges' }}
                        {...props}
                        x-data="{show: false}"
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
