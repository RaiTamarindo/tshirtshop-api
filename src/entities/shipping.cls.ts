import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IGenericEntity } from './entity.cls';
import { ShippingRegion } from './shipping-region.cls';

/**
 * Shipping class
 */
@Entity('shipping')
export class Shipping implements IGenericEntity {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column({ name: 'shipping_type', type: 'varchar', length: 100 })
    public shippingType: string;
    @Column({ name: 'shipping_cost', type: 'decimal', precision: 10, scale: 2 })
    public cost: number;
    @ManyToOne(() => ShippingRegion)
    @JoinColumn({ name: 'shipping_region_id' })
    public region: ShippingRegion;

}
