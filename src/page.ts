import * as React from 'react';
import * as webpack from 'webpack';

export namespace page {
    export interface Page {
        path: string;
        entry: webpack.Entry;
        render: () => React.ReactElement<any>;
    }

    // export const define = (page: Page) => {
    //     pages.push(page);
    // };

    export const getEntry = (pages: Page[]) =>
        pages.map(p => p.entry).reduce((all, entry) => ({ ...all, ...entry }));
}
