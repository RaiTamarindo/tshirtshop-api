import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IGenericEntity } from './entity.cls';
import { ShippingRegion } from './shipping-region.cls';
import { User } from './user.cls';

/**
 * Customer class
 */
@Entity('customer')
export class Customer implements IGenericEntity {

    @PrimaryGeneratedColumn()
    public id: number;
    @Column({ name: 'credit_card', type: 'text', nullable: true })
    public creditCard?: string;
    @Column({ name: 'address_1', type: 'varchar', length: 100, nullable: true })
    public address1?: string;
    @Column({ name: 'address_2', type: 'varchar', length: 100, nullable: true })
    public address2?: string;
    @Column({ type: 'varchar', length: 100, nullable: true })
    public city?: string;
    @Column({ type: 'varchar', length: 100, nullable: true })
    public region?: string;
    @Column({ name: 'postal_code', type: 'varchar', length: 100, nullable: true })
    public postalCode?: string;
    @Column({ type: 'varchar', length: 100, nullable: true })
    public country?: string;
    @Column({ name: 'day_phone', type: 'varchar', length: 100, nullable: true })
    public dayPhone?: string;
    @Column({ name: 'eve_phone', type: 'varchar', length: 100, nullable: true })
    public eveninigPhone?: string;
    @Column({ name: 'mob_phone', type: 'varchar', length: 100, nullable: true })
    public mobilePhone?: string;
    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    public user: User;
    @ManyToOne(() => ShippingRegion)
    @JoinColumn({ name: 'shipping_region_id' })
    public shippingRegion: ShippingRegion;

}
