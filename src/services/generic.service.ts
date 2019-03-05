import { UNAUTHORIZED } from 'http-status';
import { injectable } from 'inversify';
import {
    InsertResult,
    UpdateResult,
} from 'typeorm';
import {
    BaseRepository,
    Transactional,
} from 'typeorm-transactional-cls-hooked';
import { User } from '../entities';
import { IGenericEntity } from '../entities/entity.cls';
import { GenericFilter } from '../entities/filters/generic.filter';
import { APIError } from '../helpers/api-error.cls';

export interface IFindResult<T extends IGenericEntity, F extends GenericFilter<T>> {
    entities: T[];
    filter: F;
    total: number;
}

/**
 * Generic service class
 */
@injectable()
export abstract class GenericService<T extends IGenericEntity, F extends GenericFilter<T>> {

    /**
     * Finds entities by filter. If user is defined, wraps this call with user context.
     * @param filter Entity filter
     * @param user Context user
     */
    public async findAndCount(filter: F, user?: User): Promise<IFindResult<T, F>> {
        await (!user ? Promise.resolve() : this.wrapContext(user, null, filter));
        const res: [T[], number] = await this.getRepository()
            .findAndCount(filter.getOptions());

        return {
            entities: res[0],
            filter: filter,
            total: res[1],
        };
    }

    /**
     * Finds one entity by its id. If user is defined, wraps this call with user context.
     * @param id Entity id
     * @param user Context user
     */
    public async findById(id: number, user?: User): Promise<T> {
        const entity: T = await this.getRepository()
            .findOne(id);
        await (!user ? Promise.resolve() : this.wrapContext(user, entity));

        return entity;
    }

    /**
     * Finds one entity by filter. If user is defined, wraps this call with user context.
     * @param filter Entity filter
     * @param user Context user
     */
    public async findOne(filter: F, user?: User): Promise<T> {
        await (!user ? Promise.resolve() : this.wrapContext(user, null, filter));
        filter.limit = 1;

        return this.getRepository()
            .findOne(filter.getOptions());
    }

    /**
     * Creates an entity on database.If user is defined, wraps this call with user context.
     * @param entity Entity to persist
     * @param user Context user
     */
    @Transactional()
    public async create(entity: T | T[], user?: User): Promise<T[]> {
        await (!user ? Promise.resolve() : this.wrapContext(user, entity));
        const e: any = entity instanceof Array ? [].concat(entity) : { ...entity };
        const result: InsertResult = await this.getRepository()
            .insert(e);

        return <T[]>result.generatedMaps;
    }

    /**
     * Creates or updates one or more entities on database. If user is defined, wraps this call with user context.
     * @param entity Entity or entities to create/update
     * @param user Context user
     */
    @Transactional()
    public async createOrUpdate(entity: T | T[], user?: User): Promise<T[]> {
        const entitiesCreate: T[] = (entity instanceof Array ? entity : [entity])
            .filter((e: T) => !e.id);
        const entitiesUpdate: T[] = (entity instanceof Array ? entity : [entity])
            .filter((e: T) => !!e.id);
        const created: T[] = await this.create(entitiesCreate, user);
        const updated: T[] = await Promise.all(entitiesUpdate.map((e: T) => this.update(e, user)));

        return created.concat(updated);
    }

    /**
     * Updates one entity on database (only defined attributes). If user is defined, wraps this call with user context.
     * @param entity Entity to update
     * @param user Context user
     */
    @Transactional()
    public async update(entity: T, user?: User): Promise<T> {
        await (!user ? Promise.resolve() : this.wrapContext(user, entity));
        const e: any = { ...entity };
        const result: UpdateResult = await this.getRepository()
            .update(entity.id, e);

        return (<T[]>result.generatedMaps)[0];
    }

    /**
     * Removes one or more entities from database. If user is defined, wraps this call with user context.
     * @param entity Entity or entities to remove
     * @param user Context user
     */
    @Transactional()
    public async remove(entity: T | T[], user?: User): Promise<T[]> {
        const e: T[] = entity instanceof Array ? entity : [entity];
        await (!user ? Promise.resolve() : this.wrapContext(user, entity));

        return this.getRepository()
            .remove(e);
    }

    /**
     * Calls entity and filter contextualization
     * @param user Context user
     * @param entity Entity or entities to be contextualized
     * @param filter Filter to be contextualized
     */
    public async wrapContext(user: User, entity?: T | T[], filter?: F): Promise<void> {
        const contextualize = [];
        if (user != null) {
            if (entity != null) {
                contextualize.push(this.contextualizeEntity(entity, user));
            }
            if (filter != null) {
                contextualize.push(this.contextualizeFilter(filter, user));
            }
        }
        await Promise.all(contextualize)
            .catch((err: Error) => Promise.reject(new APIError(err.message, UNAUTHORIZED)));
    }

    /**
     * Override this method to do entity contextualization
     * @param _entity Entity or entities to be contexttualized
     * @param _user Context user
     */
    protected contextualizeEntity(_entity: T | T[], _user: User): Promise<void> {
        return Promise.resolve();
    }

    /**
     * Override this method to do filter contextualization
     * @param _filter Filter to be contexttualized
     * @param _user Context user
     */
    protected contextualizeFilter(_filter: F, _user: User): Promise<void> {
        return Promise.resolve();
    }

    /**
     * Gets entity repository
     */
    protected abstract getRepository(): BaseRepository<T>;

}
