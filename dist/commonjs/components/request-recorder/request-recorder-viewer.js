"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightValueConverter = exports.RequestRecorderViewer = void 0;
var request_recorder_1 = require("./../../helpers/request-recorder");
var aurelia_framework_1 = require("aurelia-framework");
var modal_1 = require("@aurelia-ux/modal");
var RequestRecorderViewer = /** @class */ (function () {
    function RequestRecorderViewer(recorder, modalService) {
        this.recorder = recorder;
        this.modalService = modalService;
    }
    RequestRecorderViewer.prototype.dismiss = function () {
        this.modalService.cancel();
    };
    Object.defineProperty(RequestRecorderViewer.prototype, "capturedIds", {
        get: function () {
            return Object.keys(this.recorder.varById);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestRecorderViewer.prototype, "capturedVars", {
        get: function () {
            return Object.keys(this.recorder.idByVar);
        },
        enumerable: false,
        configurable: true
    });
    RequestRecorderViewer.prototype.capturedValue = function (key) {
        return this.recorder.idByVar[key];
    };
    RequestRecorderViewer.prototype.capturedVar = function (key) {
        return this.recorder.varById[key];
    };
    RequestRecorderViewer.prototype.generateArtillery = function () {
        this.artillery = '';
        var lines = [];
        for (var _i = 0, _a = this.recorder.requests.filter(function (i) { return i.keep; }); _i < _a.length; _i++) {
            var request = _a[_i];
            var expectProperties = request.expectProperties.filter(function (i) { return i.type !== 'ignore'; });
            lines.push({ level: 2, text: "- " + request.method.toLowerCase() + ":" });
            lines.push({ level: 4, text: "url: \"" + request.testUrl + "\"" });
            if (request.testHeaders) {
                lines.push({ level: 4, text: 'headers:' });
                for (var key in request.testHeaders) {
                    lines.push({ level: 5, text: key + ": \"" + request.testHeaders[key] + "\"" });
                }
            }
            if (request.testBody) {
                lines.push({ level: 4, text: 'json:' });
                for (var key in request.testBody) {
                    var val = request.testBody[key];
                    if (typeof val === 'string') {
                        lines.push({ level: 5, text: key + ": \"" + val + "\"" });
                    }
                    else if (typeof val === 'number') {
                        lines.push({ level: 5, text: key + ": " + val });
                    }
                    else {
                        lines.push({ level: 5, text: key + ": " + JSON.stringify(val) });
                    }
                }
            }
            if (request.captures && Object.keys(request.captures).length > 0) {
                lines.push({ level: 4, text: 'capture:' });
                for (var key in request.captures) {
                    lines.push({ level: 5, text: "- json: " + key });
                    lines.push({ level: 6, text: "as: " + request.captures[key] });
                }
            }
            if (request.expectStatusCode || expectProperties.length > 0) {
                lines.push({ level: 4, text: 'expect:' });
                if (request.expectStatusCode) {
                    lines.push({ level: 5, text: "- statusCode: " + request.response.statusCode });
                }
                if (expectProperties.length > 0) {
                    for (var _b = 0, expectProperties_1 = expectProperties; _b < expectProperties_1.length; _b++) {
                        var expect_1 = expectProperties_1[_b];
                        if (expect_1.type === 'has') {
                            lines.push({ level: 5, text: "- hasProperty: \"" + expect_1.key + "\"" });
                        }
                        else if (expect_1.type === 'exact') {
                            lines.push({ level: 5, text: "- equals:" });
                            lines.push({ level: 6, text: "- \"{{ response." + expect_1.key + " }}\"" });
                            lines.push({ level: 6, text: "- " + expect_1.expectedValue });
                        }
                        else if (expect_1.type === 'captured') {
                            lines.push({ level: 5, text: "- equals:" });
                            lines.push({ level: 6, text: "- \"{{ response." + expect_1.key + " }}\"" });
                            lines.push({ level: 6, text: "- " + expect_1.capturedValue });
                        }
                    }
                }
            }
        }
        for (var _c = 0, lines_1 = lines; _c < lines_1.length; _c++) {
            var line = lines_1[_c];
            var newLine = '';
            for (var index = 0; index < line.level; index++) {
                newLine += '&nbsp;&nbsp;';
            }
            newLine += line.text;
            this.artillery += newLine + '\n';
        }
    };
    __decorate([
        aurelia_framework_1.computedFrom('recorder.varById')
    ], RequestRecorderViewer.prototype, "capturedIds", null);
    __decorate([
        aurelia_framework_1.computedFrom('recorder.idByVar')
    ], RequestRecorderViewer.prototype, "capturedVars", null);
    RequestRecorderViewer = __decorate([
        aurelia_framework_1.inject(request_recorder_1.RequestRecorder, modal_1.UxModalService)
    ], RequestRecorderViewer);
    return RequestRecorderViewer;
}());
exports.RequestRecorderViewer = RequestRecorderViewer;
var HighlightValueConverter = /** @class */ (function () {
    function HighlightValueConverter(recorder) {
        this.recorder = recorder;
    }
    HighlightValueConverter.prototype.toView = function (text) {
        if (text.indexOf('capture') === -1)
            return text;
        for (var varName in this.recorder.idByVar) {
            var val = this.recorder.idByVar[varName];
            var regex = new RegExp("{{\\s" + varName + "\\s}}", 'gm');
            var replace = "<span title=\"" + val + "\" class=\"request-recorder-viewer__highlight\">{{\u00A0" + varName + " }}</span>";
            text = text.replace(regex, replace);
        }
        return text;
    };
    HighlightValueConverter = __decorate([
        aurelia_framework_1.inject(request_recorder_1.RequestRecorder)
    ], HighlightValueConverter);
    return HighlightValueConverter;
}());
exports.HighlightValueConverter = HighlightValueConverter;
