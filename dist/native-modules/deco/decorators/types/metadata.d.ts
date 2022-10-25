import { TypeDecorator } from './type-decorator';
export interface Metadata {
    key: string;
    value: any;
    type?: string;
}
export declare let validateMetadata: (value: any, options: any) => boolean;
export declare let metadataDecorator: TypeDecorator;
export declare const metadata: (optionsOrTarget?: any, key?: string, descriptor?: PropertyDescriptor) => any;
