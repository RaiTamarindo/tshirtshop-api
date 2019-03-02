import { GenericEntity } from './entity.cls';
import { Order } from './order.cls';

/**
 * Audit class
 */
export class Audit extends GenericEntity {

    public createdOn: Date;
    public message: string;
    public code: number;
    public order: Order;

}
