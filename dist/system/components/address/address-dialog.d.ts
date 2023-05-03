import { Address } from './../../decorators/address';
import { UxModalServiceResult } from '@aurelia-ux/modal';
import { I18N } from 'aurelia-i18n';
export declare class AddressDialog {
    private i18n;
    dialogTitle: string;
    address: Address;
    mode: 'create' | 'edit';
    checkAllValues: boolean;
    labels: string[];
    dicoContext: string;
    allowDescription: boolean;
    allowAccessInformation: boolean;
    allowLatLngEdition: boolean;
    countryType: 'input' | 'list';
    countryList: 'all' | Array<string>;
    constructor(i18n: I18N);
    activate(params: any): void;
    canDeactivate(result: UxModalServiceResult): Promise<boolean>;
    private fixAddressKeys;
}
