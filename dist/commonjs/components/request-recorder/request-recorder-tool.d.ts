import { RequestRecorder } from './../../helpers/request-recorder';
import { UxModalService } from '@aurelia-ux/modal';
export declare class RequestRecorderTool {
    private recorder;
    private modalService;
    autorun: boolean;
    constructor(recorder: RequestRecorder, modalService: UxModalService);
    bind(): void;
    view(): void;
}
