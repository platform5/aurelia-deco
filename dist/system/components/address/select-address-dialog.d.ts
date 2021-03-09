import { Address } from './../../decorators/address';
import { UxModalService, UxModalServiceResult } from '@aurelia-ux/modal';
export declare class SelectAddressDialog {
    private modalService;
    addresses: Array<Address>;
    address: Address;
    dicoContext: string;
    constructor(modalService: UxModalService);
    activate(params: any): void;
    selectAddress(address: Address): void;
    canDeactivate(result: UxModalServiceResult): Promise<boolean>;
    compareAddresses(a: any, b: any): boolean;
}
