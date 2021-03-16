"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecoSave = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_pal_1 = require("aurelia-pal");
var deco_api_1 = require("../../helpers/deco-api");
var DecoSave = /** @class */ (function () {
    function DecoSave(element, decoApi) {
        this.element = element;
        this.decoApi = decoApi;
        this.suffix = '';
        this.autoaddLocaleSuffix = false;
        this.processing = false;
        this.route = '';
    }
    DecoSave.prototype.save = function () {
        var _this = this;
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
        this.instance.validationController.validate().then(function (result) {
            if (result && result.valid) {
                _this.instance.save(_this.suffix, { route: _this.route }).then(function (element) {
                    _this.processing = false;
                    _this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('saved', {
                        bubbles: true,
                        detail: {
                            instance: _this.instance,
                            newElement: element
                        }
                    }));
                }).catch(function (error) {
                    _this.processing = false;
                    // the saving-error is kept for downward compatibility. Use deco-error instead
                    _this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('saving-error', {
                        bubbles: true,
                        detail: {
                            error: error
                        }
                    }));
                    _this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('deco-error', {
                        bubbles: true,
                        detail: {
                            error: error
                        }
                    }));
                });
            }
            else {
                _this.processing = false;
                _this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('validation-error', {
                    bubbles: true
                }));
            }
        });
    };
    __decorate([
        aurelia_framework_1.bindable
    ], DecoSave.prototype, "instance", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoSave.prototype, "suffix", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoSave.prototype, "autoaddLocaleSuffix", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay })
    ], DecoSave.prototype, "processing", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], DecoSave.prototype, "route", void 0);
    DecoSave = __decorate([
        aurelia_framework_1.inject(Element, deco_api_1.DecoApi)
    ], DecoSave);
    return DecoSave;
}());
exports.DecoSave = DecoSave;
