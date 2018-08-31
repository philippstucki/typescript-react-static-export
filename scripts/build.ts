import * as React from 'react';
import * as rimraf from 'rimraf';
import * as path from 'path';
import { Index } from '../page/Index';
import { awaitAllImports } from '../src/utils/loadableComponent';
import { renderStylesToString } from 'emotion-server';
import { page } from '../src/page';
import { assets } from '../src/assets';
import { config } from '../src/config';
import { html } from '../src/html';

const main = async () => {
    const rootDir = path.resolve(__dirname, '..');

    // defines a entry point which and respective renderer which are reused in the pages array below
    const IndexEntry = { Index: './Index.tsx' };
    const IndexRender = () => React.createElement(Index, { route: 'about' });

    // defines all pages and their respective routes
    const pages: page.Page[] = [
        {
            path: '/',
            entry: IndexEntry,
            render: IndexRender
        }
    ];

    // define webpack entry points.
    // main.ts is added here as the main app entry point. The rest is derived from the pages array
    const entry = {
        ...page.getEntry(pages),
        main: './main.ts'
    };

    const config: config.Config = {
        mode: 'production',
        outputDirectory: path.resolve(rootDir, './dist'),
        context: path.resolve(rootDir, './page'),
        entry: entry
    };

    // clean output directory
    rimraf(config.outputDirectory, () => {});

    assets.compile(config);

    // wait for all dynamic imports to finish
    await awaitAllImports();

    for (const page of pages) {
        const pageHtml = html.renderPage(page);
        const pageHtmlCss = renderStylesToString(pageHtml);
        console.log(pageHtmlCss);
    }
};

main();
