import {
    Column,
    Entity,
} from 'typeorm';
import { GenericEntity } from './entity.cls';
import { UserRole } from './user-role.enum';

/**
 * User class
 */
@Entity('user')
export class User extends GenericEntity {

    @Column({ type: 'varchar', length: 100 })
    public email: string;
    @Column({ type: 'string', length: 50 })
    public name: string;
    @Column({ name: 'password_hash', type: 'varchar', length: 100 })
    public passwordHash: string;
    public password: string;
    @Column({ name: 'password_changed_on', type: 'datetime', nullable: true })
    public passwordChangedOn?: Date;
    @Column({ type: 'int', nullable: true })
    public role?: UserRole;

}
