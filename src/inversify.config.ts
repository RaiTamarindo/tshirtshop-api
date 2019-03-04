import { Container } from 'inversify';

export const TYPE = {
    UserService: Symbol.for('UserService'),
};

export const container = new Container();
