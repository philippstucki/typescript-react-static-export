import * as React from 'react';
import * as rimraf from 'rimraf';
import * as path from 'path';
import * as fs from 'fs';
import { Index } from '../page/Index';
import { awaitAllImports } from '../src/utils/loadableComponent';
import { renderStylesToString } from 'emotion-server';
import { page } from '../src/page';
import { assets } from '../src/assets';
import { config } from '../src/config';
import { html } from '../src/html';
import { templates } from './templates';
import { arrayUtils } from '../src/utils/arrayUtils';

const main = async () => {
    const rootDir = path.resolve(__dirname, '..');

    // defines a entry point which and respective renderer which are reused in the pages array below
    const IndexEntry = { Index: './Index.tsx' };
    const IndexRender = () => React.createElement(Index, { route: 'about' });

    // defines all pages and their respective routes
    const pages: page.Page[] = [
        {
            path: 'index.html',
            entry: IndexEntry,
            render: IndexRender
        }
    ];

    // define webpack entry points.
    // main.ts is added here as the main app entry point. The rest is derived from the pages array
    const entrypoints = {
        ...page.getEntry(pages),
        main: './main.ts'
    };

    const config: config.Config = {
        mode: 'development',
        outputDirectory: path.resolve(rootDir, './dist'),
        context: path.resolve(rootDir, './page'),
        entry: entrypoints
    };

    // wait for all dynamic imports to finish
    await awaitAllImports();

    // clean output directory
    rimraf(config.outputDirectory, () => {});
    // fs.mkdirSync(config.outputDirectory);

    // compile all chunks using webpack
    const assetsByEntry = await assets.compile(config);
    const assetFiles: string[] = [];
    for (const entry in assetsByEntry) {
        assetFiles.push(...assetsByEntry[entry]);
    }

    for (const page of pages) {
        const pageHtml = templates.index({
            title: 'Hello World',
            scripts: arrayUtils
                .uniq(assetFiles)
                .map(asset => `<script src="${asset}"></script>`)
                .reduce((a, e) => a + e, ''),
            html: html.renderPage(page)
        });
        const pageHtmlCss = renderStylesToString(pageHtml);
        fs.writeFileSync(
            path.resolve(config.outputDirectory, page.path),
            pageHtmlCss
        );
    }
};

main();
