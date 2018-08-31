import * as webpack from 'webpack';

export namespace config {
    export type mode = 'development' | 'production' | 'none';
    export interface Config {
        outputDirectory: string;
        mode: mode;
        context: string;
        entry: webpack.Entry;
    }
}
