import { Customer } from './customer.cls';
import { GenericEntity } from './entity.cls';
import { OrderStatus } from './order-status.enum';
import { Shipping } from './shipping.cls';
import { Tax } from './tax.cls';

/**
 * Order class
 */
export class Order extends GenericEntity {

    public totalAmount: number;
    public createdOn: Date;
    public shippedOn?: Date;
    public status?: OrderStatus;
    public comments: string;
    public authCode: string;
    public reference: string;
    public customer: Customer;
    public shipping: Shipping;
    public tax: Tax;

}
