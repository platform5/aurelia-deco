"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortValueConverter = exports.UxFileInput = void 0;
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
var aurelia_resources_1 = require("aurelia-resources");
var aurelia_logging_1 = require("aurelia-logging");
var file_upload_1 = require("../../helpers/file-upload");
var deco_api_1 = require("../../helpers/deco-api");
var log;
log = aurelia_logging_1.getLogger('ux-file-input');
var UxFileInput = /** @class */ (function () {
    function UxFileInput(element, styleEngine, api) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.api = api;
        this.autofocus = null;
        this.disabled = false;
        this.multiple = false;
        this.readonly = false;
        this.buttonLabel = 'Select File';
        this.files = []; // hold files for multiple files input
        this.previewsFormats = [];
        this.defaultPreview = '';
        this.imageExportQuality = 0.6;
        this.rawValue = '';
        this.focused = false;
        //public value: any = undefined;
        this.activeSort = false;
        this.canEdit = false;
        this.credits = '-1';
        this.canRemoveBg = false;
        this.selectedFiles = [];
        this.removingBackground = false;
    }
    UxFileInput.prototype.bind = function () {
        var element = this.element;
        var inputbox = this.inputbox;
        this.activeSort = true;
        if (this.autofocus || this.autofocus === '') {
            this.focused = true;
        }
        if (element.hasAttribute('placeholder')) {
            var attributeValue = element.getAttribute('placeholder');
            if (attributeValue) {
                inputbox.setAttribute('placeholder', attributeValue);
                element.removeAttribute('placeholder');
            }
        }
        if (this.accept) {
            inputbox.setAttribute('accept', this.accept.toString());
        }
        this.themeChanged(this.theme);
        this.determineCanEdit();
    };
    UxFileInput.prototype.readonlyChanged = function () {
        this.determineCanEdit();
    };
    UxFileInput.prototype.disabledChanged = function () {
        this.determineCanEdit();
    };
    UxFileInput.prototype.determineCanEdit = function () {
        if (this.readonly || this.readonly === '') {
            this.canEdit = false;
        }
        else if (this.disabled || this.disabled === '') {
            this.canEdit = false;
        }
        else {
            this.canEdit = true;
        }
    };
    UxFileInput.prototype.attached = function () {
        this.inputbox.addEventListener('change', stopEvent);
        this.inputbox.addEventListener('input', stopEvent);
    };
    UxFileInput.prototype.detached = function () {
        this.inputbox.removeEventListener('change', stopEvent);
        this.inputbox.removeEventListener('input', stopEvent);
    };
    UxFileInput.prototype.selectFile = function () {
        this.activeSort = false;
        this.inputbox.click();
    };
    UxFileInput.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'input-file';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxFileInput.prototype.rawValueChanged = function (newValue) {
        if (this.inputbox && this.inputbox.files)
            this.addFiles();
    };
    UxFileInput.prototype.addFiles = function () {
        var _this = this;
        var newFiles = [];
        for (var index = 0; index < this.inputbox.files.length; index++) {
            var file = this.inputbox.files.item(index);
            newFiles.push(file);
        }
        if (!this.multiple)
            newFiles.slice(0, 1);
        file_upload_1.FileUpload.generatePreviews(newFiles, this.previewsFormats, this.defaultPreview, this.imageExportQuality).then(function () {
            var form = new FormData();
            for (var _i = 0, newFiles_1 = newFiles; _i < newFiles_1.length; _i++) {
                var file = newFiles_1[_i];
                file.toUpload = true;
                form.append('image', file, file.name);
                if (_this.multiple) {
                    if (_this.files === null || _this.files === undefined)
                        _this.files = [file];
                    else
                        _this.files.push(file);
                }
                else {
                    _this.file = file;
                }
            }
        });
        this.inputform.reset();
    };
    UxFileInput.prototype.removeFile = function (file) {
        var _this = this;
        this.activeSort = false; // disable sorting if remove file
        if (!this.multiple) {
            this.file = null;
            return;
        }
        var removedFile;
        if (typeof file === 'number') {
            removedFile = this.files.splice(file, 1)[0];
            if (removedFile && removedFile.toUpload !== true) {
                if (!this.files.removedFiles)
                    this.files.removedFiles = [];
                this.files.removedFiles.push(removedFile);
            }
        }
        else {
            var index = this.files.indexOf(file);
            var tmpFiles_1 = JSON.parse(JSON.stringify(this.files));
            var tmpRemovedFiles_1 = this.files.removedFiles;
            removedFile = tmpFiles_1.splice(index, 1)[0];
            if (removedFile && removedFile.toUpload !== true) {
                if (!tmpRemovedFiles_1)
                    tmpRemovedFiles_1 = [];
                tmpRemovedFiles_1.push(removedFile);
            }
            setTimeout(function () {
                var newFiles = [];
                for (var _i = 0, _a = tmpFiles_1; _i < _a.length; _i++) {
                    var file_1 = _a[_i];
                    newFiles.push(file_1);
                }
                _this.files = newFiles;
                _this.files.removedFiles = tmpRemovedFiles_1;
            }, 10);
        }
    };
    UxFileInput.prototype.removebg = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var file, formData, response, replaced, gFiles, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.removingBackground) {
                            return [2 /*return*/];
                        }
                        this.removingBackground = true;
                        file = this.multiple ? this.files[index] : this.file;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        formData = new FormData();
                        formData.append('file', file, file.name);
                        return [4 /*yield*/, this.api.post('/remove-bg', formData, { bodyFormat: 'FormData' })];
                    case 2:
                        response = _a.sent();
                        this.credits = response.headers.get("X-Credits");
                        return [4 /*yield*/, response.blob()];
                    case 3:
                        replaced = _a.sent();
                        file.replaced = replaced;
                        gFiles = [file];
                        file.previewData = '';
                        file.previews = {};
                        file.blobs = {};
                        return [4 /*yield*/, file_upload_1.FileUpload.generatePreviews(gFiles, this.previewsFormats, this.defaultPreview, this.imageExportQuality)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        aurelia_resources_1.errorify(error_1);
                        return [3 /*break*/, 6];
                    case 6:
                        this.removingBackground = false;
                        this.activeSort = false; // disable sorting if remove background
                        return [2 /*return*/];
                }
            });
        });
    };
    UxFileInput.prototype.downloadFile = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var tmpFiles, file_2, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tmpFiles = JSON.parse(JSON.stringify(this.files));
                        file_2 = tmpFiles[index];
                        return [4 /*yield*/, this.instance.getUxFileData(this.property, file_2).then(function (blob) {
                                return blob;
                            }).then(function (f) {
                                var objectURL;
                                if (objectURL) {
                                    window.URL.revokeObjectURL(objectURL);
                                }
                                _this.api.get(file_2.filename).then(function (response) {
                                    return response.arrayBuffer();
                                }).then(function (buffer) {
                                    var fileBuffer = new File([buffer], file_2.name, { type: file_2.type });
                                    objectURL = window.URL.createObjectURL(fileBuffer);
                                    var link = document.createElement('a');
                                    link.setAttribute('href', objectURL);
                                    link.setAttribute('download', file_2.name);
                                    link.click();
                                }).catch(aurelia_resources_1.errorify);
                                return f;
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [3 /*break*/, 3];
                    case 3:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    UxFileInput.prototype.topList = function (index) {
        var _this = this;
        for (var i = 0; i < this.files.length; i++) {
            this.files[i].index = i;
        }
        var tmpFiles = JSON.parse(JSON.stringify(this.files));
        setTimeout(function () {
            var newFiles = [];
            var i = 0;
            for (var _i = 0, _a = tmpFiles; _i < _a.length; _i++) {
                var file = _a[_i];
                if (i == index && i != 0) {
                    file.index = i - 1;
                }
                else if (i == index - 1 && index - 1 >= 0) {
                    file.index = i + 1;
                }
                else {
                }
                newFiles.push(file);
                i++;
            }
            newFiles.sort(function (a, b) {
                return a.index - b.index;
            });
            _this.files = newFiles;
            _this.files.sortFiles = newFiles;
        }, 10);
    };
    __decorate([
        aurelia_templating_1.bindable
    ], UxFileInput.prototype, "autofocus", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxFileInput.prototype, "disabled", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxFileInput.prototype, "accept", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxFileInput.prototype, "multiple", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxFileInput.prototype, "readonly", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxFileInput.prototype, "theme", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxFileInput.prototype, "buttonLabel", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxFileInput.prototype, "file", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxFileInput.prototype, "files", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxFileInput.prototype, "previewsFormats", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxFileInput.prototype, "defaultPreview", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxFileInput.prototype, "imageExportQuality", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxFileInput.prototype, "instance", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxFileInput.prototype, "property", void 0);
    __decorate([
        aurelia_binding_1.observable
    ], UxFileInput.prototype, "rawValue", void 0);
    __decorate([
        aurelia_binding_1.observable
    ], UxFileInput.prototype, "focused", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], UxFileInput.prototype, "canRemoveBg", void 0);
    __decorate([
        aurelia_binding_1.observable
    ], UxFileInput.prototype, "selectedFiles", void 0);
    UxFileInput = __decorate([
        aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine, deco_api_1.DecoApi),
        aurelia_templating_1.customElement('ux-file-input')
    ], UxFileInput);
    return UxFileInput;
}());
exports.UxFileInput = UxFileInput;
var SortValueConverter = /** @class */ (function () {
    function SortValueConverter() {
    }
    SortValueConverter.prototype.toView = function (array, propertyName, direction) {
        console.log('sort', propertyName);
        var factor = direction === 'ascending' ? 1 : -1;
        return array.slice(0).sort(function (a, b) {
            return (a[propertyName] - b[propertyName]) * factor;
        });
    };
    return SortValueConverter;
}());
exports.SortValueConverter = SortValueConverter;
function stopEvent(e) {
    e.stopPropagation();
}
