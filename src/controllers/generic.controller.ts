import {
    Request,
    Response,
} from 'express';
import {
    CREATED,
    OK,
} from 'http-status';
import { injectable } from 'inversify';
import { User } from '../entities';
import { GenericEntity } from '../entities/entity.cls';
import { GenericFilter } from '../entities/filters/generic.filter';
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
@injectable()
export abstract class GenericController<T extends GenericEntity, F extends GenericFilter<T>> {

    public load = (req: IEntityRequest<T>, _res: Response, next: (error?: any) => void, id: number) => {
        this.doLoad(id)
            .then((entity: T) => {
                req.entity = entity;
                next();
            })
            .catch(next);
    }

    public read = (req: IEntityRequest<T>, res: Response) => {
        res.status(OK)
            .json(req.entity);
    }

    public list = (req: IEntityRequest<T>, res: Response, next: (error?: any) => void) => {
        const filter: F = GenericFilter.parse<T, F>(this.getFilterType(), req.query);
        this.doList(filter, req.user)
            .then((result: IFindResult<T, F>) => res.status(OK)
                .json(result))
            .catch(next);
    }

    public create = (req: IEntityRequest<T>, res: Response, next: (error?: any) => void) => {
        this.doCreate(req.body, req.user)
            .then((createdEntities: T[]) => res.status(CREATED)
                .json(createdEntities))
            .catch(next);
    }

    public update = (req: IEntityRequest<T>, res: Response, next: (error?: any) => void) => {
        this.doUpdate(req.entity.id, req.body, req.user)
            .then((updatedEntity: T) => res.status(OK)
                .json(updatedEntity))
            .catch(next);
    }

    public remove = (req: IEntityRequest<T>, res: Response, next: (error?: any) => void) => {
        this.doRemove(req.entity, req.user)
            .then(() => res.status(OK)
                .send())
            .catch(next);
    }

    /**
     * Loads an entity
     * @param id Id of entity
     */
    protected doLoad(id: number): Promise<T> {
        return this.getService()
            .findById(id);
    }

    /**
     * List entities by filter
     * @param filter Entity filter
     * @param user Context user
     */
    protected doList(filter: F, user?: User): Promise<IFindResult<T, F>> {
        return this.getService()
            .findAndCount(filter, user);
    }

    /**
     * Creates one or more entities
     * @param entity Entity or entities to create
     * @param user Context user
     */
    protected doCreate(entity: T | T[], user?: User): Promise<T[]> {
        return this.getService()
            .create(entity, user);
    }

    /**
     * Updates an entity
     * @param id Id of entity
     * @param entity Entity to update
     * @param user Context user
     */
    protected doUpdate(id: number, entity: T, user?: User): Promise<T> {
        entity.id = id;

        return this.getService()
            .update(entity, user);
    }

    /**
     * Removes an entity
     * @param entity Entity to remove
     * @param user Context user
     */
    protected doRemove(entity: T, user?: User): Promise<T[]> {
        return this.getService()
            .remove(entity, user);
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
