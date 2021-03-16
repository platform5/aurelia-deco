import { TypeDecorator } from '../decorators/types/type-decorator';
import { ModelOptions } from '../decorators/model';
import { StringTMap, StringAnyMap } from 'aurelia-resources';
import { PropertyForm } from './../decorators/form';
import { PropertyValidation } from './../decorators/validate';
export interface Deco {
    baseroute: string;
    target: any;
    options: ModelOptions;
    propertyTypes: StringTMap<TypeDecorator>;
    propertyTypesOptions: StringAnyMap;
    propertyFromApiOnly: Array<string>;
    propertyForms: StringTMap<Array<PropertyForm>>;
    propertyValidations: StringTMap<Array<PropertyValidation>>;
    propertySearchables: Array<string>;
    propertySortables: Array<string>;
    propertyFilterables: Array<string>;
    propertyFilterablesOptions: StringAnyMap;
}
export declare function cloneDeco(originalDeco: Deco): Deco;
