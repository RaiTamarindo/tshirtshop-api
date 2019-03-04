import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IGenericEntity } from './entity.cls';
import { Order } from './order.cls';
import { Product } from './product.cls';

/**
 * Order details class
 */
@Entity('order_detail')
export class OrderDetails implements IGenericEntity {

    @PrimaryGeneratedColumn()
    public id: number;
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
