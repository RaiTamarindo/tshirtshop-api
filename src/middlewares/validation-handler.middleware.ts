import {
    Request,
    Response,
} from 'express';
import {
    Result,
    validationResult,
} from 'express-validator/check';
import { UNPROCESSABLE_ENTITY } from 'http-status';
import { APIError } from '../helpers/api-error.cls';

export function validationHandlerMiddleware(req: Request, _res: Response, next: Function) {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
        const message = errors.array()[0].msg;

        return next(new APIError(message, UNPROCESSABLE_ENTITY));
    } else {
        return next();
    }
}
