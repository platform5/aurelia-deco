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

export function cloneDeco(originalDeco: Deco): Deco {
  let newDeco = {
    baseroute: originalDeco.baseroute,
    target: originalDeco.target,
    options: originalDeco.options,
    propertyTypes: originalDeco.propertyTypes,
    propertyTypesOptions: originalDeco.propertyTypesOptions,
    propertyFromApiOnly: originalDeco.propertyFromApiOnly,
    propertyForms: originalDeco.propertyForms,
    propertyValidations: originalDeco.propertyValidations,
    propertySearchables: originalDeco.propertySearchables,
    propertySortables: originalDeco.propertySortables,
    propertyFilterables: originalDeco.propertyFilterables,
    propertyFilterablesOptions: originalDeco.propertyFilterablesOptions
  };
  return newDeco;
}