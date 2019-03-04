import {
    Equal,
    FindConditions,
    Like,
} from 'typeorm';
import { UserRole } from '../user-role.enum';
import { User } from '../user.cls';
import { GenericFilter } from './generic.filter';

/**
 * User filter class
 */
export class UserFilter extends GenericFilter<User> {

    public email: string;
    public name: string;
    public role: UserRole;

    protected getConditions(): FindConditions<User> {
        const conditions: FindConditions<User> = {};
        if (!!this.email) {
            conditions.email = Equal(this.email);
        }
        if (!!this.name) {
            conditions.name = Like(`${this.name}%`);
        }
        if (this.role !== undefined) {
            conditions.role = Equal(this.role);
        }

        return conditions;
    }

}
