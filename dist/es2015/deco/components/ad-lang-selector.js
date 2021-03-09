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
import { DOM } from 'aurelia-pal';
import { observable, computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, normalizeBooleanAttribute, getBackgroundColorThroughParents } from '@aurelia-ux/core';
import { getLogger } from 'aurelia-logging';
import { DialogService } from 'aurelia-dialog';
import { DecoApi } from '../helpers/deco-api';
import { LanguagesDialog } from 'aurelia-resources';
var log = getLogger('ad-lang-selector');
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component.css';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component--outline.css';
import { TaskQueue } from 'aurelia-framework';
var AdLangSelector = /** @class */ (function () {
    function AdLangSelector(element, styleEngine, dialogService, deco, taskQueue) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.dialogService = dialogService;
        this.deco = deco;
        this.taskQueue = taskQueue;
        this.disabled = false;
        this.readonly = false;
        this.variant = 'filled';
        this.dense = false;
        this.languages = [];
        this.prefix = '';
        this.bindToState = false;
        this.focused = false;
        Object.setPrototypeOf(element, uxInputElementProto);
    }
    AdLangSelector.prototype.bind = function () {
        this.dense = normalizeBooleanAttribute('dense', this.dense);
        this.themeChanged(this.theme);
    };
    Object.defineProperty(AdLangSelector.prototype, "languagesList", {
        get: function () {
            if (this.languages && this.languages.length > 0) {
                return this.languages;
            }
            var languages = this.deco.state.languages;
            if (Array.isArray(languages) && languages.length > 0) {
                return languages;
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    AdLangSelector.prototype.attached = function () {
        this.variantChanged(this.variant);
    };
    AdLangSelector.prototype.detached = function () {
    };
    AdLangSelector.prototype.getValue = function () {
        return this.value;
    };
    Object.defineProperty(AdLangSelector.prototype, "displayValue", {
        get: function () {
            if (this.bindToState && this.deco.state) {
                return this.deco.state.language;
            }
            else {
                return this.value;
            }
        },
        enumerable: false,
        configurable: true
    });
    AdLangSelector.prototype.setValue = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.value !== value)) return [3 /*break*/, 3];
                        this.value = value;
                        if (!this.bindToState) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.deco.store.dispatch('setLanguage', this.value)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.taskQueue.queueMicroTask(function () {
                            _this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true, detail: _this.value }));
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdLangSelector.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'ad-selector';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    AdLangSelector.prototype.focusedChanged = function (focused) {
        this.element.classList.toggle('ux-input-component--focused', focused);
        this.element.dispatchEvent(DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
    };
    AdLangSelector.prototype.focus = function () {
        this.focused = true;
        this.openDialog();
    };
    AdLangSelector.prototype.openDialog = function () {
        var _this = this;
        this.dialogService.open({ viewModel: LanguagesDialog, model: { language: this.displayValue, languages: this.languagesList, prefix: this.prefix }, centerHorizontalOnly: true, overlayDismiss: true }).whenClosed(function (response) {
            if (!response.wasCancelled) {
                _this.setValue(response.output);
            }
            _this.focused = false;
        });
    };
    AdLangSelector.prototype.variantChanged = function (newValue) {
        this.element.style.backgroundColor = newValue === 'outline' ?
            this.element.style.backgroundColor = getBackgroundColorThroughParents(this.element) :
            '';
    };
    Object.defineProperty(AdLangSelector.prototype, "placeholderMode", {
        get: function () {
            return typeof this.label !== 'string' || this.label.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        bindable
    ], AdLangSelector.prototype, "disabled", void 0);
    __decorate([
        bindable
    ], AdLangSelector.prototype, "readonly", void 0);
    __decorate([
        bindable
    ], AdLangSelector.prototype, "theme", void 0);
    __decorate([
        bindable
    ], AdLangSelector.prototype, "label", void 0);
    __decorate([
        bindable
    ], AdLangSelector.prototype, "placeholder", void 0);
    __decorate([
        bindable
    ], AdLangSelector.prototype, "variant", void 0);
    __decorate([
        bindable
    ], AdLangSelector.prototype, "dense", void 0);
    __decorate([
        bindable
    ], AdLangSelector.prototype, "languages", void 0);
    __decorate([
        bindable
    ], AdLangSelector.prototype, "prefix", void 0);
    __decorate([
        bindable
    ], AdLangSelector.prototype, "bindToState", void 0);
    __decorate([
        observable
    ], AdLangSelector.prototype, "focused", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay })
    ], AdLangSelector.prototype, "value", void 0);
    __decorate([
        computedFrom('bindToState', 'deco.state.language')
    ], AdLangSelector.prototype, "displayValue", null);
    __decorate([
        computedFrom('label')
    ], AdLangSelector.prototype, "placeholderMode", null);
    AdLangSelector = __decorate([
        inject(Element, StyleEngine, DialogService, DecoApi, TaskQueue),
        customElement('ad-lang-selector')
    ], AdLangSelector);
    return AdLangSelector;
}());
export { AdLangSelector };
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
