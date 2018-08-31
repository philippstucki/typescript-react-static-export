import * as webpack from 'webpack';
import * as path from 'path';
import * as webpackMerge from 'webpack-merge';

export namespace webpackconfig {
    const rootDir = () => path.resolve(__dirname, '../..');

    export const getOutputDirectory = () => path.resolve(rootDir(), './dist');

    export const get = (entry: webpack.Entry): webpack.Configuration =>
        webpackMerge(commonConfig(), {
            mode: 'production',
            context: path.resolve(rootDir(), './page'),
            entry: entry /* { main: './main.ts', Index: './Index.tsx' }, */,
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
