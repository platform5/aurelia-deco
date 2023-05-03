import { Address } from './../../decorators/address';
export declare class AddressItem {
    address: Address;
    dicoContext: string;
    displayDescription: boolean;
    displayAccessInformation: boolean;
    main: string;
    secondary: string;
    label: string;
    bind(): void;
    addressChanged(): void;
    context(): string;
}
