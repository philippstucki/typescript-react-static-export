import * as webpack from 'webpack';
import * as path from 'path';
import * as webpackMerge from 'webpack-merge';

const babelOptions = {
    presets: [
        'react',
        [
            'es2015',
            {
                modules: false
            }
        ],
        'es2016'
    ]
};

export namespace webpackconfig {
    const rootDir = () => path.resolve(__dirname, '../..');
    export const getOutputDirectory = () => path.resolve(rootDir(), './dist');
    export const get = (): webpack.Configuration =>
        webpackMerge(commonConfig(), {
            mode: 'production',
            context: path.resolve(rootDir(), './page'),
            entry: { main: './main.ts' },
            output: {
                filename: '[name].[chunkhash].bundle.js',
                chunkFilename: '[name].chunk.js'
            }
        });

    const commonConfig = (): webpack.Configuration => ({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: 'babel-loader', options: babelOptions },
                        { loader: 'ts-loader' }
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [{ loader: 'babel-loader', options: babelOptions }]
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
                minSize: 1000,
                name: true
            }
        }
    });
}
