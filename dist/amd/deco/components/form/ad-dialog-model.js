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
define(["require", "exports", "aurelia-framework", "aurelia-resources"], function (require, exports, aurelia_framework_1, aurelia_resources_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.adDialogModel = exports.AdDialogModel = void 0;
    var AdDialogModel = /** @class */ (function () {
        function AdDialogModel() {
            this.properties = [];
            this.data = {};
            this.displayRefLocale = false;
            this.refLocale = '';
        }
        AdDialogModel.prototype.activate = function (params) {
            this.params = params;
            this.processParams();
        };
        AdDialogModel.prototype.processParams = function () {
            this.instance = this.params.instance;
            this.properties = this.params.properties;
            this.data = this.params.data;
            if (typeof this.params.displayRefLocale === 'boolean')
                this.displayRefLocale = this.params.displayRefLocale;
            else
                this.params.displayRefLocale = false;
            if (typeof this.params.refLocale === 'string')
                this.refLocale = this.params.refLocale;
            else
                this.params.refLocale = '';
        };
        AdDialogModel.prototype.getViewStrategy = function () {
            if (this.params.viewPath)
                return this.params.viewPath;
            return './ad-dialog-model.html';
        };
        AdDialogModel = __decorate([
            aurelia_framework_1.inject(Element)
        ], AdDialogModel);
        return AdDialogModel;
    }());
    exports.AdDialogModel = AdDialogModel;
    var adDialogModel = function (instance, options, properties) {
        if (properties === void 0) { properties = []; }
        var dialogOptions = {
            title: options.title,
            type: options.type ? options.type : 'edition',
            bindingContext: options.bindingContext,
            content: options.content,
            contentViewModelPath: options.contentViewModelPath,
            editionViewModelPath: options.editionViewModelPath ? options.editionViewModelPath : 'aurelia-deco/deco/components/form/ad-dialog-model',
        };
        dialogOptions.editionModel = {
            instance: instance,
            properties: properties
        };
        if (options.editionViewPath) {
            dialogOptions.editionModel.viewPath = options.editionViewPath;
        }
        if (options.editionCallback) {
            dialogOptions.editionCallback = options.editionCallback;
        }
        else {
            dialogOptions.editionCallback = function () { return __awaiter(void 0, void 0, void 0, function () {
                var validationResult, firstInvalid, prop;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, instance.validationController.validate()];
                        case 1:
                            validationResult = _a.sent();
                            if (!validationResult.valid) {
                                firstInvalid = validationResult.results.find(function (r) { return r.valid === false; });
                                throw new Error(firstInvalid.message || 'Invalid form');
                            }
                            if (instance.id) {
                                prop = Array.isArray(properties) ? properties : Object.keys(instance);
                                return [2 /*return*/, instance.updateProperties(options.editionCallbackSuffix, prop)];
                            }
                            else {
                                return [2 /*return*/, instance.save(options.editionCallbackSuffix)];
                            }
                            return [2 /*return*/];
                    }
                });
            }); };
        }
        if (options.data)
            dialogOptions.editionModel.data = options.data;
        var dialog = aurelia_resources_1.arDialog(dialogOptions);
        return dialog;
    };
    exports.adDialogModel = adDialogModel;
});
