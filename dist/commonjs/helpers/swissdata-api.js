"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeStep = exports.SwissdataApi = void 0;
var authentication_control_1 = require("./authentication-control");
var swissdata_global_1 = require("./swissdata-global");
var request_recorder_1 = require("./request-recorder");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var deco_1 = require("../deco");
var aurelia_framework_1 = require("aurelia-framework");
require("whatwg-fetch");
var actions_1 = require("../state/actions");
var aurelia_logging_1 = require("aurelia-logging");
var aurelia_router_1 = require("aurelia-router");
var i18n_setup_1 = require("./i18n-setup");
var globalContexts = ['', 'gettingStarted', 'shop', 'error', 'info', 'confirmation', 'admin', 'three', 'bcf'];
var isGlobalDico = function (key) {
    if (key.indexOf('.') === -1) {
        return true;
    }
    if (globalContexts.includes(key)) {
        return true;
    }
    if (globalContexts.some(function (context) {
        return key.indexOf(context + '.') === 0;
    })) {
        return true;
    }
    return false;
};
var SwissdataApi = /** @class */ (function (_super) {
    __extends(SwissdataApi, _super);
    function SwissdataApi(http) {
        var _this = _super.call(this, http) || this;
        _this.ready = false;
        _this.swissdataInitDone = false;
        _this.log = aurelia_logging_1.getLogger('swissdata-api');
        return _this;
    }
    Object.defineProperty(SwissdataApi.prototype, "ensureUsers", {
        //public appState?: AppState;
        //public store?: Store<AppState>;
        get: function () {
            return this.container.get(swissdata_global_1.SwissdataGlobal).ensureUsers;
        },
        enumerable: false,
        configurable: true
    });
    SwissdataApi.prototype.init = function (store, options) {
        var _this = this;
        if (this.swissdataInitDone && !options.force)
            return Promise.resolve();
        this.log.debug('swissdata init', options);
        return _super.prototype.init.call(this, store, options).then(function () {
            /*
            we don't need to subscribe here, because it is done in the parent DecoApi class
                  this.store.state.subscribe(
                    (state) => this.state = (state as AppState)
                  );
            */
            _this.container.registerInstance(deco_1.DecoApi, _this);
            var recorder = _this.container.get(request_recorder_1.RequestRecorder);
            _this.authenticationControl = _this.container.get(authentication_control_1.AuthenticationControl);
            var swissdataConfig = _this.container.get('aurelia-deco-config');
            _this.http.configure(function (config) {
                config
                    //.useStandardConfiguration()
                    .withDefaults({
                    credentials: 'same-origin'
                })
                    .withInterceptor(_this.authenticationControl.responseInterceptor())
                    .withInterceptor(recorder.requestInterceptor())
                    .withBaseUrl(swissdataConfig.api.host);
            });
            _this.store = store;
            _this.store.registerAction('initSwissdataState', actions_1.initSwissdataState);
            _this.store.registerAction('setApiHost', actions_1.setApiHost);
            _this.store.registerAction('setState', actions_1.setState);
            _this.store.registerAction('setAccessToken', actions_1.setAccessToken);
            _this.store.registerAction('setDoubleAuthValidationToken', actions_1.setDoubleAuthValidationToken);
            _this.store.registerAction('authenticate', actions_1.authenticate);
            _this.store.registerAction('logout', actions_1.logout);
            _this.store.registerAction('waitForDoubleAuth', actions_1.waitForDoubleAuth);
            _this.store.registerAction('setLoginStep', actions_1.setLoginStep);
            _this.store.registerAction('setSwissdataStateProps', actions_1.setSwissdataStateProps);
            _this.store.registerAction('setOnline', actions_1.setOnline);
            return _this.store.dispatch(actions_1.initSwissdataState).then(function () {
                return _this.store.dispatch(actions_1.setApiHost, swissdataConfig.api.host);
            }).then(function () {
                var __this = _this;
                if (swissdataConfig.registerMissingTranslationKeys) {
                    var ea = _this.container.get(aurelia_event_aggregator_1.EventAggregator);
                    var languages_1 = _this.state.languages;
                    var timeout_1 = 100;
                    ea.subscribe('i18next.missing.key', function (data) {
                        var key = data.key;
                        var value = data.fallbackValue.split('.').splice(-1, 1)[0];
                        var namespace = data.ns;
                        var multiLangValue = {};
                        for (var _i = 0, languages_2 = languages_1; _i < languages_2.length; _i++) {
                            var language = languages_2[_i];
                            multiLangValue[language] = value;
                        }
                        var options = i18n_setup_1.getI18NSetupOptions();
                        var apiKey = options.apiKey;
                        var apiHost = options.host;
                        if (isGlobalDico(key)) {
                            apiKey = options.translationMemoryApiKey;
                            apiHost = options.translationMemoryHost || options.host;
                        }
                        if (namespace === 'local') {
                            apiKey = options.apiKey;
                            apiHost = options.host;
                        }
                        setTimeout(function () {
                            __this.post(apiHost + "/dico?apiKey=" + apiKey, { key: key, value: multiLangValue });
                        }, timeout_1);
                        timeout_1 += 100;
                    });
                }
                _this.configured = true;
                _this.swissdataInitDone = true;
                _this.ready = true;
            });
        });
    };
    // clearState() {
    //   if (!this.store) throw new Error('SwissdataApi: store is not yet defined');
    //   this.store.registerAction('clearSwissdataState', clearSwissdataState);
    //   return super.clearState().then(() => {
    //     return this.store.dispatch(clearSwissdataState);
    //   });
    // }
    SwissdataApi.prototype.setState = function (state) {
        this.store.dispatch('setState', state);
    };
    SwissdataApi.prototype.defaultOptions = function (options) {
        if (options === void 0) { options = {}; }
        var o = _super.prototype.defaultOptions.call(this, options);
        if (this.state.swissdata.accessToken)
            o.headers.Authorization = 'Bearer ' + this.state.swissdata.accessToken;
        return Object.assign({}, o, options);
    };
    SwissdataApi.prototype.extendEntrpoint = function (entrypoint) {
        entrypoint = _super.prototype.extendEntrpoint.call(this, entrypoint);
        return this.addAppId(entrypoint);
    };
    SwissdataApi.prototype.addAppId = function (entrypoint) {
        if (entrypoint.indexOf('apiKey=') !== -1)
            return entrypoint; // do not add an apiKey if one is already present
        if (entrypoint.indexOf('?') === -1)
            return entrypoint + "?apiKey=" + this.state.swissdata.publicKey;
        else
            return entrypoint + "&apiKey=" + this.state.swissdata.publicKey;
    };
    SwissdataApi.prototype.isReady = function () {
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
                reject(new Error('Swissdata not ready after 5 seconds [timeout]'));
            }, 5000);
        });
    };
    SwissdataApi.prototype.checkStatus = function () {
        var _this = this;
        this.get('/status').then(deco_1.jsonify).then(function (response) {
            if (response && response.status === 'OK' && _this.state.swissdata.online !== true) {
                _this.store.dispatch(actions_1.setOnline, true);
                var ea = _this.container.get(aurelia_event_aggregator_1.EventAggregator);
                ea.publish('swissdata:online');
            }
            else if (!response || response.status !== 'OK') {
                throw new Error('Offline');
            }
        }).catch(function (error) {
            if (_this.state.swissdata.online !== false) {
                _this.store.dispatch(actions_1.setOnline, false);
                var ea = _this.container.get(aurelia_event_aggregator_1.EventAggregator);
                ea.publish('swissdata:offline');
            }
        });
    };
    SwissdataApi.prototype.startCheckStatus = function (interval, unit) {
        var _this = this;
        if (unit === void 0) { unit = 'milliseconds'; }
        this.stopCheckingStatus();
        if (unit === 'seconds')
            interval = interval * 1000;
        this.checkStatus();
        this.checkStatusInterval = setInterval(function () {
            _this.checkStatus();
        }, interval);
    };
    SwissdataApi.prototype.stopCheckingStatus = function () {
        clearInterval(this.checkStatusInterval);
    };
    SwissdataApi.prototype.ensureAuthentication = function () {
        var _this = this;
        if (!this.swissdataInitDone)
            throw new Error('SwissdataApi must be initialized (init()) before you can use it');
        if (!this.state.swissdata.authenticated)
            return Promise.resolve(false);
        return this.post('/auth/authenticated').then(function (response) {
            if (response.status === 204) {
                return Promise.resolve(true);
            }
            else {
                return Promise.reject();
            }
        }).catch(function (error) {
            return _this.setStateAsUnauthenticated();
        }).then(function () {
            return false;
        });
    };
    SwissdataApi.prototype.checkAuthentication = function () {
        if (!this.swissdataInitDone)
            throw new Error('SwissdataApi must be initialized (init()) before you can use it');
        if (!this.state.swissdata.authenticated)
            return Promise.resolve(false);
        return this.post('/auth/authenticated').then(function (response) {
            return false;
        });
    };
    SwissdataApi.prototype.authenticate = function (username, password) {
        var _this = this;
        if (!this.swissdataInitDone)
            throw new Error('SwissdataApi must be initialized (init()) before you can use it');
        return this.post('/auth/token', { username: username.toLowerCase(), password: password }).then(deco_1.jsonify).then(function (response) {
            if (!response || !response.token)
                return false;
            if (response.type === 'access') {
                return _this.setAccessToken(response);
            }
            else if (response.type === 'double-auth') {
                return _this.setDoubleAuth(response);
            }
            else {
                throw new Error('Invalid response');
            }
        }).catch(function (error) {
            return _this.setStateAsUnauthenticated().then(function () {
                return Promise.reject(error);
            });
        });
    };
    SwissdataApi.prototype.doubleAuth = function (code) {
        var _this = this;
        if (!this.swissdataInitDone)
            throw new Error('SwissdataApi must be initialized (init()) before you can use it');
        return this.post('/auth/token', { token: this.state.swissdata.doubleAuthValidationToken, code: code }).then(deco_1.jsonify).then(function (response) {
            if (!response || !response.token)
                return false;
            if (response.type === 'access') {
                return _this.setAccessToken(response);
            }
            else {
                throw new Error('Invalid response');
            }
        }).catch(function (error) {
            return _this.setStateAsUnauthenticated().then(function () {
                return Promise.reject(error);
            });
        });
    };
    SwissdataApi.prototype.setAccessToken = function (token) {
        var _this = this;
        return this.store.dispatch(actions_1.setAccessToken, token.token).then(function () {
            return _this.setCurrentUser();
        });
    };
    SwissdataApi.prototype.setCurrentUser = function () {
        var _this = this;
        return this.get('/user/current').then(deco_1.jsonify).then(function (user) {
            if (!user) {
                return _this.setStateAsUnauthenticated().then(function () { return false; });
            }
            return _this.setStateAsAuthenticated(user).then(function () { return true; });
        });
    };
    SwissdataApi.prototype.setDoubleAuth = function (token) {
        var _this = this;
        return this.store.dispatch(actions_1.setDoubleAuthValidationToken, token.token).then(function () {
            return _this.store.dispatch('waitForDoubleAuth', token.token).then(function () { return false; });
        });
    };
    SwissdataApi.prototype.logout = function () {
        var _this = this;
        console.warn('DEPRECATED', 'SwissdataApi.logout() has been replaced by SdLogin.logout()');
        return this.post('/auth/revoke-token', { token: this.state.swissdata.accessToken }).finally(function () {
            return _this.setStateAsUnauthenticated();
        }).then(function () {
            var ea = _this.container.get(aurelia_event_aggregator_1.EventAggregator);
            ea.publish('swissdata-logout');
            ea.publish('swissdata:logout');
        });
    };
    SwissdataApi.prototype.requestResetPassword = function (emailOrMobile) {
        return this.post("/auth/forgot-password", {
            q: emailOrMobile.toLowerCase()
        }).then(deco_1.jsonify);
    };
    SwissdataApi.prototype.resetPassword = function (token, code, newPassword) {
        return this.put("/auth/reset-password", {
            token: token,
            code: code,
            newPassword: newPassword
        }).then(deco_1.jsonify);
    };
    SwissdataApi.prototype.hideOnboarding = function () {
        var _this = this;
        return this.put('/user/hide-onboarding').then(deco_1.jsonify).then(function (user) {
            if (!user) {
                return _this.setStateAsUnauthenticated().then(function () { return false; });
            }
            return _this.setStateAsAuthenticated(user).then(function () { return user; });
        });
    };
    SwissdataApi.prototype.setStateAsUnauthenticated = function () {
        return this.store.dispatch('logout');
    };
    SwissdataApi.prototype.setStateAsAuthenticated = function (user) {
        return this.store.dispatch('authenticate', user);
    };
    return SwissdataApi;
}(deco_1.DecoApi));
exports.SwissdataApi = SwissdataApi;
var AuthorizeStep = /** @class */ (function () {
    function AuthorizeStep(container) {
        this.container = container instanceof aurelia_framework_1.Container ? container : aurelia_framework_1.Container.instance;
    }
    AuthorizeStep_1 = AuthorizeStep;
    AuthorizeStep.prototype.run = function (navigationInstruction, next) {
        var _a;
        if (navigationInstruction.getAllInstructions().some(function (i) { return i.config.settings.auth; })) {
            if (!this.container.get(SwissdataApi).state.swissdata.authenticated) {
                var url = AuthorizeStep_1.redirectUnauthenticatedTo;
                if (url.indexOf('?') !== -1) {
                    url += '&';
                }
                else {
                    url += '?';
                }
                var f = ((_a = navigationInstruction.parentInstruction) === null || _a === void 0 ? void 0 : _a.config.name) || '';
                var t = navigationInstruction.config.name;
                var p = navigationInstruction.params ? btoa(JSON.stringify(navigationInstruction.params)) : '';
                if (f) {
                    url += "f=" + f + "&";
                }
                if (p) {
                    url += "p=" + p + "&";
                }
                url += "t=" + t;
                return next.cancel(new aurelia_router_1.Redirect(url));
            }
        }
        return next();
    };
    var AuthorizeStep_1;
    AuthorizeStep.redirectUnauthenticatedTo = 'home';
    AuthorizeStep = AuthorizeStep_1 = __decorate([
        aurelia_framework_1.inject(aurelia_framework_1.Container)
    ], AuthorizeStep);
    return AuthorizeStep;
}());
exports.AuthorizeStep = AuthorizeStep;
