import Html from '@kitajs/html';

type BaseLayoutProps = { children: JSX.Element; title?: string };
const BaseLayout = ({ children, title = 'Svenlaa' }: BaseLayoutProps) => {
    return (
        <html lang="en">
            <head>
                <title>{title}</title>
            </head>
            <body>{children}</body>
        </html>
    );
};

export default BaseLayout;
