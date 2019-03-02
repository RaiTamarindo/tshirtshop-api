import {
    Column,
    Entity,
} from 'typeorm';
import { GenericEntity } from './entity.cls';

/**
 * Tax class
 */
@Entity('tax')
export class Tax extends GenericEntity {

    @Column({ name: 'tax_type', type: 'varchar', length: 100 })
    public taxType: string;
    @Column({ name: 'tax_percentage', type: 'decimal', precision: 10, scale: 2 })
    public percentage: number;

}
