import { Department } from './department.cls';
import { GenericEntity } from './entity.cls';

/**
 * Product category class
 */
export class Category extends GenericEntity {

    public name: string;
    public description: string;
    public department?: Department;

}
