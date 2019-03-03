import { FindManyOptions } from 'typeorm';
import { GenericEntity } from '../entity.cls';

/**
 * Generic filter class
 */
export abstract class GenericFilter<T extends GenericEntity> {

    public page: number;
    public limit: number;
    public sort: { [P in keyof T]: 'ASC' | 'DESC' | 1 | -1 };

    public static parse<T extends GenericEntity, F extends GenericFilter<T>>(
        filterType: new () => F,
        query: any): F {
        const filter = new filterType();
        if (!!query) {
            for (const attr of Object.keys(query)) {
                filter[attr] = GenericFilter.parseValue(query[attr]);
            }
        }

        return filter;
    }

    private static parseValue(value: any) {
        let parsed = null;
        if (typeof value === 'string') {
            switch (value) {
                case 'undefined': parsed = undefined; break;
                case 'null': parsed = null; break;
                case 'true': parsed = true; break;
                case 'false': parsed = false; break;
                default:
                    if (value.match(/^\-?[0-9]+(\.[0-9]+)?$/g)) {
                        parsed = parseFloat(value);
                    } else if (value.match(/^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/g)) {
                        parsed = new Date(value);
                    } else {
                        parsed = value;
                    }
            }
        } else if (value instanceof Array) {
            parsed = [];
            for (const v of value) {
                parsed.push(GenericFilter.parseValue(v));
            }
        } else if (value instanceof Object) {
            parsed = {};
            for (const attr of Object.keys(value)) {
                parsed[attr] = GenericFilter.parseValue(value[attr]);
            }
        }

        return parsed;
    }

    public getOptions(): FindManyOptions<T> {
        const options: FindManyOptions<T> = { where: {} };
        if (!!this.limit) {
            options.skip = (this.page || 0) * this.limit;
            options.take = this.limit;
        }

        return this.attachConditions(options);
    }

    protected abstract attachConditions(options: FindManyOptions<T>): FindManyOptions<T>;

}
