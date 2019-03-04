import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IGenericEntity } from './entity.cls';

/**
 * Tax class
 */
@Entity('tax')
export class Tax implements IGenericEntity {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column({ name: 'tax_type', type: 'varchar', length: 100 })
    public taxType: string;
    @Column({ name: 'tax_percentage', type: 'decimal', precision: 10, scale: 2 })
    public percentage: number;

}
