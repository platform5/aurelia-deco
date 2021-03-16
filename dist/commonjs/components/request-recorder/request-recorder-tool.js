"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestRecorderTool = void 0;
var request_recorder_1 = require("./../../helpers/request-recorder");
var request_recorder_viewer_1 = require("./request-recorder-viewer");
var aurelia_framework_1 = require("aurelia-framework");
var modal_1 = require("@aurelia-ux/modal");
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
        this.modalService.open({ viewModel: request_recorder_viewer_1.RequestRecorderViewer });
    };
    __decorate([
        aurelia_framework_1.bindable
    ], RequestRecorderTool.prototype, "autorun", void 0);
    RequestRecorderTool = __decorate([
        aurelia_framework_1.inject(request_recorder_1.RequestRecorder, modal_1.UxModalService)
    ], RequestRecorderTool);
    return RequestRecorderTool;
}());
exports.RequestRecorderTool = RequestRecorderTool;
