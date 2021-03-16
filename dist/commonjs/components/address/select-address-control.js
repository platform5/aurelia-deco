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
exports.SelectAddressControl = void 0;
var select_address_dialog_1 = require("./select-address-dialog");
var aurelia_framework_1 = require("aurelia-framework");
var modal_1 = require("@aurelia-ux/modal");
var aurelia_logging_1 = require("aurelia-logging");
var aurelia_pal_1 = require("aurelia-pal");
var log = aurelia_logging_1.getLogger('select-address-control');
var SelectAddressControl = /** @class */ (function () {
    function SelectAddressControl(modalService, element) {
        this.modalService = modalService;
        this.element = element;
        this.addresses = [];
        this.dicoContext = '';
    }
    Object.defineProperty(SelectAddressControl.prototype, "hasAddress", {
        get: function () {
            if (!this.value || typeof this.value !== 'object') {
                return false;
            }
            else if (!this.value.street && !this.value.zip && !this.value.city && !this.value.country) {
                return false;
            }
            return true;
        },
        enumerable: false,
        configurable: true
    });
    SelectAddressControl.prototype.unselect = function () {
        this.value = undefined;
        delete this.value;
    };
    SelectAddressControl.prototype.openDialog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var editingAddress, modal, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        editingAddress = Object.assign({}, this.value);
                        return [4 /*yield*/, this.modalService.open({
                                viewModel: select_address_dialog_1.SelectAddressDialog,
                                model: {
                                    address: editingAddress,
                                    addresses: this.addresses
                                }
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.whenClosed()];
                    case 2:
                        result = _a.sent();
                        if (result.wasCancelled) {
                            return [2 /*return*/];
                        }
                        this.value = result.output;
                        this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('change', { bubbles: true }));
                        this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('input', { bubbles: true }));
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay })
    ], SelectAddressControl.prototype, "value", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], SelectAddressControl.prototype, "addresses", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], SelectAddressControl.prototype, "dicoContext", void 0);
    __decorate([
        aurelia_framework_1.computedFrom('value', 'value.street', 'value.zip', 'value.city', 'value.country')
    ], SelectAddressControl.prototype, "hasAddress", null);
    SelectAddressControl = __decorate([
        aurelia_framework_1.inject(modal_1.UxModalService, Element)
    ], SelectAddressControl);
    return SelectAddressControl;
}());
exports.SelectAddressControl = SelectAddressControl;
