import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { GenericEntity } from './entity.cls';
import { ShippingRegion } from './shipping-region.cls';

/**
 * Shipping class
 */
@Entity('shipping')
export class Shipping extends GenericEntity {

    @Column({ name: 'shipping_type', type: 'varchar', length: 100 })
    public shippingType: string;
    @Column({ name: 'shipping_cost', type: 'decimal', precision: 10, scale: 2 })
    public cost: number;
    @ManyToOne(() => ShippingRegion)
    @JoinColumn({ name: 'shipping_region_id' })
    public region: ShippingRegion;

}
