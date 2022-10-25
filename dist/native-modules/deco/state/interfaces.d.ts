export declare let initState: {
    stateVersion: string;
};
export interface DecoAppState {
    [key: string]: any;
    language: string;
    languages: Array<string>;
    country?: string;
    countries: Array<string>;
    refLanguage?: string;
    stateVersion: string;
}
