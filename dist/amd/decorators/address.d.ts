import { TypeDecorator } from '../deco';
export declare let inputAddress: (value: any) => any;
export declare let validateAddress: (value: any, options?: any) => boolean;
export declare let addressDecorator: TypeDecorator;
export declare const address: (optionsOrTarget?: any, key?: string, descriptor?: PropertyDescriptor) => any;
export declare let inputAddressArray: (value: any) => any;
export declare let validateAddressArray: (value: any, options?: any) => boolean;
export declare let addressArrayDecorator: TypeDecorator;
export declare const addressArray: (optionsOrTarget?: any, key?: string, descriptor?: PropertyDescriptor) => any;
export interface Address {
    label?: string;
    street?: string;
    city?: string;
    zip?: string;
    country?: string;
}
export declare function isSameAddress(a: Address, b: Address): boolean;
