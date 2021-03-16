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
define(["require", "exports", "@aurelia-ux/modal", "aurelia-framework", "aurelia-logging", "aurelia-resources", "../../models", "../../deco", "aurelia-fetch-client", "./dico-dialog"], function (require, exports, modal_1, aurelia_framework_1, aurelia_logging_1, aurelia_resources_1, models_1, deco_1, aurelia_fetch_client_1, dico_dialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Dico = void 0;
    var log = aurelia_logging_1.getLogger('dico');
    var googleApiKey = 'AIzaSyAfTjyWuowZAAQWZ0t6dB8yyvJpq3HMAf4';
    var Dico = /** @class */ (function () {
        function Dico(container, modalService, http) {
            var _this = this;
            this.container = container;
            this.modalService = modalService;
            this.http = http;
            this.model = models_1.DicoModel;
            this.items = [];
            this.sortingOptions = ['key', '-_updatedAt'];
            this.limit = 50;
            this.skip = 0;
            this.search = '';
            this.sort = '-_updatedAt';
            this.nbElements = 0;
            this.contexts = [];
            this.selectedContexts = [];
            this.canEdit = false;
            this.fetchingItems = false;
            this.http.configure(function (config) {
                config.useStandardConfiguration();
                config.withBaseUrl('https://translation.googleapis.com/language/translate/v2');
            });
            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            }); }, 500);
        }
        Dico.prototype.activate = function () {
            var _a;
            this.global = this.container.get('sd-global');
            var roles = ((_a = this.global.state.swissdata.user) === null || _a === void 0 ? void 0 : _a.roles) || [];
            this.canEdit = false;
            if (roles.includes('admin')) {
                this.canEdit = true;
            }
            try {
                var dicoViewSettings = JSON.parse(localStorage.getItem(this.global.state.swissdata.publicKey + "-dico-view-settings"));
                this.search = dicoViewSettings.search || '';
                this.sort = dicoViewSettings.sort || '-_updatedAt';
                this.selectedContexts = dicoViewSettings.selectedContexts || [];
            }
            catch (error) { }
        };
        Dico.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var firstItems, dicoViewSettings;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.skip = 0;
                            this.fetchNbDico();
                            this.fetchContexts();
                            return [4 /*yield*/, this.fetchItems()];
                        case 1:
                            firstItems = _a.sent();
                            this.items = firstItems;
                            dicoViewSettings = {
                                search: this.search,
                                sort: this.sort,
                                selectedContexts: this.selectedContexts
                            };
                            localStorage.setItem(this.global.state.swissdata.publicKey + "-dico-view-settings", JSON.stringify(dicoViewSettings));
                            return [2 /*return*/];
                    }
                });
            });
        };
        Dico.prototype.fetchNbDico = function () {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var items, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, models_1.DicoModel.getAll("?limit=1&skip=0", { includeResponse: true })];
                        case 1:
                            items = _b.sent();
                            total = items.length === 0 ? 0 : (_a = items === null || items === void 0 ? void 0 : items._response[0]) === null || _a === void 0 ? void 0 : _a.__count;
                            if (total !== undefined) {
                                this.nbElements = total;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        Dico.prototype.fetchContexts = function () {
            return __awaiter(this, void 0, void 0, function () {
                var contexts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.global && this.container) {
                                this.global = this.container.get('sd-global');
                            }
                            if (!this.global) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.global.swissdataApi.get("/dico/contexts").then(deco_1.jsonify)];
                        case 1:
                            contexts = _a.sent();
                            this.contexts = contexts;
                            return [2 /*return*/];
                    }
                });
            });
        };
        Dico.prototype.fetchItems = function () {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var language, refLanguage, contextFilter, suffix, items, response, total, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.global && this.container) {
                                this.global = this.container.get('sd-global');
                            }
                            if (!this.global) {
                                return [2 /*return*/];
                            }
                            this.fetchingItems = true;
                            language = this.global.state.language;
                            refLanguage = this.global.state.refLanguage || '';
                            contextFilter = '';
                            if (Array.isArray(this.selectedContexts) && this.selectedContexts.length > 0) {
                                contextFilter = "&key=" + this.selectedContexts.join(',');
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            suffix = "?locale=" + language + "&reflocale=" + refLanguage + "&sort=" + this.sort + "&limit=" + this.limit + "&skip=" + this.skip + contextFilter;
                            if (this.search) {
                                suffix += "&q=" + this.search;
                            }
                            if (this.suffix) {
                                suffix += this.suffix;
                            }
                            return [4 /*yield*/, this.model.getAll(suffix, { includeResponse: true })];
                        case 2:
                            items = _b.sent();
                            response = items._response;
                            total = (_a = response[0]) === null || _a === void 0 ? void 0 : _a.__count;
                            if (total !== undefined) {
                                this.currentCount = total;
                            }
                            else {
                                this.currentCount = undefined;
                            }
                            this.fetchingItems = false;
                            this.skip += this.limit;
                            this.global.ensureUsers.ensureIds(items.filter(function (i) { return i._updatedBy; }).map(function (i) { return i._updatedBy; }));
                            return [2 /*return*/, items];
                        case 3:
                            error_1 = _b.sent();
                            aurelia_resources_1.errorify(error_1);
                            this.fetchingItems = false;
                            return [2 /*return*/, []];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Dico.prototype.getMoreItems = function (_scrollContext) {
            return __awaiter(this, void 0, void 0, function () {
                var newItems;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (_scrollContext.isAtTop) {
                                return [2 /*return*/];
                            }
                            if (this.skip > this.currentCount) {
                                return [2 /*return*/];
                            }
                            if (!!this.fetchingItems) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.fetchItems()];
                        case 1:
                            newItems = _b.sent();
                            (_a = this.items).push.apply(_a, newItems);
                            _b.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        Dico.prototype.searchChanged = function () {
            var _this = this;
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(function () {
                _this.init();
            }, 500);
        };
        Dico.prototype.sortChanged = function () {
            this.init();
        };
        Dico.prototype.selectedContextsChanged = function () {
            this.init();
        };
        Dico.prototype.openAddDicoDialog = function () {
            return __awaiter(this, void 0, void 0, function () {
                var modal;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.modalService.open({
                                viewModel: dico_dialog_1.DicoDialog,
                                keyboard: ['Escape'],
                                model: {}
                            })];
                        case 1:
                            modal = _a.sent();
                            modal.whenClosed().then(function (result) {
                                if (!result.wasCancelled) {
                                    // TODO: get the updated dico back in the view
                                    _this.init();
                                }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        Dico.prototype.openEditDicoDialog = function (dico) {
            return __awaiter(this, void 0, void 0, function () {
                var _refLocales, editedDico, modal;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _refLocales = dico._refLocales;
                            editedDico = new models_1.DicoModel();
                            return [4 /*yield*/, editedDico.updateInstanceFromElement(dico)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.modalService.open({
                                    viewModel: dico_dialog_1.DicoDialog,
                                    keyboard: ['Escape'],
                                    model: { dico: editedDico }
                                })];
                        case 2:
                            modal = _a.sent();
                            modal.whenClosed().then(function (result) {
                                if (!result.wasCancelled && result.output instanceof models_1.DicoModel) {
                                    var _loop_1 = function (dico_1) {
                                        if (dico_1.id === result.output.id) {
                                            dico_1.updateInstanceFromElement(result.output).then(function () {
                                                dico_1._refLocales = _refLocales;
                                            });
                                        }
                                    };
                                    for (var _i = 0, _a = _this.items; _i < _a.length; _i++) {
                                        var dico_1 = _a[_i];
                                        _loop_1(dico_1);
                                    }
                                }
                                else if (!result.wasCancelled && result.output === 'remove') {
                                    var ids = _this.items.map(function (i) { return i.id; });
                                    var index = ids.indexOf(editedDico.id);
                                    if (index !== -1) {
                                        _this.items.splice(index, 1);
                                    }
                                }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        Dico.prototype.addUserWhereMissing = function () {
            return __awaiter(this, void 0, void 0, function () {
                var items, _i, items_1, item;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, models_1.DicoModel.getAll("?_createdBy=", { includeResponse: true })];
                        case 1:
                            items = _a.sent();
                            _i = 0, items_1 = items;
                            _a.label = 2;
                        case 2:
                            if (!(_i < items_1.length)) return [3 /*break*/, 6];
                            item = items_1[_i];
                            item.tags = item.tags || [];
                            if (item.tags.includes('dico-tool')) {
                                return [3 /*break*/, 5];
                            }
                            return [4 /*yield*/, item.updateProperties('', ['tags'])];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 2];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        Dico.prototype.addCertifiedTag = function () {
            return __awaiter(this, void 0, void 0, function () {
                var items, _i, items_2, item;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, models_1.DicoModel.getAll("", { includeResponse: true })];
                        case 1:
                            items = _a.sent();
                            _i = 0, items_2 = items;
                            _a.label = 2;
                        case 2:
                            if (!(_i < items_2.length)) return [3 /*break*/, 6];
                            item = items_2[_i];
                            item.tags = item.tags || [];
                            if (item.tags.includes('certified')) {
                                return [3 /*break*/, 5];
                            }
                            item.tags.push('certified');
                            return [4 /*yield*/, item.updateProperties('', ['tags'])];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 2];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        Dico.prototype.getKeysWithoutHumanTranslation = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, models_1.DicoModel.getAll("?_createdBy=&locale=all", { includeResponse: true })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        Dico.prototype.autoTranslate = function () {
            return __awaiter(this, void 0, void 0, function () {
                var keysNeededTranslation, _i, keysNeededTranslation_1, dicoElement, value, frTranslation, itTranslation, deTranslation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getKeysWithoutHumanTranslation()];
                        case 1:
                            keysNeededTranslation = _a.sent();
                            _i = 0, keysNeededTranslation_1 = keysNeededTranslation;
                            _a.label = 2;
                        case 2:
                            if (!(_i < keysNeededTranslation_1.length)) return [3 /*break*/, 9];
                            dicoElement = keysNeededTranslation_1[_i];
                            value = dicoElement.value;
                            return [4 /*yield*/, this.requestGoogleTranslation(value.en, 'fr')];
                        case 3:
                            frTranslation = _a.sent();
                            return [4 /*yield*/, this.requestGoogleTranslation(value.en, 'it')];
                        case 4:
                            itTranslation = _a.sent();
                            return [4 /*yield*/, this.requestGoogleTranslation(value.en, 'de')];
                        case 5:
                            deTranslation = _a.sent();
                            value.fr = frTranslation;
                            value.it = itTranslation;
                            value.de = deTranslation;
                            dicoElement.tags = (dicoElement.tags || []);
                            dicoElement.tags.push('auto-translate');
                            return [4 /*yield*/, dicoElement.updateProperties('?locale=', ['value', 'tags'])];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 50); })];
                        case 7:
                            _a.sent();
                            _a.label = 8;
                        case 8:
                            _i++;
                            return [3 /*break*/, 2];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        Dico.prototype.requestGoogleTranslation = function (text, target, original) {
            if (original === void 0) { original = 'en'; }
            return __awaiter(this, void 0, void 0, function () {
                var response, json, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.http.post("?key=" + googleApiKey, JSON.stringify({ q: text, source: original, target: target, format: 'text' }))];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            json = _a.sent();
                            return [2 /*return*/, json.data.translations[0].translatedText];
                        case 3:
                            error_2 = _a.sent();
                            throw error_2;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        __decorate([
            aurelia_framework_1.observable
        ], Dico.prototype, "search", void 0);
        __decorate([
            aurelia_framework_1.observable
        ], Dico.prototype, "sort", void 0);
        Dico = __decorate([
            aurelia_framework_1.inject(aurelia_framework_1.Container, modal_1.UxModalService, aurelia_framework_1.NewInstance.of(aurelia_fetch_client_1.HttpClient))
        ], Dico);
        return Dico;
    }());
    exports.Dico = Dico;
});
