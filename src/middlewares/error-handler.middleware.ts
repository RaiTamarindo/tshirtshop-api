import {
    Request,
    Response,
} from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status';
import {
    ExpressErrorMiddlewareInterface,
    Middleware,
} from 'routing-controllers';
import { APIError } from '../helpers/api-error.cls';

/**
 * Error handler middleware class
 */
@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

    public error(error: any, _req: Request, res: Response) {
        let err = error;
        if (!(err instanceof APIError)) {
            err = new APIError(err.message, err.status || INTERNAL_SERVER_ERROR);
        }

        res.status(err.status)
            .json(err);
    }

}
