import { Address } from './../../decorators/address';
export declare class AddressDialog {
    address: Address;
    mode: 'create' | 'edit';
    labels: string[];
    dicoContext: string;
    allowDescription: boolean;
    allowLatLngEdition: boolean;
    activate(params: any): void;
    private fixAddressKeys;
}
