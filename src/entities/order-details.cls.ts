import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { GenericEntity } from './entity.cls';
import { Order } from './order.cls';
import { Product } from './product.cls';

/**
 * Order details class
 */
@Entity('order_detail')
export class OrderDetails extends GenericEntity {

    @Column({ type: 'varchar', length: 1000 })
    public attributes: string;
    @Column({ type: 'int' })
    public quantity: number;
    @Column({ name: 'unit_cost', type: 'decimal', precision: 10, scale: 2 })
    public unitCost: number;
    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    public order: Order;
    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

}
