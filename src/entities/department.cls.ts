import {
    Entity,
    Column,
} from 'typeorm';
import { GenericEntity } from './entity.cls';

/**
 * Department class
 */
@Entity('department')
export class Department extends GenericEntity {

    @Column({ type: 'varchar', length: 100 })
    public name: string;
    @Column({ type: 'varchar', length: 1000, nullable: true })
    public description?: string;

}
