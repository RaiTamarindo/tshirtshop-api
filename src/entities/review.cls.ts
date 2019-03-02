import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Customer } from './customer.cls';
import { GenericEntity } from './entity.cls';
import { Product } from './product.cls';

/**
 * Review class
 */
@Entity('review')
export class Review extends GenericEntity {

    @Column({ type: 'text' })
    public review: string;
    @Column({ type: 'smallint' })
    public rating: number;
    @Column({ name: 'created_on', type: 'datetime' })
    public createdOn: Date;
    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    public customer: Customer;
    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

}
