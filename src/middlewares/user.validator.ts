import * as bodyParser from 'body-parser';
import { RequestHandler } from 'express';
import { check } from 'express-validator/check';
import {
    UserRole,
} from '../entities';
import { container } from '../inversify.config';
import { UserService } from '../services';
import { validationHandlerMiddleware } from './validation-handler.middleware';

const userService: UserService = container.get(UserService);

/**
 * User validator class
 */
export function userValidator(prefix?: string): RequestHandler[] {
    const root: string = !prefix ? '' : `${prefix}.`;

    return [
        bodyParser.json(),

        check(`${root}email`)
            .exists()
            .withMessage('User email is required.')
            .isEmail()
            .withMessage('Invalid email.')
            .custom((_email: string, { req }: any) => userService.checkUniqueEmail(req.body))
            .withMessage('This email is not available.'),

        check(`${root}password`)
            .custom((password: string, { req }: any) => {
                if (req.method !== 'PUT') {
                    if (!password) {
                        throw new Error('User password is required.');
                    } else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g)) {
                        throw new Error('Password must be at least 8 characters long, of which one or more letter (a-zA-z),' +
                            ' one or more digit (0-9) and one or more symbol (@$!%*#?&).');
                    }
                }

                return true;
            }),

        check(`${root}name`)
            .exists()
            .withMessage('User name is required.')
            .isLength({ max: 128 })
            .withMessage('Users name must be until 128 characters long.'),

        check(`${root}role`)
            .custom((role: UserRole) => role === undefined || UserRole[role] !== undefined)
            .withMessage('Invalid role.'),

        validationHandlerMiddleware,
    ];
}
