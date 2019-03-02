import { Customer } from './customer.cls';
import { GenericEntity } from './entity.cls';
import { Product } from './product.cls';

/**
 * Review class
 */
export class Review extends GenericEntity {

    public review: string;
    public rating: number;
    public createdOn: Date;
    public customer: Customer;
    public product: Product;

}
