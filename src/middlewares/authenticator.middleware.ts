import { UNAUTHORIZED } from 'http-status';
import {
    ExpressMiddlewareInterface,
    Middleware,
} from 'routing-controllers';
import { IAPIRequest } from '../controllers';
import { User } from '../entities';
import { APIError } from '../helpers/api-error.cls';
import { container } from '../inversify.config';
import { SecurityService } from '../services/security.service';

const securityService: SecurityService = container.get(SecurityService);

/**
 * Authentication middleware class
 */
@Middleware({ type: 'before' })
export class AuthenticatorMiddleware implements ExpressMiddlewareInterface {

    public use(req: IAPIRequest, _res: Response, next: Function) {
        const authHeader: string = req.header('Authorization');

        if (!!authHeader) {
            const token = authHeader.replace(/^bearer/ig, '')
                .trim();
            securityService.verifyToken(token)
                .then((user: User) => {
                    req.user = user;
                    next();
                })
                .catch(() => {
                    next(new APIError('Invalid or expired credentials.', UNAUTHORIZED));
                });
        } else {
            next(new APIError('Provide credentials for authentication.', UNAUTHORIZED));
        }

    }

}