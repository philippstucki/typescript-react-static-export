import * as webpack from 'webpack';
import { config } from './config';
import { webpackconfig } from './webpackconfig';

export namespace assets {
    export interface EntrypointAssets {
        [idx: string]: string[];
    }
    export const compile = async (config: config.Config) =>
        new Promise<EntrypointAssets>((resolve, reject) => {
            const webpackConfig = webpackconfig.get(config);
            const compiler = webpack(webpackConfig);

            compiler.run((err, stats) => {
                if (err) {
                    console.log(err);
                    reject();
                }

                const info = stats.toJson({});
                console.log(stats.toString());

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

                const epAssets: EntrypointAssets = {};
                for (const entry in info.entrypoints) {
                    epAssets[entry] = info.entrypoints[entry]
                        .assets as string[];
                }
                resolve(epAssets);
            });
        });
}
