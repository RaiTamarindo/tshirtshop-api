import {
    Column,
    Entity,
} from 'typeorm';
import { GenericEntity } from './entity.cls';

/**
 * Shipping region class
 */
@Entity('shipping_region')
export class ShippingRegion extends GenericEntity {

    @Column({ name: 'shipping_region', type: 'varchar', length: 100 })
    public region: string;

}
