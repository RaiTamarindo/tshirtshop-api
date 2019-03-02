import { Attribute } from './attribute.cls';
import { GenericEntity } from './entity.cls';

/**
 * Attribute value class
 */
export class AttributeValue extends GenericEntity {

    public value: string;
    public attribute: Attribute;

}
