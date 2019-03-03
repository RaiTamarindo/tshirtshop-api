import * as bodyParser from 'body-parser';
import * as express from 'express';
import {
    createServer,
    Server,
} from 'http';
import { createExpressServer } from 'routing-controllers';
import {
    ErrorHandlerMiddleware,
    ServiceNotFoundMiddleware,
} from './middlewares';

/**
 * Server application class
 */
export class ServerApp {

    public static readonly PORT: number = 3000;
    private app: express.Application;
    private http: Server;
    private port: number;

    public start(): void {
        this.createApp();
        this.setup();
        this.createHTTPServer();
        this.http.listen(this.port, () => {
            // tslint:disable-next-line:no-console
            console.log('Server running on port %s', this.port);
        });
    }

    private createApp(): void {
        this.app = createExpressServer({
            routePrefix: '/api',
            controllers: [],
            middlewares: [
                ServiceNotFoundMiddleware,
                ErrorHandlerMiddleware,
            ],
        });
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
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
