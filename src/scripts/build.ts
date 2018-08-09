import * as ReactDomServer from 'react-dom/server';
import * as React from 'react';
import { Index as IndexPage } from '../../page/Index';
import { Index } from '../templates/Index';
import * as webpack from 'webpack';
import { webpackconfig } from '../utils/webpackconfig';
import * as rimraf from 'rimraf';

const renderComponentToString = (C: React.ReactElement<any>) =>
    ReactDomServer.renderToString(C);

const renderHtml = () =>
    renderComponentToString(
        React.createElement(Index, {}, React.createElement(IndexPage))
    );

const compile = () => {
    rimraf(webpackconfig.getOutputDirectory(), () => {});

    const compiler = webpack(webpackconfig.get());

    compiler.run((err, stats) => {
        if (err) {
            console.log(err);
        }
        const info = stats.toJson();
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

console.log(renderHtml());
compile();
