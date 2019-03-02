import { GenericEntity } from './entity.cls';

/**
 * Tax class
 */
export class Tax extends GenericEntity {

    public taxType: string;
    public percentage: number;

}
