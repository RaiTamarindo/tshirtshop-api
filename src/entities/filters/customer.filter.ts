import { FindConditions } from 'typeorm';
import { Customer } from '../customer.cls';
import { User } from '../user.cls';
import { GenericFilter } from './generic.filter';

/**
 * Customer filter class
 */
export class CustomerFilter extends GenericFilter<Customer> {

    public user: User;

    protected getConditions(): FindConditions<Customer> {
        const conditions: FindConditions<Customer> = {};
        if (!!this.user) {
            conditions.userData = new User();
            if (!!this.user.id) {
                conditions.userData.id = this.user.id;
            }
        }

        return conditions;
    }

}
