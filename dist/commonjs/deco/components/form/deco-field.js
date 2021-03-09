"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoField = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var decorators_1 = require("../../decorators");
var aurelia_logging_1 = require("aurelia-logging");
var deco_api_1 = require("../../helpers/deco-api");
var log = aurelia_logging_1.getLogger('components:deco-field');
var DecoField = /** @class */ (function () {
    function DecoField(element, decoApi) {
        this.element = element;
        this.decoApi = decoApi;
        this.autohint = false;
        this.variant = '';
        this.displayRefLocale = false;
        this.refLocale = '';
        this.outline = false;
        this.labelPosition = 'floating';
        this.disabled = false;
        this.dicoContext = '';
        this.fetchAllModels = true; // if true, the comp will fetch all related models to provide a list of select options when field type is model or models
        this.modelsList = null; // if provided, this value will be the list of models used as select options when field type is model or models
        this.label = '';
        this.hint = '';
        this._refLocale = '';
    }
    DecoField.prototype.bind = function () {
        this.initField();
    };
    DecoField.prototype.instanceChanged = function () {
        this.initField();
    };
    DecoField.prototype.propertyChanged = function () {
        this.initField();
    };
    DecoField.prototype.refLocaleChanged = function () {
        this.setRefLocale();
    };
    DecoField.prototype.initField = function () {
        this.processProperty();
        this.processType();
        this.setRefLocale();
    };
    DecoField.prototype.processProperty = function () {
        this.label = this.property;
        this.hint = this.autohint ? this.property : '';
        var rightInstance = this.instance instanceof decorators_1.Model;
        if (!this.instance || !rightInstance) {
            log.warn('this.instance [' + this.property + '] is not set properly');
            this._type = '';
            return;
        }
        this.typeDecorator = this.instance.deco.propertyTypes[this.property];
        this.options = this.instance.deco.propertyTypesOptions[this.property];
        if (this.typeDecorator === undefined) {
            throw new Error('[deco-field] typeDecorator is undefined for property: ' + this.property);
        }
        this._type = this.type ? this.type : this.typeDecorator.name;
        if (this.instance.deco.propertyForms[this.property]) {
            for (var _i = 0, _a = this.instance.deco.propertyForms[this.property]; _i < _a.length; _i++) {
                var propertyForm = _a[_i];
                if (propertyForm.type === 'label')
                    this.label = propertyForm.options.text;
                if (propertyForm.type === 'hint')
                    this.hint = propertyForm.options.text;
            }
        }
    };
    DecoField.prototype.processType = function () {
        var _this = this;
        if (this._type === 'string' && (this.options.textarea || this.variant === 'textarea')) {
            setTimeout(function () {
                if (_this.textarea && _this.textarea.fitTextContent && typeof _this.textarea.fitTextContent === 'function')
                    _this.textarea.fitTextContent();
            }, 20);
            setTimeout(function () {
                if (_this.textarea && _this.textarea.fitTextContent && typeof _this.textarea.fitTextContent === 'function')
                    _this.textarea.fitTextContent();
            }, 500);
        }
        if (this._type === 'file' && this.instance[this.property] && this.instance[this.property].type && this.instance[this.property].type.substr(0, 6) === 'image/') {
            var format = '320:320';
            if (this.options.previewsFormats && this.options.previewsFormats.length) {
                if (this.options.defaultFormat && this.options.previewsFormats.indexOf(this.options.previewsFormats) !== -1) {
                    format = this.options.defaultFormat;
                }
                else {
                    format = this.options.previewsFormats[0];
                }
            }
            this.instance.getFilePreviewUrl(this.property, format).then(function (url) {
                _this.instance[_this.property].previewData = url;
            });
        }
        if (this._type === 'files' && this.instance[this.property] && Array.isArray(this.instance[this.property])) {
            var files = this.instance[this.property];
            var format = '320:320';
            if (this.options.previewsFormats && this.options.previewsFormats.length) {
                if (this.options.defaultFormat && this.options.previewsFormats.indexOf(this.options.previewsFormats) !== -1) {
                    format = this.options.defaultFormat;
                }
                else {
                    format = this.options.previewsFormats[0];
                }
            }
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                if (file.type && file.type.substr(0, 6) === 'image/') {
                    this.instance.getUxFilePreviewData(this.property, file, format);
                }
            }
        }
        if (this._type === 'select' && this.options.multiple) {
            if (typeof this.instance[this.property] === 'string') {
                this.instance[this.property] = [];
            }
            else if (!Array.isArray(this.instance[this.property])) {
                this.instance[this.property] = [];
            }
        }
        if (this._type === 'model' || this._type === 'models') {
            if (this.fetchAllModels && !this.modelsList) {
                this.options.model.getAll().then(function (results) {
                    _this.selectOptions = results;
                });
            }
            else if (this.modelsList && Array.isArray(this.modelsList)) {
                this.selectOptions = this.modelsList;
            }
        }
    };
    DecoField.prototype.setRefLocale = function () {
        this._refLocale = this.refLocale || this.decoApi.state.refLanguage;
    };
    DecoField.prototype.firstLetterUpper = function (text) {
        if (text && text.length) {
            return text.substr(0, 1).toUpperCase() + text.substr(1);
        }
        return '';
    };
    DecoField.prototype.context = function () {
        return this.dicoContext ? this.dicoContext + '.' : '';
    };
    __decorate([
        aurelia_framework_1.bindable
    ], DecoField.prototype, "instance", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoField.prototype, "property", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoField.prototype, "type", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoField.prototype, "autohint", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoField.prototype, "variant", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoField.prototype, "displayRefLocale", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoField.prototype, "refLocale", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoField.prototype, "placeholder", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoField.prototype, "textarea", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoField.prototype, "outline", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoField.prototype, "labelPosition", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoField.prototype, "disabled", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoField.prototype, "dicoContext", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoField.prototype, "fetchAllModels", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoField.prototype, "modelsList", void 0);
    DecoField = __decorate([
        aurelia_framework_1.inject(Element, deco_api_1.DecoApi)
    ], DecoField);
    return DecoField;
}());
exports.DecoField = DecoField;
