import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IGenericEntity } from './entity.cls';

/**
 * Shipping region class
 */
@Entity('shipping_region')
export class ShippingRegion implements IGenericEntity {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column({ name: 'shipping_region', type: 'varchar', length: 100 })
    public region: string;

}
