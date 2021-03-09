import { Address } from '../../decorators';
import { UxModalService } from '@aurelia-ux/modal';
export declare class SelectAddressControl {
    private modalService;
    private element;
    value: any;
    addresses: Array<Address>;
    dicoContext: string;
    constructor(modalService: UxModalService, element: HTMLElement);
    get hasAddress(): boolean;
    unselect(): void;
    openDialog(): Promise<void>;
}
