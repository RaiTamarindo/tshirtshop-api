import { NOT_FOUND } from 'http-status';
import {
    ExpressMiddlewareInterface,
    Middleware,
} from 'routing-controllers';
import { APIError } from '../helpers/api-error.cls';

/**
 * Backup service to catch unimplemented service calls
 */
@Middleware({ type: 'after' })
export class ServiceNotFoundMiddleware implements ExpressMiddlewareInterface {

    public use(_req: Request, _res: Response, next: Function) {
        return next(new APIError('Service not found', NOT_FOUND));
    }

}
