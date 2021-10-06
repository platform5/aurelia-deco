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
exports.DicoDialog = void 0;
var aurelia_resources_1 = require("aurelia-resources");
var modal_1 = require("@aurelia-ux/modal");
var models_1 = require("../../models");
var aurelia_resources_2 = require("aurelia-resources");
var aurelia_framework_1 = require("aurelia-framework");
var DicoDialog = /** @class */ (function () {
    function DicoDialog(container, modalService) {
        this.container = container;
        this.modalService = modalService;
        this.mode = 'create';
        this.languages = ['fr', 'en', 'de', 'it'];
    }
    DicoDialog.prototype.activate = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.global = this.container.get('sd-global');
                        if (!(params.dico && params.dico instanceof models_1.DicoModel)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, models_1.DicoModel.getOneWithId(params.dico.id, '?locale=all')];
                    case 1:
                        _a.dico = _b.sent();
                        this.mode = 'edit';
                        return [3 /*break*/, 3];
                    case 2:
                        this.dico = new models_1.DicoModel();
                        this.mode = 'create';
                        _b.label = 3;
                    case 3:
                        if (!Array.isArray(this.dico.tags)) {
                            this.dico.tags = [];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DicoDialog.prototype.canDeactivate = function (result) {
        return __awaiter(this, void 0, void 0, function () {
            var confirm_1, confirmResult, validationResult, _i, _a, vResult, dico, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (result.wasCancelled) {
                            return [2 /*return*/, true];
                        }
                        if (!(result.output === 'remove')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.modalService.open({
                                viewModel: aurelia_resources_1.ConfirmDialog,
                                model: { title: 'Are you sure ?', text: "Remove this dico element ?" }
                            })];
                    case 1:
                        confirm_1 = _b.sent();
                        return [4 /*yield*/, confirm_1.whenClosed()];
                    case 2:
                        confirmResult = _b.sent();
                        if (!confirmResult.wasCancelled) {
                            this.remove();
                        }
                        return [2 /*return*/];
                    case 3: return [4 /*yield*/, this.dico.validationController.validate()];
                    case 4:
                        validationResult = _b.sent();
                        if (!validationResult.valid) {
                            for (_i = 0, _a = validationResult.results; _i < _a.length; _i++) {
                                vResult = _a[_i];
                                if (!vResult.valid) {
                                    aurelia_resources_2.errorify(new Error(vResult.message), { formatter: undefined });
                                }
                            }
                            return [2 /*return*/, false];
                        }
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.save()];
                    case 6:
                        dico = _b.sent();
                        result.output = dico;
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _b.sent();
                        aurelia_resources_2.errorify(error_1);
                        return [2 /*return*/, false];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    DicoDialog.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dico;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.mode === 'create')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.dico.save()];
                    case 1:
                        dico = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.dico.updateProperties('?locale=', Object.keys(this.dico))];
                    case 3:
                        dico = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, dico];
                }
            });
        });
    };
    DicoDialog.prototype.remove = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.mode === 'edit')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.dico.remove()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DicoDialog = __decorate([
        aurelia_framework_1.inject(aurelia_framework_1.Container, modal_1.UxModalService)
    ], DicoDialog);
    return DicoDialog;
}());
exports.DicoDialog = DicoDialog;
