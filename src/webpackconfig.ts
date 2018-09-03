import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import { config } from './config';

export namespace webpackconfig {
    export const get = (config: config.Config): webpack.Configuration =>
        webpackMerge(commonConfig(config), {
            mode: config.mode,
            context: config.context,
            entry: config.entry,
            output: {
                filename: 'bundle-[name]-[hash].js'
            }
        });

    const commonConfig = (config: config.Config): webpack.Configuration => ({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                    ]
                }
            ]
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },

        output: {
            path: config.outputDirectory
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                name: true
            }
        },
        stats: 'normal'
    });
}
