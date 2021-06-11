import { UxFileItem } from '../helpers/file-upload';
import { Deco } from '../interfaces/deco';
import { DecoApi, RequestOption } from '../helpers/deco-api';
import { ValidationController } from 'aurelia-validation';
import { StringAnyMap, StringTMap } from 'aurelia-resources';
export interface ModelOptions {
    enableStory?: boolean;
}
export interface FilePreviewOptions {
    etag?: null | string;
    fileId: null | string;
    route?: string;
}
export interface GetAllOptions extends RequestOption {
    route?: string;
    getRefLocale?: boolean;
    includeResponse?: boolean;
}
export interface GetOneOptions extends RequestOption {
    route?: string;
    getRefLocale?: boolean;
    includeResponse?: boolean;
}
export interface SaveOptions extends RequestOption {
    route?: string;
    getRefLocale?: boolean;
    body?: any;
    bodyFormat?: 'json' | 'FormData';
    includeResponse?: boolean;
}
export interface FixBodyOptions extends RequestOption {
    bodyFormat?: 'json' | 'FormData';
}
export interface RemoveOptions extends RequestOption {
    route?: string;
}
export interface UpdatePropertiesOptions extends RequestOption {
    route?: string;
    bodyFormat?: 'json' | 'FormData';
    updateInstanceWithResponse?: boolean;
    includeResponse?: boolean;
}
export declare const model: (baseroute: string, options?: ModelOptions) => (target: any) => void;
export declare class Model {
    id: string;
    _createdAt: Date;
    _createdBy: string;
    _updatedAt: Date;
    _updatedBy: string;
    _refLocales?: StringTMap<StringAnyMap>;
    static options: ModelOptions;
    static get deco(): Deco;
    get deco(): Deco;
    static get api(): DecoApi;
    get api(): DecoApi;
    static get isMultilang(): boolean;
    get isMultilang(): boolean;
    static request(method: 'get' | 'post' | 'put' | 'delete', uri?: string, body?: any, options?: RequestOption): Promise<Array<Model>>;
    static addLocaleInSuffixIfNecessary(suffix: string, options?: GetAllOptions): string;
    addLocaleInSuffixIfNecessary(suffix: string, options?: GetAllOptions): string;
    static getAll<T extends typeof Model>(this: T, suffix?: string, options?: GetAllOptions): Promise<Array<InstanceType<T>>>;
    static getOneWithId<T extends typeof Model>(this: T, id: string, suffix?: string, options?: GetOneOptions): Promise<InstanceType<T>>;
    static getOneWithQuery<T extends typeof Model>(this: T): Promise<InstanceType<T>>;
    static instanceFromElement<T extends typeof Model>(this: T, element: any): InstanceType<T>;
    static instanceFromApi<T extends typeof Model>(this: T, element: any): Promise<InstanceType<T>>;
    static instanceFromUnclassedElement<T extends typeof Model>(this: T, element: any): InstanceType<T>;
    get _label(): string;
    save(suffix?: string, options?: SaveOptions): Promise<any>;
    fixBodyIfFilesToUpload(body: any, options?: FixBodyOptions): Promise<any>;
    remove(suffix?: string, options?: RemoveOptions): Promise<any>;
    updateInstanceFromElement<T extends Model>(this: T, element: any, properties?: Array<string>): Promise<T>;
    updateInstanceFromUnclassedElement<T extends Model>(this: T, element: any, properties?: Array<string>): T;
    unClass(): any;
    updateProperties(suffix: string, properties: Array<string>, options?: UpdatePropertiesOptions): Promise<this>;
    getFilePreview(property: string, format: string, options?: FilePreviewOptions): Promise<Blob | null>;
    getFilePreviewUrl(property: string, format: string, options?: FilePreviewOptions): Promise<string | null>;
    getUxFilePreviewData(property: string, file: UxFileItem, format: string): Promise<void>;
    validationRules(): any;
    validate(): Promise<boolean>;
    private _validationController;
    get validationController(): ValidationController;
    static get baseroute(): string;
    static getAllRoute(): string;
    static getOneRoute(elementId: string): string;
    static postRoute(): string;
    static putRoute(elementId: string): string;
    static deleteRoute(elementId: string): string;
    getRoute(): string;
    getOneRoute(elementId: string): string;
    postRoute(): string;
    putRoute(elementId: string): string;
    deleteRoute(elementId: string): string;
    get(propertyName: string): any;
    set(propertyName: string, value: any): void;
}
