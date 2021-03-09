System.register(["aurelia-framework", "../decorators", "aurelia-pal", "aurelia-resources", "@aurelia-ux/modal", "../helpers/deco-api"], function (exports_1, context_1) {
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
    var aurelia_framework_1, decorators_1, aurelia_pal_1, aurelia_resources_1, modal_1, deco_api_1, ModelEditorDialog;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            },
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            },
            function (aurelia_resources_1_1) {
                aurelia_resources_1 = aurelia_resources_1_1;
            },
            function (modal_1_1) {
                modal_1 = modal_1_1;
            },
            function (deco_api_1_1) {
                deco_api_1 = deco_api_1_1;
            }
        ],
        execute: function () {
            ModelEditorDialog = /** @class */ (function () {
                function ModelEditorDialog(deco, modalService) {
                    this.deco = deco;
                    this.modalService = modalService;
                    this.canRemove = false;
                    this.mode = 'create';
                    this.properties = []; // empty means all
                    this.defaultViewPath = aurelia_pal_1.PLATFORM.moduleName('./model-editor-default-form.html');
                }
                ModelEditorDialog.prototype.canActivate = function (params) {
                    var rightInstance = params.instance && params.instance instanceof decorators_1.Model;
                    if (!rightInstance) {
                        aurelia_resources_1.errorify(new Error('Missing or invalid instance'));
                        return false;
                    }
                    return true;
                };
                ModelEditorDialog.prototype.activate = function (params) {
                    this.instance = params.instance;
                    if (params.mode === 'create' || params.mode === 'edit') {
                        this.mode = params.mode;
                    }
                    else if (this.instance.id) {
                        this.mode = 'edit';
                    }
                    else {
                        this.mode = 'create';
                    }
                    if (Array.isArray(params.properties)) {
                        this.properties = params.properties;
                    }
                    else {
                        this.properties = [];
                    }
                    if (params.suffix) {
                        this.suffix = params.suffix;
                    }
                    else {
                        this.suffix = '';
                    }
                    if (params.viewPath) {
                        this.viewPath = params.viewPath;
                    }
                    else {
                        this.viewPath = this.defaultViewPath;
                    }
                    if (params.canRemove !== undefined) {
                        this.canRemove = params.canRemove;
                    }
                };
                ModelEditorDialog.prototype.canDeactivate = function (result) {
                    return __awaiter(this, void 0, void 0, function () {
                        var confirmModal, confirmResult, validation, newInstance, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (result.wasCancelled) {
                                        return [2 /*return*/, true];
                                    }
                                    if (!(result.output === 'remove')) return [3 /*break*/, 5];
                                    return [4 /*yield*/, this.modalService.open({
                                            viewModel: aurelia_resources_1.ConfirmDialog,
                                            model: {
                                                title: 'Are you sure ?',
                                                text: 'You want to remove this item ?'
                                            },
                                            position: 'center'
                                        })];
                                case 1:
                                    confirmModal = _a.sent();
                                    return [4 /*yield*/, confirmModal.whenClosed()];
                                case 2:
                                    confirmResult = _a.sent();
                                    if (!!confirmResult.wasCancelled) return [3 /*break*/, 4];
                                    return [4 /*yield*/, this.instance.remove()];
                                case 3:
                                    _a.sent();
                                    result.output = 'remove';
                                    return [2 /*return*/, true];
                                case 4: return [2 /*return*/, false];
                                case 5: return [4 /*yield*/, this.instance.validationController.validate()];
                                case 6:
                                    validation = _a.sent();
                                    if (!validation.valid) {
                                        return [2 /*return*/, false];
                                    }
                                    _a.label = 7;
                                case 7:
                                    _a.trys.push([7, 12, , 13]);
                                    newInstance = void 0;
                                    if (!(this.mode === 'edit')) return [3 /*break*/, 9];
                                    return [4 /*yield*/, this.instance.updateProperties(this.suffix, this.editableProperties)];
                                case 8:
                                    newInstance = _a.sent();
                                    return [3 /*break*/, 11];
                                case 9: return [4 /*yield*/, this.instance.save(this.suffix)];
                                case 10:
                                    newInstance = _a.sent();
                                    _a.label = 11;
                                case 11:
                                    result.output = newInstance;
                                    return [2 /*return*/, true];
                                case 12:
                                    error_1 = _a.sent();
                                    aurelia_resources_1.errorify(error_1);
                                    return [2 /*return*/, false];
                                case 13: return [2 /*return*/];
                            }
                        });
                    });
                };
                Object.defineProperty(ModelEditorDialog.prototype, "instanceProperties", {
                    get: function () {
                        if (!this.instance) {
                            return [];
                        }
                        if (!this.instance.deco) {
                            return [];
                        }
                        return Object.keys(this.instance.deco.propertyTypes);
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(ModelEditorDialog.prototype, "editableProperties", {
                    get: function () {
                        var _this = this;
                        if (this.properties.length === 0) {
                            return this.instanceProperties;
                        }
                        return this.instanceProperties.filter(function (prop) { return _this.properties.includes(prop); });
                    },
                    enumerable: false,
                    configurable: true
                });
                __decorate([
                    aurelia_framework_1.computedFrom('instance')
                ], ModelEditorDialog.prototype, "instanceProperties", null);
                __decorate([
                    aurelia_framework_1.computedFrom('instanceProperties')
                ], ModelEditorDialog.prototype, "editableProperties", null);
                ModelEditorDialog = __decorate([
                    aurelia_framework_1.inject(deco_api_1.DecoApi, modal_1.UxModalService)
                ], ModelEditorDialog);
                return ModelEditorDialog;
            }());
            exports_1("ModelEditorDialog", ModelEditorDialog);
        }
    };
});
