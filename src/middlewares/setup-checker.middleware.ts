import { NOT_IMPLEMENTED } from 'http-status';
import {
    ExpressMiddlewareInterface,
    Middleware,
} from 'routing-controllers';
import { AppConfig } from '../config/app.config';
import { APIError } from '../helpers/api-error.cls';

/**
 * Backup service to catch unimplemented service calls
 */
@Middleware({ type: 'before' })
export class SetupCheckerMiddleware implements ExpressMiddlewareInterface {

    public use(_req: Request, _res: Response, next: Function) {
        if (!!AppConfig.getDatabase() && !!AppConfig.getJWT()) {
            next();
        } else {
            next(new APIError('This server does not have the necessary settings for running. Enter setup first.', NOT_IMPLEMENTED));
        }
    }

}
