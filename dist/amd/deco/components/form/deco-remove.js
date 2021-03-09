var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-framework", "aurelia-pal"], function (require, exports, aurelia_framework_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DecoRemove = void 0;
    var DecoRemove = /** @class */ (function () {
        function DecoRemove(element) {
            this.element = element;
            this.suffix = '';
            this.confirmLabel = 'Confirm ?';
            this.processing = false;
            this.route = '';
            this.requestConfirmation = false;
        }
        DecoRemove.prototype.remove = function () {
            var _this = this;
            this.requestConfirmation = true;
            this.timeout = setTimeout(function () {
                _this.requestConfirmation = false;
            }, 2000);
        };
        DecoRemove.prototype.confirm = function () {
            var _this = this;
            clearTimeout(this.timeout);
            this.processing = true;
            this.instance.remove(this.suffix, { route: this.route }).then(function () {
                _this.processing = false;
                _this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('removed', {
                    bubbles: true,
                    detail: {
                        instance: _this.instance
                    }
                }));
            }).catch(function (error) {
                _this.processing = false;
                // the removing-error is kept for downward compatibility. Use deco-error instead
                _this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('removing-error', {
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
        };
        __decorate([
            aurelia_framework_1.bindable
        ], DecoRemove.prototype, "instance", void 0);
        __decorate([
            aurelia_framework_1.bindable
        ], DecoRemove.prototype, "suffix", void 0);
        __decorate([
            aurelia_framework_1.bindable
        ], DecoRemove.prototype, "confirmLabel", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay })
        ], DecoRemove.prototype, "processing", void 0);
        __decorate([
            aurelia_framework_1.bindable
        ], DecoRemove.prototype, "route", void 0);
        DecoRemove = __decorate([
            aurelia_framework_1.inject(Element)
        ], DecoRemove);
        return DecoRemove;
    }());
    exports.DecoRemove = DecoRemove;
});
