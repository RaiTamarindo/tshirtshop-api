import {
    compare,
    hash,
} from 'bcrypt';
import {
    BAD_REQUEST,
    UNAUTHORIZED,
} from 'http-status';
import { injectable } from 'inversify';
import {
    getRepository,
    Repository,
} from 'typeorm';
import { User } from '../entities';
import { UserFilter } from '../entities/filters';
import { APIError } from '../helpers/api-error.cls';
import {
    container,
    TYPE,
} from '../inversify.config';
import { GenericService } from './generic.service';

/**
 * User service class
 */
@injectable()
export class UserService extends GenericService<User, UserFilter> {

    /**
     * Creates a new user
     * @param user User data
     * @param ctxUser User doing operation
     */
    public async create(user: User | User[], ctxUser?: User): Promise<User[]> {
        if (!(user instanceof Array)) {
            user.passwordHash = await this.hashPassword(user);

            return super.create(user, ctxUser);
        }

        return Promise.reject(new APIError('Its possible create only one user at once.', BAD_REQUEST));
    }

    /**
     * Update users data
     * @param user User to update
     * @param ctxUser User doing operation
     */
    public update(user: User, ctxUser?: User): Promise<User> {
        delete user.password;
        delete user.passwordHash;
        delete user.passwordChangedOn;

        return super.update(user, ctxUser);
    }

    /**
     * Update user password
     * @param user User data
     */
    public async updatePassword(user: User): Promise<User> {
        const passwordHash: string = await this.hashPassword(user);
        const u = new User();
        u.id = user.id;
        u.passwordHash = passwordHash;
        u.passwordChangedOn = new Date();

        return super.update(u);
    }

    /**
     * Checks password validity for the user identified by email and returns user data
     * @param email User email
     * @param password Plain user password
     */
    public async checkPassword(email: string, password: string): Promise<User> {
        const filter = new UserFilter();
        filter.email = email;
        const user = await this.findOne(filter);
        if (!!user) {
            await compare(password, user.passwordHash);

            return user;
        }

        return Promise.reject(new APIError('Could not authenticate user.', UNAUTHORIZED));
    }

    /**
     * Gets user repository
     */
    protected getRepository(): Repository<User> {
        return getRepository(User);
    }

    /**
     * Get hash from user password
     * @param user User data
     */
    private hashPassword(user: User): Promise<string> {
        return hash(user.password, 10);
    }

}

container.bind<UserService>(UserService)
    .to(UserService);
container.bind<UserService>(TYPE.UserService)
    .to(UserService);
