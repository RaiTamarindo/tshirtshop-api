import * as nconf from 'nconf';

const options: nconf.IFileOptions = { file: `${__dirname}/config.json` };
const provider: nconf.Provider = nconf.file('config', options);

export namespace Config {

    // tslint:disable-next-line:no-reserved-keywords
    export function get(key: string) {
        return provider.get(key);
    }

    // tslint:disable-next-line:no-reserved-keywords
    export function set(key: string, value: any): Promise<void> {
        return new Promise((resolve: Function) => {
            provider.set(key, value);
            provider.save(resolve);
        });
    }

}
