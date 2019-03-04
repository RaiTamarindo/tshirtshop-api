import {
    Request,
    Response,
} from 'express';
import {
    CREATED,
    OK,
} from 'http-status';
import {
    GenericEntity,
    User,
} from '../entities';
import { GenericFilter } from '../entities/filters';
import {
    GenericService,
    IFindResult,
} from '../services';

export interface IAPIRequest extends Request {

    user: User;

}

/**
 * Generic entity controller
 */
export abstract class GenericController<T extends GenericEntity, F extends GenericFilter<T>> {

    public abstract read(req: Request, res: Response, id: number): Promise<Response>;

    public abstract list(req: Request, res: Response, id: number): Promise<Response>;

    public abstract create(req: Request, res: Response, id: number): Promise<Response>;

    public abstract update(req: Request, res: Response, id: number): Promise<Response>;

    public abstract remove(req: Request, res: Response, id: number): Promise<Response>;

    protected abstract getService(): GenericService<T, F>;

    protected abstract getFilterType(): new () => F;

    /**
     * Retrieves an entity by its id
     * @param req Http request
     * @param res Http response
     * @param id Entity id
     */
    protected async defaultRead(req: IAPIRequest, res: Response, id: number): Promise<Response> {
        const entity: T = await this.getService()
            .findById(id, req.user);

        return res.status(OK)
            .json(entity);
    }

    /**
     * List entities by filter
     * @param req Http request
     * @param res Http response
     */
    protected async defaultList(req: IAPIRequest, res: Response): Promise<Response> {
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
    protected async defaultCreate(req: IAPIRequest, res: Response): Promise<Response> {
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
    protected async defaultUpdate(req: IAPIRequest, res: Response, id: number): Promise<Response> {
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
     * @param id Entity id
     */
    protected async defaultRemove(req: IAPIRequest, res: Response, id: number): Promise<Response> {
        const entity: T = await this.getService()
            .findById(id);
        await this.getService()
            .remove(entity, req.user);

        return res.status(OK)
            .send();
    }

}
