import { RequestHandler } from 'express';
import { check } from 'express-validator/check';
import { userValidator } from './user.validator';
import { validationHandlerMiddleware } from './validation-handler.middleware';

export const customerValidator: RequestHandler[] = userValidator('userData')
    .concat([
        check('userData')
            .exists()
            .withMessage('Cutomer user data is required.'),

        check('shippingRegion')
            .exists()
            .withMessage('Customer shipping region is required.'),

        validationHandlerMiddleware,
    ]);
