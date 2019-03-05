// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { ServerApp } from './server';

export const server: ServerApp = new ServerApp();

initializeTransactionalContext();
server.start();
