import { injectable } from 'inversify';
import * as inversifyInjectDecorators from 'inversify-inject-decorators';
import {
    sign,
    SignOptions,
    verify,
    VerifyOptions,
} from 'jsonwebtoken';
import { AppConfig, IJWTConfig } from '../config/app.config';
import { JWTPayload } from '../entities/dto/jwt-payload.cls';
import { User } from '../entities/user.cls';
import { container, TYPE } from '../inversify.config';
import { UserService } from './user.service';

const { lazyInject } = inversifyInjectDecorators.default(container);

/**
 * Security service class
 */
@injectable()
export class SecurityService {

    @lazyInject(TYPE.UserService)
    private readonly userService: UserService;

    /**
     * Do user authentication and returns an access token
     * @param login Login string
     * @param password Plain password
     */
    public async authenticate(login: string, password: string): Promise<string> {
        const u: User = await this.userService.checkPassword(login, password);

        return this.createToken(u);
    }

    /**
     * Verifies input token validity and returns the corresponding user
     * @param token Access token
     */
    public async verifyToken(token: string): Promise<User> {
        return new Promise((resolve: Function, reject: Function) => {
            const options: VerifyOptions = { algorithms: ['HS256'] };
            const handleVerify = (err: any, accessToken: JWTPayload) => {
                if (err) {
                    reject(err);
                } else {
                    const user = new User();
                    user.id = parseInt(accessToken.sub, 10);
                    resolve(user);
                }
            };
            const jwtConfig: IJWTConfig = AppConfig.getJWT();
            verify(token, jwtConfig.secret, options, handleVerify);
        });
    }

    /**
     * Creates a refreshed token for an user
     * @param user User data
     */
    public async refreshToken(user: User): Promise<string> {
        const u: User = await this.userService
            .findById(user.id);

        return this.createToken(u);
    }

    /**
     * Facade for user service updatePssword method
     * @param user User data
     */
    public async updatePassword(user: User): Promise<string> {
        const u: User = await this.userService.updatePassword(user);

        return this.createToken(u);
    }

    /**
     * Create a access token
     * @param user User data
     */
    private createToken(user: User): string {
        const options: SignOptions = { algorithm: 'HS256' };
        const jwtConfig: IJWTConfig = AppConfig.getJWT();
        const payload = new JWTPayload(user);
        payload.exp = payload.iat + jwtConfig.expiration;

        return sign(JSON.stringify(payload), jwtConfig.secret, options);
    }

}

container.bind<SecurityService>(SecurityService)
    .to(SecurityService);
