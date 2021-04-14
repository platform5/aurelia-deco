"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwissdataGlobal = void 0;
var profile_model_1 = require("./../models/profile.model");
var user_model_1 = require("./../models/user.model");
var sd_login_1 = require("./sd-login");
var dynamicconfig_model_1 = require("./../models/dynamicconfig.model");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var aurelia_router_1 = require("aurelia-router");
var aurelia_i18n_1 = require("aurelia-i18n");
var swissdata_api_1 = require("./swissdata-api");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
//import { errorHandler } from '../components/notification/swissdata-notification';
var aurelia_logging_1 = require("aurelia-logging");
var dynamicdata_model_1 = require("../models/dynamicdata.model");
var deco_1 = require("../deco");
var aurelia_store_1 = require("aurelia-store");
var actions_1 = require("../state/actions");
var operators_1 = require("rxjs/operators");
var aurelia_resources_1 = require("aurelia-resources");
var moment = require("moment");
var SwissdataGlobal = /** @class */ (function () {
    function SwissdataGlobal() {
        this.ready = false;
        this.log = aurelia_logging_1.getLogger('app');
    }
    // Before calling bootstrap, the 
    // inherited global must register an action called
    // initAppState
    // store.registerAction('initAppState', initAppState);
    // idem for 'setFullState' and 'clearState'
    SwissdataGlobal.prototype.bootstrap = function (config) {
        var _this = this;
        this.log.info('Boostrap');
        this.container = config.container instanceof aurelia_dependency_injection_1.Container ? config.container : aurelia_dependency_injection_1.Container.instance;
        this.container.registerInstance('sd-global', this);
        this.eventAggregator = this.container.get(aurelia_event_aggregator_1.EventAggregator);
        this.router = this.container.get(aurelia_router_1.Router);
        this.i18n = this.container.get(aurelia_i18n_1.I18N);
        this.swissdataApi = this.container.get(swissdata_api_1.SwissdataApi);
        this.sdLogin = this.container.get(sd_login_1.SdLogin);
        this.sentry = this.container.get(aurelia_resources_1.SentryHelper);
        this.subscribe('swissdata-login', function () {
            var _a;
            _this.debug('Received login event');
            _this.sentry.setUser({ id: (_a = _this.state.swissdata.user) === null || _a === void 0 ? void 0 : _a.id });
            _this.onLogin();
        });
        this.subscribe('swissdata-logout', function () {
            _this.debug('Received logout event');
            _this.sentry.unsetUser();
            _this.onLogout();
        });
        this.ensureUsers = this.container.get(deco_1.EnsureModel);
        this.ensureUsers.init(user_model_1.UserModel, '&autoFetch=profile', { route: '/search-user' });
        this.ensureProfiles = this.container.get(deco_1.EnsureModel);
        this.ensureProfiles.init(profile_model_1.ProfileModel);
        if (config.enableStateLog === undefined)
            config.enableStateLog = false;
        if (config.enableStateStorage === undefined)
            config.enableStateStorage = true;
        if (!config.stateStorageKey)
            config.stateStorageKey = 'app-state';
        if (!config.enableStateVersionning)
            config.enableStateVersionning = true;
        if (config.enableStateVersionning && (!config.stateVersion || !config.initialState)) {
            throw new Error('You must provide `stateVersion` and `initialState` in order to use the state versionning');
        }
        if (config.enableRestoringRouteFromState === undefined)
            config.enableRestoringRouteFromState = false;
        if (config.restoreRouteFromStateOnlyFor === undefined)
            config.restoreRouteFromStateOnlyFor = [];
        if (config.useDynamicModels === undefined)
            config.useDynamicModels = true;
        if (config.enableIpStackAutoDetect === undefined)
            config.enableIpStackAutoDetect = false;
        if (config.dynamicModelSlugsForAutoLoading === undefined)
            config.dynamicModelSlugsForAutoLoading = [];
        this.config = config;
        var store = this.container.get(deco_1.Store);
        if (!store.isActionRegistered('setFullState'))
            throw new Error('An action called `setFullState` must be registered in the store');
        if (!store.isActionRegistered('initAppState'))
            throw new Error('An action called `initAppState` must be registered in the store');
        // if (!store.isActionRegistered('clearState')) throw new Error('An action called `clearState` must be registered in the store');
        return this.start().then(function () {
            if (config.enableRestoringRouteFromState)
                _this.listenToRouteAndSaveInState();
            if (config.enableStateLog)
                store.registerMiddleware(aurelia_store_1.logMiddleware, aurelia_store_1.MiddlewarePlacement.After, { logType: aurelia_store_1.LogLevel.debug });
            if (config.enableStateStorage) {
                store.registerMiddleware(aurelia_store_1.localStorageMiddleware, aurelia_store_1.MiddlewarePlacement.After, { key: config.stateStorageKey });
                store.registerAction('Rehydrate', aurelia_store_1.rehydrateFromLocalStorage);
                _this.container.registerAlias(deco_1.Store, 'aurelia-store');
                return store.dispatch(aurelia_store_1.rehydrateFromLocalStorage, config.stateStorageKey);
            }
            else {
                return Promise.resolve();
            }
        }).then(function () {
            _this.stateSubscription = store.state.subscribe(function (state) {
                _this.state = state;
            });
            var pluckOperator = operators_1.pluck("language");
            _this.stateLanguageSubscription = store.state.pipe(pluckOperator).subscribe(function (state) {
                if (typeof state === 'string' && state.length === 2 && state !== _this.i18n.getLocale()) {
                    _this.i18n.setLocale(state);
                }
            });
            if (!_this.config.enableStateVersionning)
                return Promise.resolve();
            _this.info('State Version', _this.state.stateVersion);
            var sdConfig = _this.container.get('aurelia-deco-config');
            var resetState = false;
            if (_this.state.stateVersion !== config.stateVersion) {
                _this.warn('Reset state because version is different');
                resetState = true;
            }
            else if (_this.state.swissdata.h !== btoa(sdConfig.api.host)) {
                _this.warn('Reset state because host is different');
                resetState = true;
            }
            if (resetState) {
                return store.dispatch('setFullState', config.initialState);
            }
            else {
                return Promise.resolve();
            }
        }).then(function () {
            return store.dispatch('initAppState');
        }).then(function () {
            if (config.enableIpStackAutoDetect && !_this.state.countryCode) {
                _this.log.info('Auto detect country');
                // async operation
                deco_1.IpStack.autoDetect().then(function (result) {
                    store.dispatch('setCountryCode', result.country_code);
                    _this.ipStackResponse = result;
                });
            }
            _this.info('Init Swissdata');
            var initOptions = {};
            if (config.language) {
                initOptions.language = _this.state.language || config.language;
            }
            if (config.languages) {
                initOptions.languages = config.languages;
            }
            if (config.country) {
                initOptions.country = config.country;
            }
            if (config.countries) {
                initOptions.countries = config.countries;
            }
            return _this.swissdataApi.init(store, initOptions);
        }).then(function () {
            return _this.sdLogin.init(_this.container.get(deco_1.Store), _this.swissdataApi);
        }).then(function () {
            _this.info('Wait for Swissdata to be ready');
            return _this.swissdataApi.isReady();
        }).then(function () {
            return _this.beforeEnsuringAuthentication();
        }).then(function () {
            _this.info('Ensure authentication');
            return _this.swissdataApi.ensureAuthentication();
        }).then(function () {
            return _this.afterEnsuringAuthentication();
        }).then(function () {
            _this.registerActions();
            if (_this.state.swissdata.authenticated) {
                return _this.onAuthenticatedLoad();
            }
            else {
                return _this.onUnauthenticatedLoad();
            }
        }).then(function () {
            return Promise.resolve();
        }).then(function () {
            _this.info('End of bootstrap');
            // this.ready = true; // we leave the responsibility of setting the ready flag to the real application using swissdata global
            // regarding the restoreRouteFromState
            // we tend to have views that only display the router once the user is logged in
            // when this is the case, we must still check if the following work ??
            // it could be that this can only be ran once the router is part of the DOM???
            // if (this.state.swissdata.authenticated && config.enableRestoringRouteFromState) {
            //   return this.restoreRouteFromState(this.state);
            // } else {
            //   return Promise.resolve();
            // }
            if (_this.state.swissdata.authenticated && config.enableRestoringRouteFromState) {
                _this.restoreRouteFromState(_this.state, _this.config.restoreRouteFromStateOnlyFor);
            }
            return Promise.resolve();
        });
    };
    SwissdataGlobal.prototype.start = function () {
        // overwrite this method in global.ts to do some work in starting the app
        return Promise.resolve();
    };
    SwissdataGlobal.prototype.beforeEnsuringAuthentication = function () {
        // overwrite this method in global.ts to do some work before to ensure authentication
        return Promise.resolve();
    };
    SwissdataGlobal.prototype.afterEnsuringAuthentication = function () {
        // overwrite this method in global.ts to do some work before to ensure authentication
        return Promise.resolve();
    };
    SwissdataGlobal.prototype.onAnyLoad = function () {
        var _this = this;
        // overwrite or enhance this method in global.ts to do some work while loading authenticated or unauthenticated users
        if (this.config.useDynamicModels) {
            return dynamicconfig_model_1.DynamicConfigModel.getAll().then(function (elements) {
                for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                    var instance = elements_1[_i];
                    dynamicdata_model_1.DynamicDataModel.registerModel(instance);
                }
                if (_this.config.dynamicModelSlugsForAutoLoading && _this.config.dynamicModelSlugsForAutoLoading.length) {
                    return _this.updateAllModelsFromApi(true);
                }
                else {
                    return Promise.resolve();
                }
            });
        }
        return Promise.resolve();
    };
    SwissdataGlobal.prototype.onAuthenticatedLoad = function () {
        // overwrite or enhance this method in global.ts to do some work while loading authenticated user
        // don't forget to call onAnyLoad inside your overwrite
        this.info('Authenticated Load');
        return this.onAnyLoad();
    };
    SwissdataGlobal.prototype.onUnauthenticatedLoad = function () {
        // overwrite or enhance this method in global.ts to do some work while loading unauthenticated user
        // don't forget to call onAnyLoad inside your overwrite
        this.info('Unauthenticated Load');
        return this.onAnyLoad();
    };
    SwissdataGlobal.prototype.onLogin = function () {
        // overwrite or enhance this method in global.ts to do some work on login
        return this.onAuthenticatedLoad();
    };
    SwissdataGlobal.prototype.onLogout = function () {
        // overwrite or enhance this method in global.ts to do some work on logout
        return Promise.resolve();
    };
    SwissdataGlobal.prototype.isReady = function () {
        var _this = this;
        if (this.ready)
            return Promise.resolve();
        return new Promise(function (resolve, reject) {
            var interval = setInterval(function () {
                if (_this.ready) {
                    clearInterval(interval);
                    if (timeout)
                        clearTimeout(timeout);
                    resolve();
                }
            }, 50);
            var timeout = setTimeout(function () {
                clearInterval(interval);
                reject(new Error('Application not ready after 5 seconds [timeout]'));
            }, 5000);
        });
    };
    SwissdataGlobal.prototype.registerActions = function () {
        var store = this.container.get(deco_1.Store);
        store.registerAction('setAppModels', actions_1.setAppModels);
    };
    SwissdataGlobal.prototype.publish = function (event, data) {
        return this.eventAggregator.publish(event, data);
    };
    SwissdataGlobal.prototype.subscribe = function (event, callback) {
        return this.eventAggregator.subscribe(event, callback);
    };
    SwissdataGlobal.prototype.subscribeOnce = function (event, callback) {
        return this.eventAggregator.subscribeOnce(event, callback);
    };
    SwissdataGlobal.prototype.navigateToRoute = function (route, params, options) {
        return this.router.navigateToRoute(route, params, options);
    };
    SwissdataGlobal.prototype.navigate = function (fragment, options) {
        return this.router.navigate(fragment, options);
    };
    SwissdataGlobal.prototype.getLocale = function () {
        return this.i18n.getLocale();
    };
    SwissdataGlobal.prototype.popError = function (event) {
        if (event && typeof event === 'object' && event.detail && event.detail.error) {
            //errorHandler('main', {lifetime: 15000, hideOnClick: true})(event.detail.error);
            aurelia_resources_1.errorify(event.detail.error, { timeout: 15000 });
        }
    };
    SwissdataGlobal.prototype.info = function (message) {
        var _a;
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        (_a = this.log).info.apply(_a, __spreadArray([message], rest));
    };
    SwissdataGlobal.prototype.debug = function (message) {
        var _a;
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        (_a = this.log).debug.apply(_a, __spreadArray([message], rest));
    };
    SwissdataGlobal.prototype.error = function (message) {
        var _a;
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        (_a = this.log).error.apply(_a, __spreadArray([message], rest));
    };
    SwissdataGlobal.prototype.warn = function (message) {
        var _a;
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        (_a = this.log).warn.apply(_a, __spreadArray([message], rest));
    };
    SwissdataGlobal.prototype.listenToRouteAndSaveInState = function () {
        var store = this.container.get(deco_1.Store);
        store.registerAction('setCurrentRoute', actions_1.setCurrentRoute);
        this.subscribe('router:navigation:success', function (event) {
            store.dispatch(actions_1.setCurrentRoute, event.instruction);
        });
    };
    SwissdataGlobal.prototype.restoreRouteFromState = function (state, onlyOnSpecificRouteNames) {
        var _this = this;
        if (onlyOnSpecificRouteNames === void 0) { onlyOnSpecificRouteNames = []; }
        this.info('Restore Route From State');
        return this.router.ensureConfigured().then(function () {
            return new Promise(function (resolve) {
                var stateCurrentRoute = Object.assign({}, state.currentRoute);
                if (!stateCurrentRoute || !stateCurrentRoute.name)
                    return resolve(null);
                _this.getCurrentRouteASAP().then(function (currentRouteName) {
                    if (currentRouteName && onlyOnSpecificRouteNames.length && onlyOnSpecificRouteNames.indexOf(currentRouteName) === -1) {
                        resolve(null);
                    }
                    else if (stateCurrentRoute.name) {
                        var params = stateCurrentRoute.params || {};
                        _this.router.navigateToRoute(stateCurrentRoute.name, params);
                        resolve(null);
                    }
                });
            });
        }).catch(function (error) {
            _this.log.warn('error in restoreRouteFromState');
            _this.log.error(error);
            return;
        });
    };
    SwissdataGlobal.prototype.getCurrentRouteASAP = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var routerReady = function () {
                return _this.router.currentInstruction && _this.router.currentInstruction.config;
            };
            if (routerReady())
                return resolve(_this.router.currentInstruction.config.name);
            var nbChecks = 0;
            var interval = setInterval(function () {
                if (routerReady()) {
                    clearInterval(interval);
                    resolve(_this.router.currentInstruction.config.name);
                }
                if (nbChecks > 100) {
                    clearInterval(interval);
                    resolve('');
                }
            }, 5);
        });
    };
    SwissdataGlobal.prototype.imageSrc = function (modelRoute, fieldname, previewFormat) {
        if (previewFormat === void 0) { previewFormat = null; }
        var preview = previewFormat ? "&preview=" + previewFormat : '';
        var config = this.container.get('aurelia-deco-config');
        return config.api.host + "/" + modelRoute + "?apiKey=" + this.swissdataApi.state.swissdata.publicKey + "&download=" + fieldname + preview;
    };
    SwissdataGlobal.prototype.updateAllModelsFromApi = function (ignoreError) {
        var _this = this;
        if (ignoreError === void 0) { ignoreError = false; }
        var promises = [];
        for (var _i = 0, _a = this.config.dynamicModelSlugsForAutoLoading || []; _i < _a.length; _i++) {
            var modelName = _a[_i];
            var promise = this.updateModelsFromApi(modelName, ignoreError);
            promises.push(promise);
        }
        return Promise.all(promises).then(function () {
            _this.publish('swissdata:all-models-updated-from-api');
        });
    };
    SwissdataGlobal.prototype.updateModelsFromApi = function (modelName, ignoreError) {
        var _this = this;
        if (ignoreError === void 0) { ignoreError = false; }
        var store = this.container.get(deco_1.Store);
        store.registerAction('setAppModels', actions_1.setAppModels);
        return dynamicdata_model_1.DynamicDataModel.use(modelName).getAll().then(function (el) {
            var elements = el;
            return store.dispatch(actions_1.setAppModels, modelName, elements);
        }).then(function () {
            _this.publish('swissdata:model-updated-from-api', modelName);
        }).catch(function (error) {
            if (!ignoreError)
                throw error;
        });
    };
    SwissdataGlobal.prototype.lastUpdateText = function (instance) {
        return __awaiter(this, void 0, void 0, function () {
            var date, _user, _a, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        date = instance._updatedAt ? moment(instance._updatedAt).format() : this.i18n.tr('global.Unknown');
                        if (!instance._updatedBy) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.ensureUsers.get(instance._updatedBy)];
                    case 1:
                        _a = (_b.sent());
                        return [3 /*break*/, 3];
                    case 2:
                        _a = undefined;
                        _b.label = 3;
                    case 3:
                        _user = _a;
                        user = _user ? _user._label : this.i18n.tr('global.Unknown');
                        return [2 /*return*/, this.i18n.tr('Last update by {{user}} on {{- date}}', { user: user, date: date })];
                }
            });
        });
    };
    return SwissdataGlobal;
}());
exports.SwissdataGlobal = SwissdataGlobal;
