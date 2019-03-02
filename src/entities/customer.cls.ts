import { GenericEntity } from './entity.cls';
import { ShippingRegion } from './shipping-region.cls';

/**
 * Customer class
 */
export class Customer extends GenericEntity {

    public name: string;
    public email: string;
    public passwordHash: string;
    public password?: string;
    public creditCard?: string;
    public address1?: string;
    public address2?: string;
    public city?: string;
    public region?: string;
    public postalCode?: string;
    public country?: string;
    public dayPhone?: string;
    public eveninigPhone?: string;
    public mobilePhone?: string;
    public shippingRegion: ShippingRegion;

}
