var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { RequestRecorder } from './../../helpers/request-recorder';
import { RequestRecorderViewer } from './request-recorder-viewer';
import { inject, bindable } from 'aurelia-framework';
import { UxModalService } from '@aurelia-ux/modal';
var RequestRecorderTool = /** @class */ (function () {
    function RequestRecorderTool(recorder, modalService) {
        this.recorder = recorder;
        this.modalService = modalService;
        this.autorun = false;
    }
    RequestRecorderTool.prototype.bind = function () {
        if (this.autorun) {
            this.recorder.start();
        }
    };
    RequestRecorderTool.prototype.view = function () {
        this.modalService.open({ viewModel: RequestRecorderViewer });
    };
    __decorate([
        bindable
    ], RequestRecorderTool.prototype, "autorun", void 0);
    RequestRecorderTool = __decorate([
        inject(RequestRecorder, UxModalService)
    ], RequestRecorderTool);
    return RequestRecorderTool;
}());
export { RequestRecorderTool };
