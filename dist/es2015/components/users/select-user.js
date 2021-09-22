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
import { UserModel } from './../../models/user.model';
import { UxModalService } from '@aurelia-ux/modal';
import { inject, observable } from 'aurelia-framework';
import { errorify } from 'aurelia-resources';
import { getLogger } from 'aurelia-logging';
import { SwissdataApi } from '../../helpers/swissdata-api';
var log = getLogger('select-user');
var SelectUser = /** @class */ (function () {
    function SelectUser(swissdataApi, modalService) {
        this.swissdataApi = swissdataApi;
        this.modalService = modalService;
        this.items = [];
        this.sortingOptions = ['firstname', 'name', '_updatedAt'];
        this.limit = 50;
        this.skip = 0;
        this.search = '';
        this.sort = 'firstname';
        this.disableIds = [];
        this.fetchingItems = false;
        this.model = UserModel;
        this.suffix = '&autoFetch=profile';
    }
    SelectUser.prototype.activate = function (params) {
        log.debug('activate', params);
        if (params.userId) {
            log.debug('set userId', params);
            this.userId = params.userId;
        }
        if (params.disableIds) {
            this.disableIds = params.disableIds;
        }
        if (params.availabledIds) {
            this.suffix += "&id=" + params.availabledIds.join(',');
        }
        this.init();
    };
    SelectUser.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var firstItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.skip = 0;
                        return [4 /*yield*/, this.fetchItems()];
                    case 1:
                        firstItems = _a.sent();
                        this.items = firstItems;
                        return [2 /*return*/];
                }
            });
        });
    };
    SelectUser.prototype.fetchItems = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var language, refLanguage, suffix, items, response, total, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.fetchingItems = true;
                        return [4 /*yield*/, this.swissdataApi.isReady()];
                    case 1:
                        _b.sent();
                        language = this.swissdataApi.state.language;
                        refLanguage = this.swissdataApi.state.refLanguage;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        suffix = "?locale=" + language + "&reflocale=" + refLanguage + "&sort=" + this.sort + "&limit=" + this.limit + "&skip=" + this.skip;
                        if (this.search) {
                            suffix += "&q=" + this.search;
                        }
                        if (this.suffix) {
                            suffix += this.suffix;
                        }
                        return [4 /*yield*/, this.model.getAll(suffix, {
                                includeResponse: true,
                                route: "/search-user"
                            })];
                    case 3:
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
                        return [2 /*return*/, items];
                    case 4:
                        error_1 = _b.sent();
                        errorify(error_1);
                        this.fetchingItems = false;
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SelectUser.prototype.getMoreItems = function (_scrollContext) {
        return __awaiter(this, void 0, void 0, function () {
            var newItems;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
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
    SelectUser.prototype.searchChanged = function () {
        var _this = this;
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(function () {
            _this.init();
        }, 500);
    };
    SelectUser.prototype.sortChanged = function () {
        this.init();
    };
    SelectUser.prototype.selectUser = function (user) {
        if (this.disableIds.indexOf(user.id) !== -1) {
            return;
        }
        this.userId = user.id;
        this.modalService.ok(this.userId);
    };
    SelectUser.prototype.canDeactivate = function (result) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (result.wasCancelled) {
                    return [2 /*return*/, true];
                }
                if (!result.output && !this.userId) {
                    errorify(new Error('Select a user'));
                    return [2 /*return*/, false];
                }
                result.output = this.userId;
                return [2 /*return*/, true];
            });
        });
    };
    __decorate([
        observable
    ], SelectUser.prototype, "search", void 0);
    __decorate([
        observable
    ], SelectUser.prototype, "sort", void 0);
    __decorate([
        observable
    ], SelectUser.prototype, "userId", void 0);
    SelectUser = __decorate([
        inject(SwissdataApi, UxModalService)
    ], SelectUser);
    return SelectUser;
}());
export { SelectUser };
