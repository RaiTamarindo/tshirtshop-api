import * as crypto from 'crypto';
import { UserRole } from '../user-role.enum';
import { User } from '../user.cls';

/**
 * Access token class
 */
export class JWTPayload {

    public jti: string;
    public exp: number;
    public iat: number;
    public typ: string;
    public sub: string;
    public role: UserRole;

    constructor(user: User) {
        this.jti = crypto.randomBytes(32)
            .toString('base64');
        this.iat = Math.floor((new Date()).getTime() / 1000);
        this.typ = 'Bearer';
        this.sub = user.id.toString();
        this.role = user.role;
    }

}
