import { Response } from 'express';
import {
    NOT_FOUND,
    NOT_IMPLEMENTED,
    OK,
} from 'http-status';
import {
    Body,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseBefore,
} from 'routing-controllers';
import { Customer } from '../entities';
import { CustomerFilter } from '../entities/filters';
import { APIError } from '../helpers/api-error.cls';
import { container } from '../inversify.config';
import { AuthenticatorMiddleware } from '../middlewares';
import { customerValidator } from '../middlewares/customer.validator';
import { CustomerService } from '../services';
import {
    GenericController,
    IAPIRequest,
} from './generic.controller';

/**
 * Customer controller class
 */
@JsonController('/customers')
export class CustomerController extends GenericController<Customer, CustomerFilter> {

    public read(_req: IAPIRequest, _res: Response, _id: number): Promise<Response> {
        throw new APIError('Method not implemented.', NOT_IMPLEMENTED);
    }

    public list(_req: IAPIRequest, _res: Response): Promise<Response> {
        throw new APIError('Method not implemented.', NOT_IMPLEMENTED);
    }

    public remove(_req: IAPIRequest, _res: Response, _id: number): Promise<Response> {
        throw new APIError('Method not implemented.', NOT_IMPLEMENTED);
    }

    /**
     * Gets the customer by current user
     * @param req Http resquest
     * @param res Http response
     */
    @Get('/by-user')
    @UseBefore(AuthenticatorMiddleware)
    public async readByUser(@Req() req: IAPIRequest, @Res() res: Response): Promise<Response> {
        const customer: Customer = await this.getService()
            .findByUser(req.user);
        if (!customer) {
            throw new APIError('This user is not a customer.', NOT_FOUND);
        } else {
            return res.status(OK)
                .json(customer);
        }
    }

    /**
     * Creates an customer
     * @param req Http request
     * @param res Http response
     */
    @Post('/')
    @UseBefore(...customerValidator)
    public create(@Req() req: IAPIRequest, @Res() res: Response, @Body() customer: Customer): Promise<Response> {
        return super.defaultCreate(req, res, customer);
    }

    /**
     * Updates an customer
     * @param req Http request
     * @param res Http response
     * @param id User id
     */
    @Put('/:id')
    @UseBefore(...customerValidator)
    public update(@Req() req: IAPIRequest, @Res() res: Response, @Param('id') id: number, @Body() customer: Customer): Promise<Response> {
        return super.defaultUpdate(req, res, id, customer);
    }

    /**
     * Gets an instance of user service
     */
    protected getService(): CustomerService {
        return container.get<CustomerService>(CustomerService);
    }

    /**
     * Gets user filter constructor
     */
    protected getFilterType(): new () => CustomerFilter {
        return CustomerFilter;
    }

}
