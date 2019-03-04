import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IGenericEntity } from './entity.cls';
import { Product } from './product.cls';

/**
 * Shopping cart item class
 */
@Entity('shopping_cart')
export class ShoppingCart implements IGenericEntity {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column({ name: 'cart_id', type: 'char', length: 32 })
    public cartId: string;
    @Column({ type: 'varchar', length: 100 })
    public attributes: string;
    @Column({ type: 'int' })
    public quantity: number;
    @Column({ name: 'buy_now', type: 'bool' })
    public buyNow: boolean;
    @Column({ name: 'added_on', type: 'datetime' })
    public addedOn: Date;
    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

}
