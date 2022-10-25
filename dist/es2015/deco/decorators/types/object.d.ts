import { TypeDecorator } from './type-decorator';
export declare let validateObject: (value: any, options: any) => boolean;
export declare let toApiObject: (value: any, options: {
    allowOtherKeys?: boolean;
    keys: {
        [key: string]: any;
    };
}) => any;
export declare let objectDecorator: TypeDecorator;
export declare const object: (optionsOrTarget?: any, key?: string, descriptor?: PropertyDescriptor) => any;
