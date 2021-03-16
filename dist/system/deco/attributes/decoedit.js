System.register(["aurelia-framework", "../helpers/deco-api"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, deco_api_1, DecoeditCustomAttribute;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (deco_api_1_1) {
                deco_api_1 = deco_api_1_1;
            }
        ],
        execute: function () {
            DecoeditCustomAttribute = /** @class */ (function () {
                function DecoeditCustomAttribute(element, decoApi) {
                    this.decoApi = decoApi;
                    this.property = '';
                    this.trigger = 'change';
                    this.unescapeContent = true;
                    this.suffix = '';
                    this.autoaddLocaleSuffix = false;
                    this.edited = false;
                    this.processing = false;
                    this.error = false;
                    this.element = element;
                    this.makeEditable();
                }
                DecoeditCustomAttribute.prototype.bind = function () {
                    this.initValue();
                    this.setCurrentValue();
                    this.setHandleChange();
                };
                DecoeditCustomAttribute.prototype.makeEditable = function () {
                    var ce = this.element.getAttribute('contenteditable');
                    if (ce !== 'string')
                        this.element.setAttribute('contenteditable', 'true');
                    this.element.classList.add('decoedit');
                };
                DecoeditCustomAttribute.prototype.initValue = function () {
                    this.element.innerHTML = this.instance[this.property];
                };
                DecoeditCustomAttribute.prototype.setCurrentValue = function () {
                    this.currentValue = this.element.innerHTML;
                };
                DecoeditCustomAttribute.prototype.setHandleChange = function () {
                    var _this = this;
                    this.element.addEventListener('input', function (e) {
                        _this.handleEdit(e);
                        if (_this.trigger === 'change') {
                            _this.handleUpdate(e);
                        }
                    });
                    if (this.trigger === 'blur') {
                        this.element.addEventListener('blur', function (e) {
                            _this.handleUpdate(e);
                        });
                    }
                };
                DecoeditCustomAttribute.prototype.handleEdit = function (e) {
                    this.edited = this.element.innerHTML !== this.currentValue;
                };
                DecoeditCustomAttribute.prototype.handleUpdate = function (e) {
                    this.updateValue();
                };
                DecoeditCustomAttribute.prototype.updateValue = function () {
                    var _this = this;
                    if (!this.edited)
                        return;
                    if (this.processing) {
                        setTimeout(function () {
                            _this.updateValue();
                        }, 100);
                        return;
                    }
                    this.processing = true;
                    if (this.autoaddLocaleSuffix && this.suffix.indexOf('locale=') === -1) {
                        if (this.suffix.indexOf('?') === -1) {
                            this.suffix += '?locale=';
                        }
                        else {
                            this.suffix += '&locale=';
                        }
                        this.suffix += this.decoApi.state.language;
                    }
                    this.instance[this.property] = this.element.innerHTML;
                    if (this.unescapeContent) {
                        var originalString = this.instance[this.property];
                        var unescapeString = decodeURIComponent(originalString);
                        unescapeString = originalString.replace(new RegExp('&lt;', 'g'), '<').replace(new RegExp('&gt;', 'g'), '>').replace(new RegExp('&amp;', 'g'), '&').replace(new RegExp('&nbsp;', 'g'), ' ');
                        this.instance[this.property] = unescapeString;
                    }
                    this.instance.updateProperties(this.suffix, [this.property]).then(function () {
                        _this.processing = false;
                        _this.edited = false;
                        _this.setCurrentValue();
                    }).catch(function (error) {
                        _this.processing = false;
                        _this.error = true;
                    });
                };
                DecoeditCustomAttribute.prototype.editedChanged = function () {
                    if (!this.element)
                        return;
                    if (this.edited)
                        this.element.classList.add('edited');
                    else
                        this.element.classList.remove('edited');
                };
                DecoeditCustomAttribute.prototype.processingChanged = function () {
                    if (!this.element)
                        return;
                    if (this.processing)
                        this.element.classList.add('processing');
                    else
                        this.element.classList.remove('processing');
                };
                DecoeditCustomAttribute.prototype.errorChanged = function () {
                    if (!this.element)
                        return;
                    if (this.error)
                        this.element.classList.add('error');
                    else
                        this.element.classList.remove('error');
                };
                __decorate([
                    aurelia_framework_1.bindable
                ], DecoeditCustomAttribute.prototype, "instance", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], DecoeditCustomAttribute.prototype, "property", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], DecoeditCustomAttribute.prototype, "trigger", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], DecoeditCustomAttribute.prototype, "unescapeContent", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], DecoeditCustomAttribute.prototype, "suffix", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], DecoeditCustomAttribute.prototype, "autoaddLocaleSuffix", void 0);
                __decorate([
                    aurelia_framework_1.observable
                ], DecoeditCustomAttribute.prototype, "edited", void 0);
                __decorate([
                    aurelia_framework_1.observable
                ], DecoeditCustomAttribute.prototype, "processing", void 0);
                __decorate([
                    aurelia_framework_1.observable
                ], DecoeditCustomAttribute.prototype, "error", void 0);
                DecoeditCustomAttribute = __decorate([
                    aurelia_framework_1.inject(Element, deco_api_1.DecoApi)
                ], DecoeditCustomAttribute);
                return DecoeditCustomAttribute;
            }());
            exports_1("DecoeditCustomAttribute", DecoeditCustomAttribute);
        }
    };
});
