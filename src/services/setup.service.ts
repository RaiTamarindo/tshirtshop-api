import * as crypto from 'crypto';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { injectable } from 'inversify';
import {
    AppConfig,
    IJWTConfig,
} from '../config/app.config';
import { AppSetup } from '../entities/dto/app-setup.cls';
import { APIError } from '../helpers/api-error.cls';
import { container } from '../inversify.config';
import { DatabaseConnectionService } from './database-connection.service';

/**
 * Application setup service class
 */
@injectable()
export class SetupService {

    private static readonly DEFAULT_EXPIRATION: number = 3000;

    private readonly dbConnService: DatabaseConnectionService;

    constructor(dbConnService: DatabaseConnectionService) {
        this.dbConnService = dbConnService;
    }

    /**
     * Makes settings on application
     * @param setup Application setup
     */
    public async setup(setup: AppSetup): Promise<void> {
        const jwtConfig: IJWTConfig = AppConfig.getJWT() || {
            secret: crypto.randomBytes(32)
                .toString('base64'),
            expiration: SetupService.DEFAULT_EXPIRATION,
        };
        try {
            await AppConfig.setDatabase(setup.database);
            await this.dbConnService.connect();
            jwtConfig.expiration = setup.jwtExpiration || jwtConfig.expiration;
            await AppConfig.setJWT(jwtConfig);
        } catch (err) {
            const message = typeof err === 'string' ? err : err.message || 'Application setup error.';
            const error = new APIError(message, UNPROCESSABLE_ENTITY);
            await AppConfig.setDatabase(null);

            return Promise.reject(error);
        }
    }

}

container.bind<SetupService>(SetupService)
    .to(SetupService);
