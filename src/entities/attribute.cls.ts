import {
    Column,
    Entity,
} from 'typeorm';
import { GenericEntity } from './entity.cls';

/**
 * Attribute type class
 */
@Entity('attribute')
export class Attribute extends GenericEntity {

    @Column({ type: 'varchar', length: 100 })
    public name: string;

}
