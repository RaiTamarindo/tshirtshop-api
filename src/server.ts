import * as bodyParser from 'body-parser';
import * as express from 'express';
import {
    createServer,
    Server,
} from 'http';
import { createExpressServer } from 'routing-controllers';
import { AppConfig } from './config/app.config';
import {
    AccessControlController,
    UserController,
} from './controllers';
import { container } from './inversify.config';
import {
    ErrorHandlerMiddleware,
    ServiceNotFoundMiddleware,
    SetupCheckerMiddleware,
} from './middlewares';
import { DatabaseConnectionService } from './services';

/**
 * Server application class
 */
export class ServerApp {

    public static readonly PORT: number = 3000;
    private app: express.Application;
    private http: Server;
    private port: number;
    private readonly dbConnService: DatabaseConnectionService;

    constructor() {
        this.dbConnService = container.get<DatabaseConnectionService>(DatabaseConnectionService);
    }

    public async start(): Promise<void> {
        this.createApp();
        this.setup();
        this.createHTTPServer();
        if (!!AppConfig.getDatabase()) {
            await this.dbConnService.connect();
        }
        this.http.listen(this.port, () => {
            // tslint:disable-next-line:no-console
            console.log('Server running on port %s', this.port);
        });
    }

    private createApp(): void {
        this.app = createExpressServer({
            defaultErrorHandler: false,
            routePrefix: '/api',
            controllers: [
                AccessControlController,
                UserController,
            ],
            middlewares: [
                bodyParser.urlencoded({ extended: true }),
                bodyParser.json(),
                SetupCheckerMiddleware,
                ServiceNotFoundMiddleware,
                ErrorHandlerMiddleware,
            ],
        });
    }

    private createHTTPServer(): void {
        this.http = createServer(this.app);
    }

    private setup(): void {
        this.port = parseInt(process.env.PORT, 10);
        if (isNaN(this.port)) {
            this.port = ServerApp.PORT;
        }
    }

}
