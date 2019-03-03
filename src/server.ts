import * as express from 'express';
import {
    createServer,
    Server,
} from 'http';
import { injectable } from 'inversify';
import { container } from './inversify.config';

/**
 * Server application class
 */
@injectable()
export class ServerApp {

    public static readonly PORT: number = 3000;
    private app: express.Application;
    private http: Server;
    private port: number;

    constructor() {
        this.createApp();
        this.setup();
        this.createHTTPServer();
        this.start();
    }

    public getApp(): express.Application {
        return this.app;
    }

    private createApp(): void {
        this.app = express();
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

    private start(): void {
        this.http.listen(this.port, () => {
            // tslint:disable-next-line:no-console
            console.log('Server running on port %s', this.port);
        });
    }

}

container.bind<ServerApp>(ServerApp)
    .to(ServerApp);
