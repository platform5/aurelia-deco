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
exports.jsonify = exports.DecoApi = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_fetch_client_1 = require("aurelia-fetch-client");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var state_1 = require("../state");
require("whatwg-fetch");
var aurelia_logging_1 = require("aurelia-logging");
var DecoApi = /** @class */ (function () {
    function DecoApi(http) {
        this.http = http;
        this.configured = false;
        this.initDone = false;
        this.version = '';
        this.sessionId = '';
        this.log = aurelia_logging_1.getLogger('deco-api');
    }
    DecoApi.prototype.init = function (store, options) {
        var _this = this;
        if (this.initDone && !options.force)
            return Promise.resolve();
        this.log.debug('deco init', options);
        this.container = options.container instanceof aurelia_framework_1.Container ? options.container : aurelia_framework_1.Container.instance;
        var config = this.container.get('aurelia-deco-config');
        this.log.debug('deco config', config);
        if (config.version) {
            this.version = config.version;
        }
        this.store = store;
        this.store.state.subscribe(function (state) { return _this.state = state; });
        this.store.registerAction('initDecoState', state_1.initDecoState);
        this.store.registerAction('setLanguage', state_1.setLanguage);
        this.store.registerAction('setLanguages', state_1.setLanguages);
        this.store.registerAction('setRefLanguage', state_1.setRefLanguage);
        this.store.registerAction('setCountryCode', state_1.setCountryCode);
        this.store.registerAction('setCountry', state_1.setCountry);
        this.store.registerAction('setCountries', state_1.setCountries);
        this.store.registerAction('clearDecoState', state_1.clearDecoState);
        this.container.get(aurelia_event_aggregator_1.EventAggregator).subscribe('language:changed', function (language) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof language !== 'string' || language.length !== 2) {
                            this.log.warn('Invalid lanuage: ', language);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.store.dispatch(state_1.setLanguage, language)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        this.container.get(aurelia_event_aggregator_1.EventAggregator).subscribe('country:changed', function (country) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof country !== 'string' || country.length !== 2) {
                            this.log.warn('Invalid lanuage: ', country);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.store.dispatch(state_1.setCountry, country)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return this.store.dispatch(state_1.initDecoState).then(function () {
            return (options && options.languages) ? _this.store.dispatch(state_1.setLanguages, options.languages) : Promise.resolve();
        }).then(function () {
            return (options && options.language) ? _this.store.dispatch(state_1.setLanguage, options.language) : Promise.resolve();
        }).then(function () {
            return (options && options.countries) ? _this.store.dispatch(state_1.setCountries, options.countries) : Promise.resolve();
        }).then(function () {
            return (options && options.country) ? _this.store.dispatch(state_1.setCountry, options.country) : Promise.resolve();
        }).then(function () {
            return (options && options.refLanguage) ? _this.store.dispatch(state_1.setRefLanguage, options.refLanguage) : Promise.resolve();
        }).then(function () {
            _this.initDone = true;
        });
    };
    // clearState() {
    //   if (!this.store) throw new Error('DecoApi: store is not yet defined');
    //   return this.store.dispatch(clearDecoState);
    // }
    DecoApi.prototype.configureHost = function (host) {
        this.http.configure(function (config) {
            config
                //.useStandardConfiguration()
                .withDefaults({
                credentials: 'same-origin'
            })
                .withBaseUrl(host);
        });
        this.configured = true;
    };
    DecoApi.prototype.defaultOptions = function (options) {
        if (options === void 0) { options = {}; }
        var o = {
            method: 'get',
            headers: {
                "sdiosid": this.sessionId
            }
        };
        o = Object.assign({}, o, options);
        if (!o.headers['Content-Type'] && (!options.bodyFormat || options.bodyFormat === 'json')) {
            o.headers['Content-Type'] = 'application/json';
        }
        if (options.etag) {
            o.headers['ETAG'] = options.etag;
        }
        return o;
    };
    DecoApi.prototype.extendEntrpoint = function (entrypoint) {
        if (!entrypoint.includes('download=') && this.version) {
            entrypoint += entrypoint.includes('?') ? '&' : '?';
            entrypoint += "__v=" + this.version;
        }
        return entrypoint;
    };
    DecoApi.prototype.get = function (entrypoint, options) {
        if (options === void 0) { options = {}; }
        if (!this.configured)
            throw new Error('Api must be configured before you can use it');
        return this.http.fetch(this.extendEntrpoint(entrypoint), this.defaultOptions(options));
    };
    DecoApi.prototype.post = function (entrypoint, body, options) {
        if (body === void 0) { body = {}; }
        if (options === void 0) { options = {}; }
        if (!this.configured)
            throw new Error('Api must be configured before you can use it');
        var o = this.defaultOptions(options);
        o.method = 'post';
        o.body = this.normalizeBody(body, options);
        return this.http.fetch(this.extendEntrpoint(entrypoint), o);
    };
    DecoApi.prototype.put = function (entrypoint, body, options) {
        if (body === void 0) { body = {}; }
        if (options === void 0) { options = {}; }
        if (!this.configured)
            throw new Error('Api must be configured before you can use it');
        var o = this.defaultOptions(options);
        o.method = 'put';
        o.body = this.normalizeBody(body, options);
        return this.http.fetch(this.extendEntrpoint(entrypoint), o);
    };
    DecoApi.prototype.delete = function (entrypoint, body, options) {
        if (body === void 0) { body = {}; }
        if (options === void 0) { options = {}; }
        if (!this.configured)
            throw new Error('Api must be configured before you can use it');
        var o = this.defaultOptions(options);
        o.method = 'delete';
        o.body = this.normalizeBody(body, options);
        return this.http.fetch(this.extendEntrpoint(entrypoint), o);
    };
    DecoApi.prototype.normalizeBody = function (body, options) {
        if (!options.bodyFormat || options.bodyFormat === 'json') {
            body = JSON.stringify(body);
        }
        return body;
    };
    DecoApi = __decorate([
        aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient)
    ], DecoApi);
    return DecoApi;
}());
exports.DecoApi = DecoApi;
function jsonify(response) {
    if (!response || !response.json)
        return Promise.resolve(response);
    if (response.status === 204) {
        return Promise.resolve({});
    }
    if (response.status === 404) {
        return Promise.reject(new Error('Page not found'));
    }
    var isError = response.status > 299;
    return response.json().catch(function (error) {
        console.error('Invalid JSON in', response.url);
        console.error(error);
        throw new Error('Invalid JSON response');
    }).then(function (jsonValue) {
        if (isError && jsonValue.error)
            throw new Error(jsonValue.error);
        else if (isError)
            throw new Error('Unknown error');
        return jsonValue;
    });
}
exports.jsonify = jsonify;
