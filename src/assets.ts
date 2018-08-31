import * as webpack from 'webpack';
import { config } from './config';
import { webpackconfig } from './webpackconfig';

export namespace assets {
    export const compile = (config: config.Config) => {
        const webpackConfig = webpackconfig.get(config);
        const compiler = webpack(webpackConfig);

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
}
