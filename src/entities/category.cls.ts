import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Department } from './department.cls';
import { IGenericEntity } from './entity.cls';

/**
 * Product category class
 */
@Entity('category')
export class Category implements IGenericEntity {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column({ type: 'varchar', length: 100 })
    public name: string;
    @Column({ type: 'varchar', length: 1000, nullable: true })
    public description: string;
    @ManyToOne(() => Department)
    @JoinColumn({ name: 'department_id' })
    public department?: Department;

}
