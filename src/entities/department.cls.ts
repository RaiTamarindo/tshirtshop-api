import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IGenericEntity } from './entity.cls';

/**
 * Department class
 */
@Entity('department')
export class Department implements IGenericEntity {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column({ type: 'varchar', length: 100 })
    public name: string;
    @Column({ type: 'varchar', length: 1000, nullable: true })
    public description?: string;

}
