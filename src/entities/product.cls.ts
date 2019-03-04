import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { AttributeValue } from './attribute-value.cls';
import { Category } from './category.cls';
import { IGenericEntity } from './entity.cls';

/**
 * Product class
 */
@Entity('product')
export class Product implements IGenericEntity {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column({ type: 'varchar', length: 100 })
    public name: string;
    @Column({ type: 'varchar', length: 1000 })
    public description: string;
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    public price: number;
    @Column({ name: 'discounted_price', type: 'decimal', precision: 10, scale: 2 })
    public discoutedPrice?: number;
    @Column({ type: 'varchar', length: 150, nullable: true })
    public image?: string;
    @Column({ name: 'image_2', type: 'varchar', length: 150, nullable: true })
    public image2?: string;
    @Column({ type: 'varchar', length: 150, nullable: true })
    public thumbnail?: string;
    @Column({ type: 'smallint', width: 6 })
    public display?: number;
    @ManyToMany(() => Category)
    @JoinTable({
        name: 'product_category',
        joinColumn: { name: 'product_id' },
        inverseJoinColumn: { name: 'category_id' },
    })
    public categories?: Category[];
    @ManyToMany(() => AttributeValue)
    @JoinTable({
        name: 'product_attribute',
        joinColumn: { name: 'product_id' },
        inverseJoinColumn: { name: 'attribute_value_id' },
    })
    public attributes?: AttributeValue[];

}
