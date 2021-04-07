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
define(["require", "exports", "aurelia-event-aggregator", "aurelia-framework", "aurelia-logging"], function (require, exports, aurelia_event_aggregator_1, aurelia_framework_1, aurelia_logging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EnsureModel = void 0;
    var log = aurelia_logging_1.getLogger('ensure-model');
    var EnsureModel = /** @class */ (function () {
        function EnsureModel(eventAggregator) {
            this.eventAggregator = eventAggregator;
            this.idsToFetch = [];
            this.fetching = false;
        }
        EnsureModel.prototype.init = function (model, suffix, getAllOptions, language) {
            this.model = model;
            this.suffix = suffix || '';
            this.getAllOptions = getAllOptions || {};
            this.instances = {};
            if (language) {
                this.language = language;
            }
        };
        EnsureModel.prototype.get = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    if (this.instances[id] !== undefined) {
                        return [2 /*return*/, this.instances[id]];
                    }
                    this.ensureIds([id]);
                    return [2 /*return*/, new Promise(function (resolve) {
                            _this.eventAggregator.subscribeOnce("fetched-" + id, resolve);
                        })];
                });
            });
        };
        EnsureModel.prototype.reload = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.idsToFetch.push(id);
                    this.ensureIds([id]);
                    return [2 /*return*/, new Promise(function (resolve) {
                            _this.eventAggregator.subscribeOnce("fetched-" + id, resolve);
                        })];
                });
            });
        };
        EnsureModel.prototype.reloadAll = function () {
            var _a;
            var ids = Object.keys(this.instances);
            (_a = this.idsToFetch).push.apply(_a, ids);
            this.fetchNextItems();
        };
        EnsureModel.prototype.ensureIds = function (ids, force) {
            if (force === void 0) { force = false; }
            return __awaiter(this, void 0, void 0, function () {
                var idsToAdd, promises, _loop_1, _i, idsToAdd_1, id;
                var _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            idsToAdd = ids.filter(function (i) { return force || _this.instances[i] === undefined; }).filter(function (i) { return _this.idsToFetch.indexOf(i) === -1; });
                            (_a = this.idsToFetch).push.apply(_a, idsToAdd);
                            this.fetchNextItems();
                            promises = [];
                            _loop_1 = function (id) {
                                promises.push(new Promise(function (resolve) {
                                    _this.eventAggregator.subscribeOnce("fetched-" + id, resolve);
                                }));
                            };
                            for (_i = 0, idsToAdd_1 = idsToAdd; _i < idsToAdd_1.length; _i++) {
                                id = idsToAdd_1[_i];
                                _loop_1(id);
                            }
                            return [4 /*yield*/, Promise.all(promises)];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, ids.map(function (id) { return _this.instances[id]; })];
                    }
                });
            });
        };
        EnsureModel.prototype.fetchNextItems = function () {
            return __awaiter(this, void 0, void 0, function () {
                var ids, suffix, options, instances, _i, instances_1, instance, _a, ids_1, id, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.fetching) {
                                return [2 /*return*/]; // at the end of any fetch, if the idsToFetch array is not empty we automatically call fetchNextItems again
                            }
                            this.fetching = true;
                            ids = this.idsToFetch.splice(0, 50);
                            suffix = "?id=" + ids + this.suffix;
                            if (this.language && suffix.indexOf('&locale=') === -1) {
                                suffix += "&locale=" + this.language;
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            options = Object.assign({}, this.getAllOptions);
                            return [4 /*yield*/, this.model.getAll(suffix, options)];
                        case 2:
                            instances = _b.sent();
                            for (_i = 0, instances_1 = instances; _i < instances_1.length; _i++) {
                                instance = instances_1[_i];
                                this.instances[instance.id] = instance;
                                this.eventAggregator.publish("fetched-" + instance.id, instance);
                            }
                            for (_a = 0, ids_1 = ids; _a < ids_1.length; _a++) {
                                id = ids_1[_a];
                                // identify models that have not been found
                                if (this.instances[id] === undefined) {
                                    this.instances[id] = null;
                                    this.eventAggregator.publish("fetched-" + id, null);
                                }
                            }
                            this.fetching = false;
                            if (this.idsToFetch.length !== 0) {
                                this.fetchNextItems();
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _b.sent();
                            this.fetching = false;
                            throw error_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        Object.defineProperty(EnsureModel.prototype, "isFetching", {
            get: function () {
                return this.fetching;
            },
            enumerable: false,
            configurable: true
        });
        EnsureModel = __decorate([
            aurelia_framework_1.transient(),
            aurelia_framework_1.inject(aurelia_framework_1.NewInstance.of(aurelia_event_aggregator_1.EventAggregator))
        ], EnsureModel);
        return EnsureModel;
    }());
    exports.EnsureModel = EnsureModel;
});
