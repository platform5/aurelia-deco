import { Interceptor } from 'aurelia-fetch-client';
export interface ExtendedRequest extends Request {
    _jsonBody?: any;
    _maxCaptureIndex?: number;
}
export declare class RequestRecorder {
    recording: boolean;
    requests: Array<RecordedRequest>;
    idByVar: {
        [key: string]: string;
    };
    varById: {
        [key: string]: string;
    };
    host: string;
    keepRequestCallback: (request: RecordedRequest) => boolean;
    expectPropertyCallback: (expect: ExpectProperty) => void;
    headerCallback: (headerName: string, headerValue: string) => string | null;
    requestInterceptor(): Interceptor;
    setRequestHeaders(request: RecordedRequest): void;
    setRequestExpectations(request: RecordedRequest): void;
    handleEvent(event: Event): void;
    start(): void;
    stop(): void;
    toggle(): void;
}
export interface ExpectProperty {
    prop: string;
    key: string;
    originalValue?: string;
    expectedValue?: string;
    capturedValue?: string;
    type: 'exact' | 'captured' | 'has' | 'ignore';
}
export declare class RecordedRequest {
    rawUrl: string;
    testUrl: string;
    method: string;
    rawHeaders: {
        [key: string]: any;
    };
    testHeaders: {
        [key: string]: any;
    };
    rawBody: any;
    testBody: any;
    response: RecordedResponse;
    captures: {
        [key: string]: string;
    };
    keep: boolean;
    expectStatusCode: boolean;
    expectProperties: Array<ExpectProperty>;
    maxCaptureIndex: number;
}
export declare class RecordedResponse {
    statusCode: number;
    statusText: string;
    type: 'array' | 'object';
    headers: {
        [key: string]: any;
    };
    data: any;
}
