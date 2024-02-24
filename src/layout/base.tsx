import Html from '@kitajs/html';
import Header from '../components/header';

type BaseLayoutProps = { children: JSX.Element; title?: string; path: string };
const BaseLayout = ({ children, title = 'Svenlaa', path }: BaseLayoutProps) => {
    // noinspection HtmlUnknownTarget
    return (
        <html lang="en">
            <head>
                <title>{title}</title>
                <link rel="stylesheet" href="style.css" />
            </head>
            <body>
                <Header path={path} />
                <main>{children}</main>
            </body>
        </html>
    );
};

export default BaseLayout;
