import * as webpack from 'webpack';
import * as path from 'path';
import * as webpackMerge from 'webpack-merge';
import { config } from './config';

export namespace webpackconfig {
    const rootDir = () => path.resolve(__dirname, '../..');

    export const getOutputDirectory = () => path.resolve(rootDir(), './dist');

    export const get = (config: config.Config): webpack.Configuration =>
        webpackMerge(commonConfig(), {
            mode: 'production',
            context: config.context,
            entry: config.entry,
            output: {
                filename: 'bundle-[hash].js',
                chunkFilename: '[name].bundle-[hash].js'
            }
        });

    const commonConfig = (): webpack.Configuration => ({
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
            path: getOutputDirectory()
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                name: true
            }
        },
        stats: 'minimal'
    });
}
