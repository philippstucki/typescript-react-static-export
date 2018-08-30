import * as ReactDomServer from 'react-dom/server';
import * as React from 'react';
import { Index as IndexPage } from '../page/Index';
import { Index } from '../src/templates/Index';
import * as webpack from 'webpack';
import { webpackconfig } from '../src/utils/webpackconfig';
import * as rimraf from 'rimraf';
import { awaitAllImports } from '../src/utils/loadableComponent';
import { renderStylesToString } from 'emotion-server';
import { page } from '../src/page';

const renderHtml = async (): Promise<string> => {
    await awaitAllImports();
    return ReactDomServer.renderToString(
        React.createElement(
            Index,
            {},
            React.createElement(IndexPage, { route: 'about' })
        )
    );
};

const compileAssets = (entry: webpack.Entry) => {
    rimraf(webpackconfig.getOutputDirectory(), () => {});
    const config = webpackconfig.get(entry);
    const compiler = webpack(config);

    compiler.run((err, stats) => {
        if (err) {
            console.log(err);
        }
        const info = stats.toJson({});
        if (stats.hasErrors()) {
            console.log(info.errors);
        }
        if (stats.hasWarnings()) {
            console.log(info.warnings);
        }

        if (!err && info && info.assets) {
            for (const asset of info.assets) {
                console.log(`${asset.name} (${asset.size})`);
            }
        }
    });
};

const main = async () => {
    const IndexEntry = { Index: './Index.tsx' };
    const IndexRender = () =>
        React.createElement(
            Index,
            {},
            React.createElement(IndexPage, { route: 'about' })
        );

    const pages: page.Page[] = [
        {
            path: '/',
            entry: IndexEntry,
            render: IndexRender
        }
    ];

    const entry = {
        ...page.getEntry(pages),
        main: './main.ts'
    };

    compileAssets(entry);

    const html = await renderHtml();
    const htmlWithInlinedCss = renderStylesToString(html);
    console.log(htmlWithInlinedCss);
};

main();
