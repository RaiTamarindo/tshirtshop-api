import { HttpStatus } from './http-status.enum';

/**
 * API error class
 */
export class APIError {

    public message: string;
    public status: HttpStatus;

    constructor(message: string, status?: HttpStatus) {
        this.message = message;
        this.status = status;
    }

}
