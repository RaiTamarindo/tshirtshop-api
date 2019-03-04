import { injectable } from 'inversify';
import {
    Connection,
    createConnection,
    getConnection,
} from 'typeorm';
import {
    AppConfig,
    IDatabaseConfig,
} from '../config/app.config';
import { User } from '../entities';
import { container } from '../inversify.config';

/**
 * Database connection service class
 */
@injectable()
export class DatabaseConnectionService {

    public async connect(): Promise<Connection> {
        const config: IDatabaseConfig = AppConfig.getDatabase();
        const create = () => {
            return createConnection({
                type: 'mysql',
                host: config.host,
                port: config.port,
                username: config.username,
                password: config.password,
                database: config.database,
                entities: [
                    User,
                ],
            });
        };

        try {
            const connection = getConnection();
            if (connection.isConnected) {
                await connection.close();
            }
        } catch {
            //
        }

        return create();
    }

}

container.bind<DatabaseConnectionService>(DatabaseConnectionService).to(DatabaseConnectionService);
