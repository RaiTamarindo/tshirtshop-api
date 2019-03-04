import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IGenericEntity } from './entity.cls';

/**
 * Attribute type class
 */
@Entity('attribute')
export class Attribute implements IGenericEntity {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column({ type: 'varchar', length: 100 })
    public name: string;

}
