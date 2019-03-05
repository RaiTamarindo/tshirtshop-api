import { Response } from 'express';
import { OK } from 'http-status';
import {
    Body,
    JsonController,
    Post,
    Put,
    Req,
    Res,
    UseBefore,
} from 'routing-controllers';
import { User } from '../entities';
import { Credentials } from '../entities/dto/credentials.cls';
import { container } from '../inversify.config';
import { AuthenticatorMiddleware } from '../middlewares';
import { SecurityService } from '../services/security.service';
import { IAPIRequest } from './generic.controller';

/**
 * Access control class
 */
@JsonController('/access-control')
export class AccessControlController {

    private readonly securityService: SecurityService;

    constructor() {
        this.securityService = container.get<SecurityService>(SecurityService);
    }

    /**
     * Authenticates an user using login and password
     * @param req Http resquest
     * @param res Http response
     */
    @Post('/authenticate')
    public async authenticate(@Body() credentials: Credentials, @Res() res: Response): Promise<Response> {
        const token: string = await this.securityService
            .authenticate(credentials.login, credentials.password);

        return res.status(OK)
            .json(token);
    }

    /**
     * Gives a refreshed token to current user
     * @param req Http request
     * @param res Http response
     */
    @Put('/refresh')
    @UseBefore(AuthenticatorMiddleware)
    public async refresh(@Req() req: IAPIRequest, @Res() res: Response): Promise<Response> {
        const newToken: string = await this.securityService
            .refreshToken(req.user);

        return res.status(OK)
            .json(newToken);
    }

    /**
     * Resets users password
     */
    @Put('/reset-password')
    @UseBefore(AuthenticatorMiddleware)
    public async resetPassword(@Req() req: IAPIRequest, @Res() res: Response, @Body() user: User) {
        req.user.password = user.password;
        const newToken: string = await this.securityService
            .updatePassword(req.user);

        return res.status(OK)
            .json(newToken);
    }

}
