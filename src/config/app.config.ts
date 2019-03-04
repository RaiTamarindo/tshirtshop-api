import { Config } from './config';

export interface IDatabaseConfig {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
}

export interface IJWTConfig {
    privateKey: string;
    publicKey: string;
    bearerExp?: number;
    refreshExp?: number;
}

export namespace AppConfig {

    export const getDatabase = (): IDatabaseConfig => Config.get('database');
    export const getJWT = (): IJWTConfig => {
        const jwtConfig = Config.get('jwt');
        jwtConfig.bearerExp = parseInt(jwtConfig.bearerExp, 10);
        jwtConfig.refreshExp = parseInt(jwtConfig.refreshExp, 10);

        return jwtConfig;
    };
    export const setDatabase = (config: IDatabaseConfig): Promise<void> => Config.set('database', config);
    export const setJWT = (config: IJWTConfig): Promise<void> => Config.set('jwt', config);

}
