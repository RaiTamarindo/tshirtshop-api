import {
    Request,
    Response,
} from 'express';
import {
    CREATED,
    OK,
} from 'http-status';
import {
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseBefore,
} from 'routing-controllers';
import {
    GenericEntity,
    User,
} from '../entities';
import { GenericFilter } from '../entities/filters';
import { entityLoaderMiddleware } from '../middlewares';
import {
    GenericService,
    IFindResult,
} from '../services';

export interface IAPIRequest extends Request {

    user: User;

}

export interface IEntityRequest<T extends GenericEntity> extends IAPIRequest {

    entity: T;

}

/**
 * Generic entity controller
 */
export abstract class GenericController<T extends GenericEntity, F extends GenericFilter<T>> {

    /**
     * Retrieves an entity by its id
     * @param req Http request
     * @param res Http response
     */
    @Get('/:id')
    @UseBefore(entityLoaderMiddleware(this.getService()))
    public read(@Req() req: IEntityRequest<T>, @Res() res: Response): Response {
        return res.status(OK)
            .json(req.entity);
    }

    /**
     * List entities by filter
     * @param req Http request
     * @param res Http response
     */
    @Get('/')
    public async list(@Req() req: IAPIRequest, @Res() res: Response): Promise<Response> {
        const filter: F = GenericFilter.parse<T, F>(this.getFilterType(), req.query);
        const result: IFindResult<T, F> = await this.getService()
            .findAndCount(filter, req.user);

        return res.status(OK)
            .json(result);
    }

    /**
     * Creates one or more entities
     * @param req Http request
     * @param res Http response
     */
    @Post('/')
    public async create(@Req() req: IAPIRequest, @Res() res: Response): Promise<Response> {
        const createdEntities: T[] = await this.getService()
            .create(req.body, req.user);

        return res.status(CREATED)
            .json(createdEntities);
    }

    /**
     * Updates an entity
     * @param req Http request
     * @param res Http response
     * @param id Entity id
     */
    @Put('/:id')
    @UseBefore(entityLoaderMiddleware(this.getService()))
    public async update(@Req() req: IEntityRequest<T>, @Res() res: Response, @Param('id') id: number): Promise<Response> {
        const entity: T = { ...req.body, id: id };
        const updatedEntity: T = await this.getService()
            .update(entity, req.user);

        return res.status(OK)
            .json(updatedEntity);
    }

    /**
     * Removes an entity by its id
     * @param req Http request
     * @param res Http response
     */
    @Delete('/:id')
    @UseBefore(entityLoaderMiddleware(this.getService()))
    public async remove(@Req() req: IEntityRequest<T>, @Res() res: Response) {
        await this.getService()
            .remove(req.entity, req.user);

        return res.status(OK)
            .send();
    }

    /**
     * Gets entity service
     */
    protected abstract getService(): GenericService<T, F>;

    /**
     * Gets specific filter constructor
     */
    protected abstract getFilterType(): new () => F;

}
