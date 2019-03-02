import { GenericEntity } from './entity.cls';
import { Product } from './product.cls';

/**
 * Shopping cart item class
 */
export class ShoppingCart extends GenericEntity {

    public cartId: string;
    public attributes: string;
    public quantity: number;
    public buyNow: boolean;
    public addedOn: Date;
    public product: Product;

}
