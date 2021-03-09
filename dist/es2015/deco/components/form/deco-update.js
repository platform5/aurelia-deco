var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject, bindable, bindingMode } from 'aurelia-framework';
import { DOM } from 'aurelia-pal';
import { DecoApi } from '../../helpers/deco-api';
var DecoUpdate = /** @class */ (function () {
    function DecoUpdate(element, decoApi) {
        this.element = element;
        this.decoApi = decoApi;
        this.suffix = '';
        this.autoaddLocaleSuffix = false;
        this.processing = false;
        this.route = '';
    }
    DecoUpdate.prototype.update = function () {
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
                _this.instance.updateProperties(_this.suffix, Object.keys(_this.instance), { route: _this.route }).then(function (element) {
                    _this.processing = false;
                    _this.element.dispatchEvent(DOM.createCustomEvent('updated', {
                        bubbles: true,
                        detail: {
                            instance: _this.instance,
                            newElement: element
                        }
                    }));
                }).catch(function (error) {
                    _this.processing = false;
                    // the upating-error is kept for downward compatibility. Use deco-error instead
                    _this.element.dispatchEvent(DOM.createCustomEvent('updating-error', {
                        bubbles: true,
                        detail: {
                            error: error
                        }
                    }));
                    _this.element.dispatchEvent(DOM.createCustomEvent('deco-error', {
                        bubbles: true,
                        detail: {
                            error: error
                        }
                    }));
                });
            }
            else {
                _this.processing = false;
                _this.element.dispatchEvent(DOM.createCustomEvent('validation-error', {
                    bubbles: true
                }));
            }
        });
    };
    __decorate([
        bindable
    ], DecoUpdate.prototype, "instance", void 0);
    __decorate([
        bindable
    ], DecoUpdate.prototype, "suffix", void 0);
    __decorate([
        bindable
    ], DecoUpdate.prototype, "autoaddLocaleSuffix", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay })
    ], DecoUpdate.prototype, "processing", void 0);
    __decorate([
        bindable
    ], DecoUpdate.prototype, "route", void 0);
    DecoUpdate = __decorate([
        inject(Element, DecoApi)
    ], DecoUpdate);
    return DecoUpdate;
}());
export { DecoUpdate };
