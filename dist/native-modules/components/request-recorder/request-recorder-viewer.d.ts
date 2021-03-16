import { RequestRecorder } from './../../helpers/request-recorder';
import { UxModalService } from '@aurelia-ux/modal';
export declare class RequestRecorderViewer {
    private recorder;
    private modalService;
    artillery: string;
    constructor(recorder: RequestRecorder, modalService: UxModalService);
    dismiss(): void;
    get capturedIds(): Array<string>;
    get capturedVars(): Array<string>;
    capturedValue(key: string): string;
    capturedVar(key: string): string;
    generateArtillery(): void;
}
export declare class HighlightValueConverter {
    private recorder;
    constructor(recorder: RequestRecorder);
    toView(text: string): string;
}
