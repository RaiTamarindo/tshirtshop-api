import { GenericEntity } from './entity.cls';
import { ShippingRegion } from './shipping-region.cls';

/**
 * Shipping class
 */
export class Shipping extends GenericEntity {

    public shippingType: string;
    public cost: number;
    public region: ShippingRegion;

}
