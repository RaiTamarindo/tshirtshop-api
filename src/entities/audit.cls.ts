import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { GenericEntity } from './entity.cls';
import { Order } from './order.cls';

/**
 * Audit class
 */
@Entity('audit')
export class Audit extends GenericEntity {

    @Column({ name: 'created_on', type: 'datetime' })
    public createdOn: Date;
    @Column({ type: 'text' })
    public message: string;
    @Column({ type: 'int' })
    public code: number;
    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    public order: Order;

}
