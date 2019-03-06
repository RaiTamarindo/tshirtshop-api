import { BAD_REQUEST } from 'http-status';
import { injectable } from 'inversify';
import * as inversifyInjectDecorators from 'inversify-inject-decorators';
import {
    EntityRepository,
    getCustomRepository,
} from 'typeorm';
import {
    BaseRepository,
    Transactional,
} from 'typeorm-transactional-cls-hooked';
import {
    Customer,
    User,
    UserRole,
} from '../entities';
import { CustomerFilter } from '../entities/filters';
import { APIError } from '../helpers/api-error.cls';
import {
    container,
    TYPE,
} from '../inversify.config';
import { GenericService } from './generic.service';
import { UserService } from './user.service';

const { lazyInject } = inversifyInjectDecorators.default(container);

/**
 * Customer repository class
 */
@EntityRepository(Customer)
export class CustomerRepository extends BaseRepository<Customer> { }

/**
 * Customer service class
 */
@injectable()
export class CustomerService extends GenericService<Customer, CustomerFilter> {

    @lazyInject(TYPE.UserService)
    private readonly userService: UserService;

    /**
     * Creates a new customer
     * @param customer Customer data
     * @param user Context user
     */
    @Transactional()
    public async create(customer: Customer | Customer[], user?: User): Promise<Customer[]> {
        if (customer instanceof Array) {
            throw new APIError('Its possible create only one customer at once.', BAD_REQUEST);
        } else {
            customer.userData.role = UserRole.CUSTOMER;
            const users = await this.userService.create(customer.userData);
            customer.userData = users[0];

            return super.create(customer, user);
        }
    }

    /**
     * Updates customer data
     * @param customer Customer data
     * @param user Context user
     */
    @Transactional()
    public async update(customer: Customer, user: User): Promise<Customer> {
        delete customer.userData.role;
        await this.userService.update(customer.userData);

        return super.update(customer, user);
    }

    /**
     * Gets the customer by the user
     * @param user User
     */
    public async findByUser(user: User): Promise<Customer> {
        const filter = new CustomerFilter();
        filter.user = user;

        return this.findOne(filter);
    }

    /**
     * Gets customer repository
     */
    protected getRepository(): BaseRepository<Customer> {
        return getCustomRepository(CustomerRepository);
    }

}

container.bind<CustomerService>(CustomerService)
    .to(CustomerService);
