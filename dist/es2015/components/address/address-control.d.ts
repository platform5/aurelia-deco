import { HttpClient } from 'aurelia-fetch-client';
export declare class AddressControl {
    private httpClient;
    value: any;
    variant: 'filled' | 'outline';
    dense: boolean;
    disabled: boolean;
    countryType: 'input' | 'list';
    countryList: 'all' | Array<string>;
    labels: string[];
    dicoContext: string;
    allowDescription: boolean;
    allowLatLngEdition: boolean;
    private ready;
    constructor(httpClient: HttpClient);
    bind(): void;
    valueChanged(): void;
    fixValue(): void;
    get computedCountryList(): Array<string>;
    context(): string;
    addressChanged(): void;
    fetchLatLng(): Promise<void>;
}
