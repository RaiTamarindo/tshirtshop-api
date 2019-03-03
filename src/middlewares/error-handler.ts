import {
    Request,
    Response,
} from 'express';
import {
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
} from 'http-status';
import { APIError } from '../helpers/api-error.cls';

export const errorHandler = [

    // Converts any error to APIError
    (err: any, _req: Request, _res: Response, next: Function) => {
        if (!(err instanceof APIError)) {
            return next(new APIError(err.message, err.status || INTERNAL_SERVER_ERROR));
        }

        return next(err);
    },

    // Catch NOT FOUND error
    (_req: Request, _res: Response, next: Function) => {
        return next(new APIError('Service not found', NOT_FOUND));
    },

    // Generate error response
    (err: APIError, _req: Request, res: Response, _next: Function) => {
        res.status(err.status)
            .json(err);
    },

];
