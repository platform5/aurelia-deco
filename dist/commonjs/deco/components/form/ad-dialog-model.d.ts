import { Model } from '../../decorators';
import { ArDialog, DialogTypes } from 'aurelia-resources';
export interface AdDialogModelParams {
    instance: Model;
    properties: 'all' | Array<string>;
    viewPath?: string;
    data?: any;
    displayRefLocale?: boolean;
    refLocale?: string;
}
export declare class AdDialogModel {
    params: AdDialogModelParams;
    instance: Model;
    properties: 'all' | Array<string>;
    data: any;
    displayRefLocale: boolean;
    refLocale: string;
    activate(params: AdDialogModelParams): void;
    processParams(): void;
    getViewStrategy(): string;
}
export interface AdDialogOptions {
    title: string;
    bindingContext?: any;
    content?: string;
    contentViewModelPath?: string;
    editionViewModelPath?: string;
    editionViewPath?: string;
    type?: DialogTypes;
    editionCallback?: Function;
    editionCallbackSuffix?: string;
    data?: any;
}
declare let adDialogModel: (instance: Model, options: AdDialogOptions, properties?: Array<string> | 'all') => ArDialog;
export { adDialogModel };
