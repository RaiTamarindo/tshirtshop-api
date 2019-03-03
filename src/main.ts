import * as bodyParser from 'body-parser';
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { container } from './inversify.config';
import { errorHandler } from './middlewares/error-handler';
import { routes } from './routes/index.routes';
import { ServerApp } from './server';

export const app = container.get(ServerApp).getApp();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes);
app.use(errorHandler);
