import { ValidationRules } from 'aurelia-validation';
export { ValidationRules };
export interface PropertyValidation {
    type: string;
    options: any;
}
export declare function addTargetValidation(target: any, type: string, key: string | number | symbol, options?: {}): void;
export declare const required: <T>(target: T, key: keyof T, descriptor?: PropertyDescriptor) => void | any;
export declare const minLength: (minLength?: number) => <T>(target: T, key: keyof T, descriptor?: PropertyDescriptor) => void | any;
export declare const maxLength: (maxLength?: number) => <T>(target: T, key: keyof T, descriptor?: PropertyDescriptor) => void | any;
export declare const email: <T>(target: T, key: keyof T, descriptor?: PropertyDescriptor) => void | any;
export declare const internationalPhoneNumber: (acceptedCountryList?: Array<string>) => <T>(target: T, key: keyof T, descriptor?: PropertyDescriptor) => void | any;
export declare const slug: <T>(target: T, key: keyof T, descriptor?: PropertyDescriptor) => void | any;
