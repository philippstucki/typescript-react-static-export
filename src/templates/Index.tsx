import * as React from 'react';
import { ReactHelpers } from '../utils/ReactHelpers';

interface IndexProps extends ReactHelpers.HasChildren {
    title: string;
}
export const Index = (p: IndexProps) => (
    <html className="no-js">
        <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1"
            />
            <title>{p.title}</title>
        </head>
        <body>
            <div id="main">{p.children}</div>
        </body>
    </html>
);
