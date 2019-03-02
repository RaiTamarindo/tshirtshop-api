import { PrimaryGeneratedColumn } from 'typeorm';

/**
 * Generic entity class
 */
export class GenericEntity {

    @PrimaryGeneratedColumn()
    public id: number;

}
