import { AttributeValue } from './attribute-value.cls';
import { Category } from './category.cls';
import { GenericEntity } from './entity.cls';

/**
 * Product class
 */
export class Product extends GenericEntity {

    public name: string;
    public description: string;
    public price: number;
    public discoutedPrice?: number;
    public image?: string;
    public image2?: string;
    public thumbnail?: string;
    public display?: boolean;
    public categories?: Category[];
    public attributes?: AttributeValue[];

}
