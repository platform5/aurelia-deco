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
exports.AdCountrySelector = void 0;
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_pal_1 = require("aurelia-pal");
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
var aurelia_logging_1 = require("aurelia-logging");
var aurelia_dialog_1 = require("aurelia-dialog");
var deco_api_1 = require("../helpers/deco-api");
var aurelia_resources_1 = require("aurelia-resources");
var log = aurelia_logging_1.getLogger('ad-country-selector');
// tslint:disable-next-line: no-submodule-imports
require("@aurelia-ux/core/components/ux-input-component.css");
// tslint:disable-next-line: no-submodule-imports
require("@aurelia-ux/core/components/ux-input-component--outline.css");
var AdCountrySelector = /** @class */ (function () {
    function AdCountrySelector(element, styleEngine, dialogService, deco, taskQueue) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.dialogService = dialogService;
        this.deco = deco;
        this.taskQueue = taskQueue;
        this.disabled = false;
        this.readonly = false;
        this.variant = 'filled';
        this.dense = false;
        this.countries = [];
        this.prefix = '';
        this.bindToState = false;
        this.focused = false;
        Object.setPrototypeOf(element, uxInputElementProto);
    }
    AdCountrySelector.prototype.bind = function () {
        this.dense = core_1.normalizeBooleanAttribute('dense', this.dense);
        this.themeChanged(this.theme);
    };
    Object.defineProperty(AdCountrySelector.prototype, "countriesList", {
        get: function () {
            if (this.countries && this.countries.length > 0) {
                return this.countries;
            }
            var countries = this.deco.state.countries;
            if (Array.isArray(countries) && countries.length > 0) {
                return countries;
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    AdCountrySelector.prototype.attached = function () {
        this.variantChanged(this.variant);
    };
    AdCountrySelector.prototype.detached = function () {
    };
    AdCountrySelector.prototype.getValue = function () {
        return this.value;
    };
    Object.defineProperty(AdCountrySelector.prototype, "displayValue", {
        get: function () {
            if (this.bindToState) {
                return this.deco.state.country;
            }
            else {
                return this.value;
            }
        },
        enumerable: false,
        configurable: true
    });
    AdCountrySelector.prototype.setValue = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.value !== value)) return [3 /*break*/, 3];
                        this.value = value;
                        if (!this.bindToState) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.deco.store.dispatch('setCountry', this.value)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.taskQueue) {
                            this.taskQueue.queueMicroTask(function () {
                                _this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('change', { bubbles: true, detail: _this.value }));
                            });
                        }
                        else {
                            setTimeout(function () {
                                _this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('change', { bubbles: true, detail: _this.value }));
                            }, 5);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdCountrySelector.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ad-selector';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    AdCountrySelector.prototype.focusedChanged = function (focused) {
        this.element.classList.toggle('ux-input-component--focused', focused);
        this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
    };
    AdCountrySelector.prototype.focus = function () {
        this.focused = true;
        this.openDialog();
    };
    AdCountrySelector.prototype.openDialog = function () {
        var _this = this;
        this.dialogService.open({ viewModel: aurelia_resources_1.CountriesDialog, model: { country: this.displayValue, countries: this.countriesList, prefix: this.prefix }, centerHorizontalOnly: true, overlayDismiss: true }).whenClosed(function (response) {
            if (!response.wasCancelled) {
                _this.setValue(response.output);
            }
            _this.focused = false;
        });
    };
    AdCountrySelector.prototype.variantChanged = function (newValue) {
        this.element.style.backgroundColor = newValue === 'outline' ?
            this.element.style.backgroundColor = core_1.getBackgroundColorThroughParents(this.element) :
            '';
    };
    Object.defineProperty(AdCountrySelector.prototype, "placeholderMode", {
        get: function () {
            return typeof this.label !== 'string' || this.label.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        aurelia_templating_1.bindable
    ], AdCountrySelector.prototype, "disabled", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], AdCountrySelector.prototype, "readonly", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], AdCountrySelector.prototype, "theme", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], AdCountrySelector.prototype, "label", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], AdCountrySelector.prototype, "placeholder", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], AdCountrySelector.prototype, "variant", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], AdCountrySelector.prototype, "dense", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], AdCountrySelector.prototype, "countries", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], AdCountrySelector.prototype, "prefix", void 0);
    __decorate([
        aurelia_templating_1.bindable
    ], AdCountrySelector.prototype, "bindToState", void 0);
    __decorate([
        aurelia_binding_1.observable
    ], AdCountrySelector.prototype, "focused", void 0);
    __decorate([
        aurelia_templating_1.bindable({ defaultBindingMode: aurelia_binding_1.bindingMode.twoWay })
    ], AdCountrySelector.prototype, "value", void 0);
    __decorate([
        aurelia_binding_1.computedFrom('bindToState', 'deco.state.country')
    ], AdCountrySelector.prototype, "displayValue", null);
    __decorate([
        aurelia_binding_1.computedFrom('label')
    ], AdCountrySelector.prototype, "placeholderMode", null);
    AdCountrySelector = __decorate([
        aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine, aurelia_dialog_1.DialogService, deco_api_1.DecoApi),
        aurelia_templating_1.customElement('ad-country-selector')
    ], AdCountrySelector);
    return AdCountrySelector;
}());
exports.AdCountrySelector = AdCountrySelector;
function stopEvent(e) {
    e.stopPropagation();
}
var getVm = function (_) { return _.au.controller.viewModel; };
var uxInputElementProto = Object.create(HTMLElement.prototype, {
    value: {
        get: function () {
            return getVm(this).getValue();
        },
        set: function (value) {
            getVm(this).setValue(value);
        }
    }
});
