export interface IpStackLanguage {
    code: string;
    name: string;
    native: string;
}
export interface IpStackError {
    code: number;
    type: string;
    info: string;
}
export interface IpStackLocation {
    geoname_id: null | string;
    capital: string;
    languages: Array<IpStackLanguage>;
    country_flag: string;
    country_flag_emoji: string;
    country_flag_emoji_unicode: string;
    calling_code: string;
    is_eu: boolean;
}
export interface IpStackResponse {
    ip: string;
    type: 'ipv4' | 'ipv6';
    continent_code: string;
    continent_name: string;
    country_code: string;
    country_name: string;
    region_code: string;
    region_name: string;
    city: string;
    zip: string;
    latitude: number;
    longitude: number;
    location: IpStackLocation;
    error?: IpStackError;
}
export declare class IpStack {
    private static getApiKey;
    static autoDetect(apiKey?: string): Promise<IpStackResponse>;
    static standard(ip: string, apiKey: string): Promise<IpStackResponse>;
    static requester(apiKey: string): Promise<IpStackResponse>;
}
