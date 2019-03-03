import { IEntityRequest } from '../controllers';
import { GenericEntity } from '../entities';
import { GenericFilter } from '../entities/filters';
import { GenericService } from '../services';

export function entityLoaderMiddleware(service: GenericService<GenericEntity, GenericFilter<GenericEntity>>) {
    return (req: IEntityRequest<GenericEntity>, _res: Response, next: (error?: any) => void, id: number) => {
        service
            .findById(id)
            .then((entity: GenericEntity) => {
                req.entity = entity;
                next();
            })
            .catch(next);
    };
}
