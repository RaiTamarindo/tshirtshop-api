// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { ServerApp } from './server';

export const server: ServerApp = new ServerApp();

server.start();
