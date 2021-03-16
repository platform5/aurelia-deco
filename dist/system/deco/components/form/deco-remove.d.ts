import { Model } from '../../decorators';
export declare class DecoRemove {
    element: HTMLElement;
    instance: Model;
    suffix: string;
    confirmLabel: string;
    processing: boolean;
    route: string;
    private requestConfirmation;
    private timeout;
    constructor(element: HTMLElement);
    remove(): void;
    confirm(): void;
}
