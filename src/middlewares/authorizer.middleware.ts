import { Response } from 'express';
import { FORBIDDEN } from 'http-status';
import { IAPIRequest } from '../controllers';
import { UserRole } from '../entities';
import { APIError } from '../helpers/api-error.cls';

/**
 * Authorizer middleware function
 */
export function authorizerMiddleWare(roles: UserRole[]) {

    return (req: IAPIRequest, _res: Response, next: (err?: any) => void) => {
        if (!!roles.find((role: UserRole) => req.user.role === role)) {
            next();
        } else {
            next(new APIError('You have not access to do this.', FORBIDDEN));
        }
    };

}
