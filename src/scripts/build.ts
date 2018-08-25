import * as ReactDomServer from 'react-dom/server';
import * as React from 'react';
import { Index as IndexPage } from '../../page/Index';
import { Index } from '../templates/Index';
import * as webpack from 'webpack';
import { webpackconfig } from '../utils/webpackconfig';
import * as rimraf from 'rimraf';
import { awaitAllImports } from '../utils/loadableComponent';
import { renderStylesToString } from 'emotion-server';

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

const compile = () => {
    rimraf(webpackconfig.getOutputDirectory(), () => {});
    const config = webpackconfig.get();
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
    compile();
    const html = await renderHtml();
    const htmlWithInlinedCss = renderStylesToString(html);
    console.log(htmlWithInlinedCss);
};

main();
