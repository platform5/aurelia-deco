var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DicoModel } from '../../models/dico.model';
import { inject, bindable, BindingEngine } from 'aurelia-framework';
var DicoTranslateKeyLocale = /** @class */ (function () {
    function DicoTranslateKeyLocale(bindingEngine) {
        var _this = this;
        this.bindingEngine = bindingEngine;
        this.allDicoItemsByLocale = [];
        this.visible = false;
        this.instance = null;
        this.bindingEngine.collectionObserver(this.allDicoItemsByLocale)
            .subscribe(function () {
            _this.setInstance();
        });
    }
    DicoTranslateKeyLocale.prototype.bind = function () {
        this.setInstance();
        setTimeout(function () {
            //this.setInstance();
        }, 1000);
    };
    DicoTranslateKeyLocale.prototype.iterationChanged = function () {
        this.setInstance();
    };
    DicoTranslateKeyLocale.prototype.localeChanged = function () {
        this.setInstance();
    };
    DicoTranslateKeyLocale.prototype.allDicoItemsByLocaleChanged = function () {
        this.setInstance();
    };
    DicoTranslateKeyLocale.prototype.attached = function () {
    };
    DicoTranslateKeyLocale.prototype.detached = function () {
        if (this.subscription)
            this.subscription.dispose();
    };
    DicoTranslateKeyLocale.prototype.setInstance = function () {
        var _this = this;
        for (var _i = 0, _a = this.allDicoItemsByLocale; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.key === this.key) {
                if (item.locales && item.locales[this.locale] && item.locales[this.locale] instanceof DicoModel) {
                    this.instance = item.locales[this.locale];
                    return;
                }
                else if (item.locales) {
                    this.subscription = this.bindingEngine.propertyObserver(item, 'locales')
                        .subscribe(function () {
                        _this.setInstance();
                    });
                }
            }
        }
        this.instance = null;
    };
    DicoTranslateKeyLocale.prototype.suffixFromLocale = function (locale) {
        return '?locale=' + locale;
    };
    DicoTranslateKeyLocale.prototype.valueChanged = function () {
        if (this.instance) {
            this.instance.updateProperties(this.suffixFromLocale(this.locale), ['value']);
        }
    };
    __decorate([
        bindable
    ], DicoTranslateKeyLocale.prototype, "iteration", void 0);
    __decorate([
        bindable
    ], DicoTranslateKeyLocale.prototype, "key", void 0);
    __decorate([
        bindable
    ], DicoTranslateKeyLocale.prototype, "locale", void 0);
    __decorate([
        bindable
    ], DicoTranslateKeyLocale.prototype, "allDicoItemsByLocale", void 0);
    DicoTranslateKeyLocale = __decorate([
        inject(BindingEngine)
    ], DicoTranslateKeyLocale);
    return DicoTranslateKeyLocale;
}());
export { DicoTranslateKeyLocale };
