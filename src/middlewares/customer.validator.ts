import { RequestHandler } from 'express';
import { userValidator } from './user.validator';
// import { validationHandlerMiddleware } from './validation-handler.middleware';

export const customerValidator: RequestHandler[] = userValidator('user')
    .concat([

        // validationHandlerMiddleware,
    ]);
