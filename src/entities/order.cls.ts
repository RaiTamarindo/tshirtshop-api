import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './customer.cls';
import { IGenericEntity } from './entity.cls';
import { OrderStatus } from './order-status.enum';
import { Shipping } from './shipping.cls';
import { Tax } from './tax.cls';

/**
 * Order class
 */
@Entity('order')
export class Order implements IGenericEntity {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2 })
    public totalAmount: number;
    @Column({ name: 'created_on', type: 'datetime' })
    public createdOn: Date;
    @Column({ name: 'shipped_on', type: 'datetime', nullable: true })
    public shippedOn?: Date;
    @Column({ type: 'int' })
    public status?: OrderStatus;
    @Column({ type: 'varchar', length: 1000, nullable: true })
    public comments: string;
    @Column({ name: 'auth_code', type: 'varchar', length: 50, nullable: true })
    public authCode: string;
    @Column({ type: 'varchar', length: 50, nullable: true })
    public reference: string;
    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    public customer: Customer;
    @ManyToOne(() => Shipping)
    @JoinColumn({ name: 'shipping_id' })
    public shipping: Shipping;
    @ManyToOne(() => Tax)
    @JoinColumn({ name: 'tax_id' })
    public tax: Tax;

}
