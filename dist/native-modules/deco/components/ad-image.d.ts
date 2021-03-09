import { BindingEngine } from 'aurelia-framework';
import { Model } from '../decorators/model';
export declare class AdImage {
    private element;
    private bindingEngine;
    instance: Model;
    property: string;
    fileId: string;
    w: number;
    h: number;
    src: string;
    invisibleBeforeLoading: boolean;
    hardsize: boolean;
    format: string;
    private originalSrc;
    private observerSubscription;
    private observerSubscription2;
    constructor(element: Element, bindingEngine: BindingEngine);
    hardsizeChanged(): void;
    detached(): void;
    bind(): void;
    instanceChanged(): void;
    propertyChanged(): void;
    fileIdChanged(): void;
    wChanged(): void;
    hChanged(): void;
    attached(): void;
    setFormat(): void;
    formatChanged(): void;
    _timeout: any;
    _preventMultipleRequests: boolean;
    _requestedImage: string;
    getSrc(): void;
    setOriginal(): void;
    srcChanged(): void;
    observeProperty(): void;
}
