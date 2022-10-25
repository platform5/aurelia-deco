import 'aurelia-polyfills';
export declare class TypeDecorator {
    name: string;
    defaultOptions: any;
    fromApi: (key: string, value: any, options: any, element: any, target: any) => Promise<any>;
    toApi: (key: string, value: any, options: any, element: any, target: any) => Promise<any>;
    input: (key: string, value: any, options: any, element: any, target: any) => Promise<any>;
    output: (key: string, value: any, options: any, element: any, target: any) => Promise<any>;
    validate: (value: any, obj: any, options: any) => boolean | Promise<boolean>;
    private customValidationRuleReady;
    constructor(name: string);
    decorator(): (optionsOrTarget?: any, key?: string, descriptor?: PropertyDescriptor) => any;
    optionsHook(options: any, target: any, key: any): any;
    private createCustomValidationRule;
}
