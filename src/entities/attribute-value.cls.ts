import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Attribute } from './attribute.cls';
import { IGenericEntity } from './entity.cls';

/**
 * Attribute value class
 */
@Entity('attribute_value')
export class AttributeValue implements IGenericEntity {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column({ type: 'varchar', length: 100 })
    public value: string;
    @ManyToOne(() => Attribute, { eager: true })
    @JoinColumn({ name: 'attribute_id' })
    public attribute: Attribute;

}
