import { Department } from './department.cls';
import { GenericEntity } from './entity.cls';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

/**
 * Product category class
 */
@Entity('category')
export class Category extends GenericEntity {

    @Column({ type: 'varchar', length: 100 })
    public name: string;
    @Column({ type: 'varchar', length: 1000, nullable: true })
    public description: string;
    @ManyToOne(() => Department)
    @JoinColumn({ name: 'department_id' })
    public department?: Department;

}
