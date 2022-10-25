import { TypeDecorator } from '../decorators/types/type-decorator';
import { ModelOptions } from '../decorators/model';
import { PropertyForm } from './../decorators/form';
import { PropertyValidation } from './../decorators/validate';
export interface Deco {
    baseroute: string;
    target: any;
    options: ModelOptions;
    propertyTypes: {
        [key: string]: TypeDecorator;
    };
    propertyTypesOptions: {
        [key: string]: any;
    };
    propertyFromApiOnly: Array<string>;
    propertyForms: {
        [key: string]: Array<PropertyForm>;
    };
    propertyValidations: {
        [key: string]: Array<PropertyValidation>;
    };
    propertySearchables: Array<string>;
    propertySortables: Array<string>;
    propertyFilterables: Array<string>;
    propertyFilterablesOptions: {
        [key: string]: any;
    };
}
export declare function cloneDeco(originalDeco: Deco): Deco;
