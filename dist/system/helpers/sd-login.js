System.register(["./../models/user.model", "../deco", "aurelia-framework", "aurelia-logging", "../state/sd-login-actions", "aurelia-event-aggregator"], function (exports_1, context_1) {
    "use strict";
    var user_model_1, deco_1, aurelia_framework_1, aurelia_logging_1, sd_login_actions_1, aurelia_event_aggregator_1, SdLogin;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (user_model_1_1) {
                user_model_1 = user_model_1_1;
            },
            function (deco_1_1) {
                deco_1 = deco_1_1;
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            },
            function (sd_login_actions_1_1) {
                sd_login_actions_1 = sd_login_actions_1_1;
            },
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            }
        ],
        execute: function () {
            SdLogin = /** @class */ (function () {
                function SdLogin() {
                    this.inited = false;
                    this.log = aurelia_logging_1.getLogger('sd-login');
                    // password regexp from this website: https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
                    // strong: Minimum 8 caracters with lowercase, uppercase, numeric and special caracters
                    // medium: Minimum 6 caracters, with a mix of lowercase, uppercase and numeric caracters
                    this.strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                    this.mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
                    this.weakRegex = new RegExp("^(?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9])|(?=.*[!@#\$%\^&\*])(?=.{8,})");
                    this.passwordStrengthRequired = 'medium';
                    this.processing = false;
                    this.readySub = [];
                    this.eventAggregator = aurelia_framework_1.Container.instance.get(aurelia_event_aggregator_1.EventAggregator);
                }
                SdLogin.prototype.init = function (store, api) {
                    var _this = this;
                    this.log.debug('init');
                    if (this.inited) {
                        throw new Error('Cannot init SdLogin twice');
                        return;
                    }
                    this.store = store;
                    this.store.state.subscribe(function (state) { return _this.state = state; });
                    this.api = api;
                    this.registerActions();
                    this.inited = true;
                    for (var _i = 0, _a = this.readySub; _i < _a.length; _i++) {
                        var sub = _a[_i];
                        sub();
                    }
                };
                SdLogin.prototype.ready = function () {
                    var _this = this;
                    if (this.inited)
                        return Promise.resolve();
                    return new Promise(function (resolve) {
                        _this.readySub.push(resolve);
                    });
                };
                SdLogin.prototype.registerActions = function () {
                    this.store.registerAction('sd-login-reset', sd_login_actions_1.reset);
                    this.store.registerAction('sd-login-setUsername', sd_login_actions_1.setUsername);
                    this.store.registerAction('sd-login-passwordStep', sd_login_actions_1.passwordStep);
                    this.store.registerAction('sd-login-validateAccountStep', sd_login_actions_1.validateAccountStep);
                    this.store.registerAction('sd-login-doubleAuthStep', sd_login_actions_1.doubleAuthStep);
                    this.store.registerAction('sd-login-setAccessToken', sd_login_actions_1.setAccessToken);
                    this.store.registerAction('sd-login-authenticate', sd_login_actions_1.authenticate);
                    this.store.registerAction('sd-login-setCurrentProfile', sd_login_actions_1.setCurrentProfile);
                    this.store.registerAction('sd-login-resetPasswordStep', sd_login_actions_1.resetPasswordStep);
                    this.store.registerAction('sd-login-logout', sd_login_actions_1.logout);
                    this.store.registerAction('sd-login-registerUserId', sd_login_actions_1.registerUserId);
                    this.store.registerAction('sd-login-updateRegisteredUserId', sd_login_actions_1.updateRegisteredUserId);
                    this.store.registerAction('sd-login-registerCurrentUserId', sd_login_actions_1.registerCurrentUserId);
                    this.store.registerAction('sd-login-removeRegisteredUserId', sd_login_actions_1.removeRegisteredUserId);
                };
                SdLogin.prototype.checkIfUsernameExists = function (username) {
                    var _this = this;
                    if (!username)
                        return Promise.resolve(false);
                    var type = username.indexOf('@') === -1 ? 'mobile' : 'email';
                    return this.api.get("/user/exists/" + type + "/" + username.toLowerCase()).then(deco_1.jsonify).then(function (result) {
                        if (result.exists)
                            return type;
                        return false;
                    }).then(function (type) {
                        if (type === false) {
                            return Promise.resolve(false);
                        }
                        else {
                            return _this.store.dispatch(sd_login_actions_1.passwordStep, username).then(function () { return type; });
                        }
                    });
                };
                SdLogin.prototype.authenticate = function (username, password) {
                    return this.api.post('/auth/token', { username: username.toLowerCase(), password: password }).then(deco_1.jsonify).then(function (response) {
                        if (!response || !response.token)
                            return false;
                        if (response.type === 'access') {
                            return response.token;
                        }
                        else if (response.type === 'double-auth') {
                            return 'double-auth';
                        }
                        else {
                            throw new Error('Invalid response');
                        }
                    });
                };
                SdLogin.prototype.login = function (username, password) {
                    var _this = this;
                    this.processing = true;
                    localStorage.setItem(this.api.state.swissdata.publicKey + "-login-input", username);
                    return this.authenticate(username, password).then(function (authResult) {
                        _this.processing = false;
                        if (authResult === 'double-auth') {
                            throw new Error('Double Auth not yet implemented');
                        }
                        return _this.store.dispatch(sd_login_actions_1.setAccessToken, authResult);
                    }).then(function () {
                        return _this.api.get('/user/current').then(deco_1.jsonify);
                    }).then(function (user) {
                        if (!user) {
                            return _this.store.dispatch(sd_login_actions_1.logout).then(function () { throw new Error('User not found'); });
                        }
                        return _this.store.dispatch(sd_login_actions_1.authenticate, user);
                    }).then(function () {
                        return _this.api.get('/profile/current').then(deco_1.jsonify);
                    }).then(function (profile) {
                        if (profile)
                            return _this.store.dispatch(sd_login_actions_1.setCurrentProfile, profile);
                        return Promise.resolve();
                    }).then(function () {
                        return _this.store.dispatch(sd_login_actions_1.registerCurrentUserId, username);
                    }).then(function () {
                        return _this.store.dispatch(sd_login_actions_1.reset);
                    }).then(function () {
                        var data = {
                            accessToken: _this.state.swissdata.accessToken,
                            user: _this.state.swissdata.user,
                            profile: _this.state.swissdata.profile
                        };
                        _this.eventAggregator.publish('swissdata:login', data);
                        _this.eventAggregator.publish('swissdata-login', data);
                    }).catch(function (error) {
                        _this.processing = false;
                        throw error;
                    });
                };
                SdLogin.prototype.doubleAuth = function (code) {
                };
                SdLogin.prototype.passwordRegex = function () {
                    if (this.passwordStrengthRequired === 'weak')
                        return this.weakRegex;
                    else if (this.passwordStrengthRequired === 'medium')
                        return this.mediumRegex;
                    return this.strongRegex;
                };
                SdLogin.prototype.createAccount = function (firstname, lastname, email, mobile, password, ensureEmail, ensureMobile, extraData) {
                    var _this = this;
                    var regex = this.passwordRegex();
                    if (!regex.test(password) && password !== '0123')
                        return Promise.reject(new Error('Password not strong enough'));
                    var instance = new user_model_1.UserModel;
                    instance.firstname = firstname;
                    instance.lastname = lastname;
                    instance.email = email;
                    instance.mobile = mobile;
                    return instance.validationController.validate().then(function (result) {
                        if (!result || !result.valid) {
                            // validation failed, but it can be that the mobile is not required and validation failed only for mobile (or same for email).
                            for (var _i = 0, _a = result.results; _i < _a.length; _i++) {
                                var r = _a[_i];
                                if (r.valid)
                                    continue;
                                if (r.propertyName === 'mobile' && !ensureMobile)
                                    continue;
                                if (r.propertyName === 'createAccountMobile' && !ensureMobile)
                                    continue;
                                if (r.propertyName === 'email' && !ensureEmail)
                                    continue;
                                // if we arrive here, it means we have a failed validation for a required field
                                return Promise.resolve(null);
                            }
                            // if we arrive here, it's good news, what failed was not required. We can go on...
                        }
                        _this.processing = true;
                        _this.eventAggregator.publish('analytics:event', { key: 'create-account', value: { email: instance.email, mobile: instance.mobile } });
                        return instance.createAccount({ body: { password: password, extraData: extraData } });
                    }).then(function (element) {
                        _this.log.debug('response from create account', element);
                        if (element.token) {
                            return _this.store.dispatch(sd_login_actions_1.validateAccountStep, element.token, element.expires);
                        }
                    }).then(function () {
                        _this.processing = false;
                    }).catch(function (error) {
                        _this.processing = false;
                        throw error;
                    });
                };
                SdLogin.prototype.validateCode = function (code, type) {
                    var _this = this;
                    if (!code || code.length < 6) {
                        return Promise.reject(new Error('The code must be contain at least 6 digits'));
                    }
                    this.processing = true;
                    var emptyUserInstance = new user_model_1.UserModel;
                    this.log.debug('state', this.state);
                    this.log.debug('state.sdlogin', this.state.sdlogin);
                    return emptyUserInstance.validAccountCreationToken(type, this.state.sdlogin.createAccountValidationToken, code).then(function (element) {
                        _this.processing = false;
                        if (!_this.processValidationResponse(element))
                            throw new Error('Validation failed');
                        return _this.store.dispatch(sd_login_actions_1.reset).then(function () { return element; });
                    }).catch(function (error) {
                        _this.processing = false;
                        throw error;
                    });
                };
                SdLogin.prototype.resendCode = function (method) {
                    return this.api.put("/user/resend-code", {
                        token: this.api.state.swissdata.createAccountValidationToken,
                        method: method
                    });
                };
                SdLogin.prototype.processValidationResponse = function (response) {
                    // the emailValidated and mobileValidated properties are both in token and user response
                    // let emailValidated = response.emailValidated;
                    // let mobileValidated = response.mobileValidated;
                    if (response.createAccountValidation) {
                        throw new Error('This process cannot work (yet) when both email and mobile are required for account creation');
                    }
                    if (response.firstname) {
                        // we have a user
                        if (response.id) {
                            this.eventAggregator.publish('analytics:event', { key: 'validated-account', value: { userId: response.id } });
                        }
                        return true;
                    }
                    else {
                        throw new Error('Didnt get a user, this is not normal');
                    }
                };
                SdLogin.prototype.requestResetPassword = function (input) {
                    var _this = this;
                    this.processing = true;
                    return this.api.requestResetPassword(input).then(function (token) {
                        if (!token || !token.token)
                            throw new Error('Invalid request');
                        return _this.store.dispatch(sd_login_actions_1.resetPasswordStep, token.token);
                    }).then(function () {
                        _this.processing = false;
                    }).catch(function (error) {
                        _this.processing = false;
                        throw error;
                    });
                };
                SdLogin.prototype.resetPassword = function (code, password) {
                    var _this = this;
                    var regex;
                    if (this.passwordStrengthRequired === 'weak')
                        regex = this.weakRegex;
                    else if (this.passwordStrengthRequired === 'medium')
                        regex = this.mediumRegex;
                    else
                        regex = this.strongRegex;
                    if (!regex.test(password) && password !== '0123')
                        return Promise.reject(new Error('Password not strong enough'));
                    this.processing = true;
                    return this.api.resetPassword(this.state.sdlogin.resetPasswordToken, code, password).then(function () {
                        _this.processing = false;
                    }).catch(function (error) {
                        _this.processing = false;
                        throw error;
                    });
                };
                SdLogin.prototype.logout = function () {
                    var _this = this;
                    return this.api.post('/auth/revoke-token', { token: this.state.swissdata.accessToken }).finally(function () {
                        return _this.store.dispatch(sd_login_actions_1.logout);
                    }).then(function () {
                        _this.eventAggregator.publish('swissdata-logout');
                        _this.eventAggregator.publish('swissdata:logout');
                    });
                };
                return SdLogin;
            }());
            exports_1("SdLogin", SdLogin);
            /*
            {
              "id": "5daa1debd0306e546265c9ff",
              "_createdAt": "2019-10-18T20:17:47.084Z",
              "_updatedAt": "2019-10-18T20:17:47.084Z",
              "token": "f1c548547b3966c358c0e7b9332b459b",
              "emailValidated": false,
              "mobileValidated": false,
              "createAccountValidation": "emailOrMobile"
            }
            */
        }
    };
});
