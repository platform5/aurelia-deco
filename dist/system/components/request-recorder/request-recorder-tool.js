System.register(["./../../helpers/request-recorder", "./request-recorder-viewer", "aurelia-framework", "@aurelia-ux/modal"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var request_recorder_1, request_recorder_viewer_1, aurelia_framework_1, modal_1, RequestRecorderTool;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (request_recorder_1_1) {
                request_recorder_1 = request_recorder_1_1;
            },
            function (request_recorder_viewer_1_1) {
                request_recorder_viewer_1 = request_recorder_viewer_1_1;
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (modal_1_1) {
                modal_1 = modal_1_1;
            }
        ],
        execute: function () {
            RequestRecorderTool = /** @class */ (function () {
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
            exports_1("RequestRecorderTool", RequestRecorderTool);
        }
    };
});
