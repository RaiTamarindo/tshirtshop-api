import { GenericEntity } from './entity.cls';
import { Order } from './order.cls';
import { Product } from './product.cls';

/**
 * Order details class
 */
export class OrderDetails extends GenericEntity {

    public attributes: string;
    public quantity: number;
    public unitCost: number;
    public order: Order;
    public product: Product;

}
