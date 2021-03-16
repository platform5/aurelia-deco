import { Container } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { DecoAppState } from '../state';
import { Store } from 'aurelia-store';
import 'whatwg-fetch';
import { Logger } from 'aurelia-logging';
export interface DecoInitOptions {
    container?: Container;
    language?: string;
    languages?: Array<string>;
    country?: string;
    countries?: Array<string>;
    refLanguage?: string;
    force?: boolean;
}
export interface RequestOption {
    method?: 'get' | 'post' | 'delete' | 'put';
    headers?: any;
    bodyFormat?: 'json' | 'FormData';
    etag?: string;
}
export declare class DecoApi {
    http: HttpClient;
    configured: boolean;
    log: Logger;
    private initDone;
    store: Store<DecoAppState>;
    state: DecoAppState;
    container: Container;
    private version;
    constructor(http: HttpClient);
    init(store: Store<DecoAppState>, options?: DecoInitOptions): Promise<any>;
    configureHost(host: string): void;
    defaultOptions(options?: RequestOption): any;
    extendEntrpoint(entrypoint: string): string;
    get(entrypoint: string, options?: RequestOption): Promise<Response>;
    post(entrypoint: string, body?: any, options?: RequestOption): Promise<Response>;
    put(entrypoint: string, body?: any, options?: RequestOption): Promise<Response>;
    delete(entrypoint: string, body?: any, options?: RequestOption): Promise<Response>;
    private normalizeBody;
}
export declare function jsonify(response: Response): Promise<any>;
