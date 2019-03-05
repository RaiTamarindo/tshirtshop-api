import { Response } from 'express';
import {
    Body,
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseBefore,
} from 'routing-controllers';
import {
    User,
    UserRole,
} from '../entities';
import { UserFilter } from '../entities/filters';
import { container } from '../inversify.config';
import {
    AuthenticatorMiddleware,
    authorizerMiddleWare,
    userValidator,
} from '../middlewares';
import { UserService } from '../services';
import {
    GenericController,
    IAPIRequest,
} from './generic.controller';

/**
 * User controller class
 */
@JsonController('/users')
@UseBefore(authorizerMiddleWare([UserRole.ADMIN]))
@UseBefore(AuthenticatorMiddleware)
export class UserController extends GenericController<User, UserFilter> {

    /**
     * Gets an user by its id
     * @param req Http resquest
     * @param res Http response
     * @param id User id
     */
    @Get('/:id')
    public read(@Req() req: IAPIRequest, @Res() res: Response, @Param('id') id: number): Promise<Response> {
        return super.defaultRead(req, res, id);
    }

    /**
     * List users by filter
     * @param req Http request
     * @param res Http response
     */
    @Get('/')
    public list(@Req() req: IAPIRequest, @Res() res: Response): Promise<Response> {
        return super.defaultList(req, res);
    }

    /**
     * Creates one or more users
     * @param req Http request
     * @param res Http response
     */
    @Post('/')
    @UseBefore(...userValidator())
    public create(@Req() req: IAPIRequest, @Res() res: Response, @Body() user: User): Promise<Response> {
        return super.defaultCreate(req, res, user);
    }

    /**
     * Updates an user
     * @param req Http request
     * @param res Http response
     * @param id User id
     */
    @Put('/:id')
    @UseBefore(...userValidator())
    public update(@Req() req: IAPIRequest, @Res() res: Response, @Param('id') id: number, @Body() user: User): Promise<Response> {
        return super.defaultUpdate(req, res, id, user);
    }

    /**
     * Removes an user by its id
     * @param req Http request
     * @param res Http response
     * @param id User id
     */
    @Delete('/:id')
    public remove(@Req() req: IAPIRequest, @Res() res: Response, @Param('id') id: number): Promise<Response> {
        return super.defaultRemove(req, res, id);
    }

    /**
     * Gets an instance of user service
     */
    protected getService(): UserService {
        return container.get<UserService>(UserService);
    }

    /**
     * Gets user filter constructor
     */
    protected getFilterType(): new () => UserFilter {
        return UserFilter;
    }

}
