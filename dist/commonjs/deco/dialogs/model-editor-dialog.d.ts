import { Model } from '../decorators';
import { Subscription } from 'aurelia-event-aggregator';
import { UxModalService, UxModalServiceResult } from '@aurelia-ux/modal';
import { DecoApi } from '../helpers/deco-api';
export declare class ModelEditorDialog {
    private deco;
    private modalService;
    instance: Model;
    subscription: Subscription;
    canRemove: boolean;
    mode: 'create' | 'edit';
    properties: Array<string>;
    suffix: '';
    defaultViewPath: string;
    viewPath: string;
    constructor(deco: DecoApi, modalService: UxModalService);
    canActivate(params: any): boolean;
    activate(params: any): void;
    canDeactivate(result: UxModalServiceResult): Promise<boolean>;
    get instanceProperties(): Array<string>;
    get editableProperties(): Array<string>;
}
