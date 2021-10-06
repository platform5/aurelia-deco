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
import { customElement, bindable } from 'aurelia-templating';
import { observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { getLogger } from 'aurelia-logging';
import { FileUpload } from '../../helpers/file-upload';
var log;
log = getLogger('ux-file-input');
var UxFileInput = /** @class */ (function () {
    function UxFileInput(element, styleEngine) {
        this.element = element;
        this.styleEngine = styleEngine;
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
        this.canEdit = false;
        this.canRemoveBg = false;
        this.selectedFiles = [];
    }
    UxFileInput_1 = UxFileInput;
    UxFileInput.prototype.bind = function () {
        var element = this.element;
        var inputbox = this.inputbox;
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
        FileUpload.generatePreviews(newFiles, this.previewsFormats, this.defaultPreview, this.imageExportQuality).then(function () {
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
            return __generator(this, function (_a) {
                return [2 /*return*/, UxFileInput_1.removeBG(this.files, index)];
            });
        });
    };
    var UxFileInput_1;
    UxFileInput.removeBG = function (files) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); };
    __decorate([
        bindable
    ], UxFileInput.prototype, "autofocus", void 0);
    __decorate([
        bindable
    ], UxFileInput.prototype, "disabled", void 0);
    __decorate([
        bindable
    ], UxFileInput.prototype, "accept", void 0);
    __decorate([
        bindable
    ], UxFileInput.prototype, "multiple", void 0);
    __decorate([
        bindable
    ], UxFileInput.prototype, "readonly", void 0);
    __decorate([
        bindable
    ], UxFileInput.prototype, "theme", void 0);
    __decorate([
        bindable
    ], UxFileInput.prototype, "buttonLabel", void 0);
    __decorate([
        bindable
    ], UxFileInput.prototype, "file", void 0);
    __decorate([
        bindable
    ], UxFileInput.prototype, "files", void 0);
    __decorate([
        bindable
    ], UxFileInput.prototype, "previewsFormats", void 0);
    __decorate([
        bindable
    ], UxFileInput.prototype, "defaultPreview", void 0);
    __decorate([
        bindable
    ], UxFileInput.prototype, "imageExportQuality", void 0);
    __decorate([
        observable
    ], UxFileInput.prototype, "rawValue", void 0);
    __decorate([
        observable
    ], UxFileInput.prototype, "focused", void 0);
    __decorate([
        bindable
    ], UxFileInput.prototype, "canRemoveBg", void 0);
    __decorate([
        observable
    ], UxFileInput.prototype, "selectedFiles", void 0);
    UxFileInput = UxFileInput_1 = __decorate([
        inject(Element, StyleEngine),
        customElement('ux-file-input')
    ], UxFileInput);
    return UxFileInput;
}());
export { UxFileInput };
function stopEvent(e) {
    e.stopPropagation();
}
