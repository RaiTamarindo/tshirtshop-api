import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Attribute } from './attribute.cls';
import { GenericEntity } from './entity.cls';

/**
 * Attribute value class
 */
@Entity('attribute_value')
export class AttributeValue extends GenericEntity {

    @Column({ type: 'varchar', length: 100 })
    public value: string;
    @ManyToOne(() => Attribute, { eager: true })
    @JoinColumn({ name: 'attribute_id' })
    public attribute: Attribute;

}
