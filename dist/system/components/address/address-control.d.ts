export declare class AddressControl {
    value: any;
    variant: 'filled' | 'outline';
    dense: boolean;
    disabled: boolean;
    countryType: 'input' | 'list';
    countryList: 'all' | Array<string>;
    labels: string[];
    dicoContext: string;
    allowDescription: boolean;
    private ready;
    bind(): void;
    valueChanged(): void;
    fixValue(): void;
    get computedCountryList(): Array<string>;
    context(): string;
}
