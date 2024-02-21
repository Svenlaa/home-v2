import Html from '@kitajs/html';

type BaseLayoutProps = { children: JSX.Element; title?: string };
const BaseLayout = ({ children, title = 'Svenlaa' }: BaseLayoutProps) => {
    // noinspection HtmlUnknownTarget
    return (
        <html lang="en">
            <head>
                <title>{title}</title>
                <link rel="stylesheet" href="style.css" />
            </head>
            <body>{children}</body>
        </html>
    );
};

export default BaseLayout;
