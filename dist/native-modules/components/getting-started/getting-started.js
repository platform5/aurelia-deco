var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject, bindable, observable, computedFrom, Container, TaskQueue } from 'aurelia-framework';
import { ValidationControllerFactory, ValidationRules, validateTrigger } from 'aurelia-validation';
import { getLogger } from 'aurelia-logging';
import { I18N } from 'aurelia-i18n';
import { errorify, notify, AureliaUXFormRenderer, LocalesDialog } from 'aurelia-resources';
import { jsonify } from '../../deco';
import { SdLogin } from '../../helpers/sd-login';
import { StyleEngine } from '@aurelia-ux/core';
import { DialogService } from 'aurelia-dialog';
import PhoneNumber from 'awesome-phonenumber';
import { notifier } from '../notification/swissdata-notification';
import * as moment from 'moment';
import { validateAccountStep } from '../../state/sd-login-actions';
var log = getLogger('getting-started');
var GettingStarted = /** @class */ (function () {
    function GettingStarted(element, styleEngine, sdLogin, i18n, validationControllerFactory, dialogService) {
        var _this = this;
        this.element = element;
        this.styleEngine = styleEngine;
        this.sdLogin = sdLogin;
        this.i18n = i18n;
        this.validationControllerFactory = validationControllerFactory;
        this.dialogService = dialogService;
        this.locales = ['fr_CH', 'de_CH', 'fr_FR'];
        this.step = 'pre-account';
        this.newAccountUsernameAsEmail = false;
        this.nbStepPreAccount = 0;
        this.nbStepPostAccount = 0;
        this.nbStepPostLogin = 0;
        this.keyboardPlugin = false;
        this.keyboardHeight = 0;
        this.processing = false;
        this.subscriptions = [];
        this.createAccountMemory = {};
        this.showUsernameField = !window.chrome;
        this.showPasswordField = !window.chrome;
        this.handleResize = function (e) {
            var h = _this.element.offsetHeight;
            _this.arNextElement.style.height = h - 130 + "px";
        };
        this.handleKeyboardUp = function (e) {
            setTimeout(function () {
                _this.keyboardHeight = e.keyboardHeight;
            }, 50);
        };
        this.handleKeyboardDown = function (e) {
            setTimeout(function () {
                _this.keyboardHeight = 0;
            }, 10);
        };
        this.swissdataConfig = Container.instance.get('aurelia-deco-config');
        this.swissdataConfig.api.host;
        this.swissdataConfig.api.publicKey;
        ValidationRules
            .ensure('username')
            .required()
            .ensure('newAccountUsername')
            .displayName(this.i18n.tr('gettingStarted.Username'))
            .email().when(function (obj) {
            return isEmail(obj);
        }).withMessage(this.i18n.tr('gettingStarted.Username must be a valid email or mobile number'))
            .satisfies(function (value, obj) {
            if (isEmail(obj)) {
                // assume an email, return true here
                return true;
            }
            if (!value)
                return true; // this rule is not wrong, because its purpose is not to check if its required or not
            var countryCode = _this.state.country;
            var number = new PhoneNumber(value, countryCode.toLowerCase());
            if (!number.isValid())
                return false;
            if (!number.isPossible())
                return false;
            if (!number.isMobile())
                return false;
            return true;
        }).withMessage(this.i18n.tr('gettingStarted.Invalid mobile number'))
            .ensure('forgotUsername')
            .required()
            .ensure('password').required()
            .ensure('newAccountPassword').displayName(this.i18n.tr('gettingStarted.Password')).required().minLength(8).matches(this.sdLogin.passwordRegex())
            .ensure('forgotNewPassword').displayName(this.i18n.tr('gettingStarted.Password')).required().minLength(8).matches(this.sdLogin.passwordRegex())
            .ensure('firstname').required()
            .ensure('lastname').required()
            .ensure('code').required()
            .ensure('forgotCode').required()
            .on(GettingStarted_1);
        this.validationController = validationControllerFactory.create();
        this.validationController.validateTrigger = validateTrigger.manual;
        this.validationController.addObject(this);
        this.validationController.addRenderer(new AureliaUXFormRenderer());
    }
    GettingStarted_1 = GettingStarted;
    GettingStarted.prototype.bind = function () {
        if (this.theme != null && this.theme.themeKey == null) {
            this.theme.themeKey = 'getting-started';
        }
        this.styleEngine.applyTheme(this.theme, this.element);
        // this.goToStart();
    };
    GettingStarted.prototype.attached = function () {
        var _this = this;
        var search = location.search;
        if (search && search.substr(0, 1) === '?') {
            var searchParts = search.substr(1).split('&');
            for (var _i = 0, searchParts_1 = searchParts; _i < searchParts_1.length; _i++) {
                var part = searchParts_1[_i];
                var keyValue = part.split('=');
                var key = keyValue[0];
                var value = keyValue[1];
                if (key === 'step' && value === 'create-account') {
                    setTimeout(function () {
                        _this.goToCreateAnAccount();
                    }, 350);
                }
                if (key === 'f') {
                    this.firstname = decodeURIComponent(value);
                }
                if (key === 'l') {
                    this.lastname = decodeURIComponent(value);
                }
                if (key === 'e' && value) {
                    this.newAccountUsername = decodeURIComponent(value);
                }
                if (key === 'm' && value) {
                    this.newAccountUsername = decodeURIComponent(value);
                }
                if (key === 'extra') {
                    try {
                        this.extraData = JSON.parse(atob(value));
                    }
                    catch (error) {
                        this.extraData = value;
                    }
                }
                location.search.replace(part, '');
            }
        }
        this.fetchCreateAccountMemory();
        this.subscriptions.push(this.sdLogin.eventAggregator.subscribe('swissdata:logout', function () {
            if (_this.step !== 'pre-account' && _this.step !== 'accounts-list' && _this.step !== 'login') {
                _this.goToStart();
            }
        }));
        this.subscriptions.push(this.sdLogin.eventAggregator.subscribe('getting-started.goto-step', function (data) {
            var allowedSteps = ['pre-account', 'post-account', 'accounts-list', 'login',
                'password', 'create-account', 'create-account-part2',
                'validate-account', 'forgot-password', 'reset-password'];
            if (allowedSteps.indexOf(data) !== -1) {
                _this.setStep(data);
            }
        }));
        this.sdLogin.ready().then(function () {
            Container.instance.get(TaskQueue).queueTask(function () {
                _this.fixSlots();
                if (_this.arNextStart) {
                    _this.arNextStart.reset();
                }
                if (_this.sdLogin.state.swissdata.authenticated) {
                    _this.goToPostLogin();
                }
                else {
                    if (_this.nbStepPreAccount > 0) {
                        _this.step = 'pre-account';
                    }
                    else {
                        _this.goToStart();
                    }
                }
            });
        });
        this.handleResize(null);
        window.addEventListener('resize', this.handleResize);
        if (window.Keyboard) {
            this.keyboardPlugin = true;
            window.addEventListener('keyboardWillShow', this.handleKeyboardUp);
            window.addEventListener('keyboardWillHide', this.handleKeyboardDown);
        }
        this.window = window;
        this.body = document.body;
        this.html = document.querySelector('html');
    };
    GettingStarted.prototype.detached = function () {
        for (var _i = 0, _a = this.subscriptions; _i < _a.length; _i++) {
            var sub = _a[_i];
            sub.dispose();
        }
        this.subscriptions = [];
        this.arNextStart.reset();
        window.removeEventListener('resize', this.handleResize);
        if (this.keyboardPlugin) {
            window.addEventListener('keyboardWillShow', this.handleKeyboardUp);
            window.addEventListener('keyboardWillHide', this.handleKeyboardDown);
        }
    };
    Object.defineProperty(GettingStarted.prototype, "compensationHeight", {
        get: function () {
            if (this.keyboardPlugin || !this.body || !this.window)
                return 0;
            this.html.scrollTop = 0;
            return this.body.offsetHeight - this.window.innerHeight;
        },
        enumerable: false,
        configurable: true
    });
    GettingStarted.prototype.fixSlots = function () {
        var elements = this.element.querySelectorAll('.getting-started__slots-container > *');
        var containers = this.element.querySelectorAll('.getting-started__step');
        for (var index = 0; index < elements.length; index++) {
            var element = elements.item(index);
            if (element.getAttribute('slot') === 'pre-account') {
                var arNextItem = document.createElement('ar-next-item');
                arNextItem.appendChild(element);
                element.classList.add('getting-started__step');
                arNextItem.id = element.id || "getting-started-pre-account-" + this.nbStepPreAccount;
                arNextItem.setAttribute('data-gs-id', "getting-started-pre-account-" + this.nbStepPreAccount);
                this.arNextElement.prepend(arNextItem);
                this.nbStepPreAccount++;
                continue;
            }
            else if (element.getAttribute('slot') === 'post-account') {
                var arNextItem = document.createElement('ar-next-item');
                arNextItem.appendChild(element);
                element.classList.add('getting-started__step');
                arNextItem.id = element.id || "getting-started-post-account-" + this.nbStepPostAccount;
                arNextItem.setAttribute('data-gs-id', "getting-started-post-account-" + this.nbStepPostAccount);
                this.arNextElement.appendChild(arNextItem);
                this.nbStepPostAccount++;
                continue;
            }
            else if (element.getAttribute('slot') === 'post-login') {
                var arNextItem = document.createElement('ar-next-item');
                arNextItem.appendChild(element);
                element.classList.add('getting-started__step');
                arNextItem.id = element.id || "getting-started-post-login-" + this.nbStepPostLogin;
                arNextItem.setAttribute('data-gs-id', "getting-started-post-login-" + this.nbStepPostLogin);
                this.arNextElement.appendChild(arNextItem);
                this.nbStepPostLogin++;
                continue;
            }
            for (var index2 = 0; index2 < containers.length; index2++) {
                var container = containers.item(index2);
                if (element.getAttribute('slot') === container.id) {
                    var slotContainer = container.querySelector('.slot');
                    if (slotContainer)
                        slotContainer.appendChild(element);
                }
            }
        }
    };
    GettingStarted.prototype.newAccountUsernameChanged = function () {
        this.newAccountUsernameAsEmail = isEmail(this);
    };
    GettingStarted.prototype.setStep = function (step, focusFirstField) {
        var _this = this;
        if (focusFirstField === void 0) { focusFirstField = true; }
        if (step === 'login') {
            setTimeout(function () {
                _this.showUsernameField = true;
            }, 450);
        }
        else {
            this.showUsernameField = !window.chrome;
        }
        if (step === 'password') {
            setTimeout(function () {
                _this.showPasswordField = true;
            }, 450);
        }
        else {
            this.showPasswordField = !window.chrome;
        }
        this.validationController.reset();
        if (this.arNextStart && this.arNextElement) {
            this.arNextStart.to(step);
        }
        this.step = step;
        if (focusFirstField) {
            this.focusFirstInputIn(step);
        }
    };
    GettingStarted.prototype.focusFirstInputIn = function (id) {
        setTimeout(function () {
            var element = document.querySelector("ar-next-item#" + id + " ux-input input:not([disabled])");
            if (element instanceof HTMLInputElement)
                element.focus();
        }, 450);
    };
    GettingStarted.prototype.goToStart = function () {
        if (Array.isArray(this.sdLogin.state.sdlogin.accounts) && this.sdLogin.state.sdlogin.accounts.length > 0) {
            this.goToAccountsList();
        }
        else {
            this.goToLogin();
        }
    };
    GettingStarted.prototype.goToAccountsList = function () {
        this.setStep('accounts-list');
    };
    GettingStarted.prototype.loginWithUsername = function (username) {
        this.username = username;
        this.goToPassword();
    };
    GettingStarted.prototype.goToLogin = function () {
        this.setStep('login');
    };
    GettingStarted.prototype.prepareUsernameForApi = function (prop) {
        if (prop === void 0) { prop = 'username'; }
        var usernameForApi = this.username;
        if (isEmail(this, 'username')) {
            usernameForApi = this.username.trim().toLowerCase();
        }
        else {
            var countryCode = this.state.country;
            usernameForApi = new PhoneNumber(this.username, countryCode.toLowerCase()).getNumber();
        }
        return usernameForApi;
    };
    GettingStarted.prototype.checkUsername = function () {
        var _this = this;
        this.validationController.reset();
        var usernameForApi = this.prepareUsernameForApi();
        this.processing = true;
        return this.validationController.validate({ object: this, propertyName: 'username' }).then(function (result) {
            if (result.valid) {
                return _this.sdLogin.checkIfUsernameExists(usernameForApi).then(function (exists) {
                    if (exists === false) {
                        errorify(new Error(_this.i18n.tr('gettingStarted.This username does not exists')));
                    }
                    else if (exists === 'mobile') {
                        _this.goToPassword();
                    }
                    else {
                        _this.goToPassword();
                    }
                });
            }
            return Promise.resolve();
        }).finally(function () {
            _this.processing = false;
        });
    };
    GettingStarted.prototype.openLanguageDialog = function () {
        var _this = this;
        var currentLocale = this.state.language + '_' + this.state.country;
        this.dialogService.open({ viewModel: LocalesDialog, model: { locale: currentLocale, locales: this.locales }, centerHorizontalOnly: true, overlayDismiss: true }).whenClosed(function (response) {
            if (!response.wasCancelled && response.output) {
                _this.sdLogin.store.dispatch('setLanguage', response.output.substr(0, 2));
                _this.sdLogin.store.dispatch('setCountry', response.output.substr(3, 2));
            }
        });
    };
    GettingStarted.prototype.goToPassword = function () {
        if (!this.username) {
            this.goToLogin();
            return;
        }
        this.setStep('password');
    };
    GettingStarted.prototype.authenticate = function () {
        this.login(false, null);
    };
    GettingStarted.prototype.login = function (autoLoginAfterCreateAccount, event) {
        var _this = this;
        if (autoLoginAfterCreateAccount === void 0) { autoLoginAfterCreateAccount = false; }
        if (event && event.stopPropagation)
            event.stopPropagation();
        if (event && event.preventDefault)
            event.preventDefault();
        if (!this.sdLogin.inited)
            throw new Error('SdLogin must be inited before using Getting Started component');
        this.validationController.reset();
        this.processing = true;
        return this.validationController.validate({ object: this, propertyName: 'password' }).then(function (result) {
            if (result.valid) {
                var usernameForApi = _this.prepareUsernameForApi();
                return _this.sdLogin.login(usernameForApi, _this.password).then(function (a) {
                    _this.password = '';
                    _this.username = '';
                    if (autoLoginAfterCreateAccount) {
                        _this.goToPostAccount();
                    }
                    else {
                        _this.goToPostLogin();
                    }
                }).catch(function (error) { return errorify(new Error(_this.i18n.tr('gettingStarted.' + error.message))); });
            }
            return Promise.resolve();
        }).finally(function () {
            _this.processing = false;
        });
    };
    GettingStarted.prototype.goToCreateAnAccount = function () {
        if (!this.continueFromCreateAccountMemory()) {
            this.setStep('create-account');
        }
    };
    GettingStarted.prototype.goToCreateAnAccountPart2 = function () {
        var _this = this;
        if (!this.sdLogin.inited)
            throw new Error('SdLogin must be inited before using Getting Started component');
        this.processing = true;
        return Promise.all([
            this.validationController.validate({ object: this, propertyName: 'firstname' }),
            this.validationController.validate({ object: this, propertyName: 'lastname' }),
        ]).then(function (results) {
            if (results[0].valid && results[1].valid) {
                _this.username = '';
                _this.newAccountPassword = '';
                _this.saveCreateAccountMemory();
                _this.setStep('create-account-part2');
            }
            return Promise.resolve();
        }).finally(function () {
            _this.processing = false;
        });
    };
    GettingStarted.prototype.createAccount = function () {
        var _this = this;
        if (!this.sdLogin.inited)
            throw new Error('SdLogin must be inited before using Getting Started component');
        this.validationController.reset();
        this.processing = true;
        return Promise.all([
            this.validationController.validate({ object: this, propertyName: 'newAccountUsername' }),
            this.validationController.validate({ object: this, propertyName: 'newAccountPassword' }),
        ]).then(function (results) {
            if (results[0].valid && results[1].valid) {
                var email = null;
                var mobile = null;
                var ensureMobile = false;
                var ensureEmail = false;
                if (_this.newAccountUsernameAsEmail) {
                    email = _this.newAccountUsername.trim().toLowerCase();
                    // this.niceUsername = email;
                    ensureEmail = true;
                }
                else {
                    var countryCode = _this.state.country;
                    mobile = new PhoneNumber(_this.newAccountUsername, countryCode.toLowerCase()).getNumber();
                    // this.niceUsername = new PhoneNumber( this.newAccountUsername, countryCode.toLowerCase() ).getNumber('international');
                    ensureMobile = true;
                }
                return _this.sdLogin.createAccount(_this.firstname, _this.lastname, email, mobile, _this.newAccountPassword, ensureEmail, ensureMobile, _this.extraData).then(function (result) {
                    _this.code = '';
                    _this.saveCreateAccountMemory(_this.sdLogin.state.sdlogin.createAccountValidationToken, _this.sdLogin.state.sdlogin.createAccountValidationTokenExpiry);
                    _this.setStep('validate-account');
                }).catch(function (error) { return errorify(new Error(_this.i18n.tr('gettingStarted.' + error.message))); });
            }
            return Promise.resolve();
        }).finally(function () {
            _this.processing = false;
        });
    };
    GettingStarted.prototype.validateCode = function () {
        var _this = this;
        if (!this.sdLogin.inited)
            throw new Error('SdLogin must be inited before using Getting Started component');
        this.validationController.reset();
        this.processing = true;
        return this.validationController.validate({ object: this, propertyName: 'code' }).then(function (result) {
            if (result.valid) {
                var type = isEmail(_this, 'newAccountUsername') ? 'email' : 'mobile';
                return _this.sdLogin.validateCode(_this.code, type).then(function (result) {
                    _this.username = _this.newAccountUsername;
                    _this.password = _this.newAccountPassword;
                    //this.sdLogin.login(result.mobile || result.email, this.password);
                }).catch(function (error) { return errorify(new Error(_this.i18n.tr('gettingStarted.' + error.message))); });
            }
            return Promise.resolve();
        }).finally(function () {
            _this.processing = false;
            _this.clearCreateAccountMemory();
            if (_this.password) {
                notify(_this.i18n.tr('gettingStarted.Your account has been created'));
                _this.login(true);
            }
            else {
                notify(_this.i18n.tr('gettingStarted.Your account has been created, you can now enter your password to login'));
                _this.goToPassword();
            }
        });
    };
    GettingStarted.prototype.sendValidationCodeAgain = function () {
        var _this = this;
        if (!this.sdLogin.inited)
            throw new Error('SdLogin must be inited before using Getting Started component');
        var type = this.newAccountUsernameAsEmail ? 'email' : 'mobile';
        this.processing = true;
        return this.sdLogin.api.put("/user/resend-code", {
            token: this.sdLogin.state.sdlogin.createAccountValidationToken,
            method: type
        }).then(jsonify).then(function () {
            notify(_this.i18n.tr('gettingStarted.Your code has been sent again'));
        }).catch(function (error) { return errorify(new Error(_this.i18n.tr('gettingStarted.' + error.message))); }).finally(function () {
            _this.processing = false;
        });
    };
    GettingStarted.prototype.cancelAccountCreation = function () {
        this.clearCreateAccountMemory();
        this.goToStart();
    };
    GettingStarted.prototype.goToForgetPassword = function (username) {
        this.forgotUsername = username;
        this.setStep('forgot-password');
    };
    GettingStarted.prototype.requestResetPasswordCode = function () {
        var _this = this;
        this.validationController.reset();
        this.processing = true;
        return this.validationController.validate({ object: this, propertyName: 'forgotUsername' }).then(function (result) {
            if (result.valid) {
                var usernameForApi = _this.prepareUsernameForApi('forgotUsername');
                return _this.sdLogin.checkIfUsernameExists(usernameForApi).then(function (exists) {
                    if (exists === false) {
                        errorify(new Error(_this.i18n.tr('gettingStarted.This username does not exists')));
                    }
                    else if (exists === 'mobile') {
                        _this.goToResetPassword();
                    }
                    else {
                        _this.goToResetPassword();
                    }
                });
            }
            return Promise.resolve();
        }).finally(function () {
            _this.processing = false;
        });
    };
    GettingStarted.prototype.goToResetPassword = function () {
        var _this = this;
        this.sendForgotPasswordCode().then(function () {
            _this.setStep('reset-password');
        });
    };
    GettingStarted.prototype.sendForgotPasswordCode = function () {
        var _this = this;
        if (!this.sdLogin.inited)
            throw new Error('SdLogin must be inited before using Getting Started component');
        this.processing = true;
        var usernameForApi = this.prepareUsernameForApi('forgotUsername');
        return this.sdLogin.requestResetPassword(usernameForApi).then(function () {
            _this.forgotNewPassword = '';
            _this.forgotCode = '';
        }).catch(function (error) { return errorify(new Error(_this.i18n.tr('gettingStarted.' + error.message))); }).finally(function () {
            _this.processing = false;
        });
    };
    GettingStarted.prototype.resetPassword = function () {
        var _this = this;
        if (!this.sdLogin.inited)
            throw new Error('SdLogin must be inited before using Getting Started component');
        this.processing = true;
        this.validationController.reset();
        return Promise.all([
            this.validationController.validate({ object: this, propertyName: 'forgotCode' }),
            this.validationController.validate({ object: this, propertyName: 'forgotNewPassword' }),
        ]).then(function (results) {
            if (results[0].valid && results[1].valid) {
                return _this.sdLogin.resetPassword(_this.forgotCode, _this.forgotNewPassword).then(function () {
                    notifier(_this.i18n.tr('gettingStarted.Your password has been changed! Enter your password again to login'));
                    _this.forgotCode = '';
                    _this.forgotNewPassword = '';
                    _this.username = _this.forgotUsername;
                    _this.setStep('password');
                }).catch(function (error) { return errorify(new Error(_this.i18n.tr('gettingStarted.' + error.message))); });
            }
            return Promise.resolve();
        }).finally(function () {
            _this.processing = false;
        });
    };
    GettingStarted.prototype.goToPostLogin = function () {
        var id = 'account-ready';
        if (this.nbStepPostLogin) {
            var element = this.element.querySelector('ar-next-item[data-gs-id=getting-started-post-login-0]');
            if (element && element.id)
                id = element.id;
        }
        if (this.arNextElement && this.arNextStart) {
            this.arNextStart.to(id);
        }
        this.step = 'post-account';
    };
    GettingStarted.prototype.goToPostAccount = function () {
        if (this.nbStepPostAccount === 0 && this.nbStepPostLogin !== 0) {
            return this.goToPostLogin();
        }
        var id = 'account-ready';
        if (this.nbStepPostAccount) {
            var element = this.element.querySelector('ar-next-item[data-gs-id=getting-started-post-account-0]');
            if (element && element.id)
                id = element.id;
        }
        if (this.arNextElement && this.arNextStart) {
            this.arNextStart.to(id);
        }
        this.step = 'post-account';
    };
    Object.defineProperty(GettingStarted.prototype, "state", {
        get: function () {
            return this.sdLogin ? this.sdLogin.state : {};
        },
        enumerable: false,
        configurable: true
    });
    GettingStarted.prototype.stepChanged = function () {
        history.pushState({ step: this.step }, '');
    };
    GettingStarted.prototype.saveCreateAccountMemory = function (token, tokenExpiry) {
        this.createAccountMemory.firstname = this.firstname;
        this.createAccountMemory.lastname = this.lastname;
        this.createAccountMemory.username = this.newAccountUsername;
        this.createAccountMemory.token = token || undefined;
        this.createAccountMemory.tokenExpiry = tokenExpiry ? moment(tokenExpiry).toString() : undefined;
        this.createAccountMemory.extraData = this.extraData;
        var string = btoa(JSON.stringify(this.createAccountMemory));
        localStorage.setItem('gs-cam', string);
    };
    GettingStarted.prototype.fetchCreateAccountMemory = function () {
        var cam = localStorage.getItem('gs-cam');
        if (cam) {
            try {
                this.createAccountMemory = JSON.parse(atob(cam));
                if (this.createAccountMemory.tokenExpiry) {
                    var expires = moment(this.createAccountMemory.tokenExpiry);
                    if (expires.isAfter(moment())) {
                        this.createAccountMemory.token = undefined;
                        this.createAccountMemory.tokenExpiry = undefined;
                    }
                }
            }
            catch (error) { }
        }
    };
    GettingStarted.prototype.clearCreateAccountMemory = function () {
        localStorage.removeItem('gs-cam');
        this.createAccountMemory = {};
        this.firstname = '';
        this.lastname = '';
        this.newAccountUsername = '';
        this.newAccountPassword = '';
        this.sdLogin.store.dispatch(validateAccountStep, '', '');
    };
    GettingStarted.prototype.continueFromCreateAccountMemory = function () {
        if (!this.createAccountMemory.firstname) {
            return false;
        }
        var step = 'create-account';
        if (this.createAccountMemory.firstname) {
            this.firstname = this.createAccountMemory.firstname;
        }
        if (this.createAccountMemory.lastname) {
            this.lastname = this.createAccountMemory.lastname;
        }
        if (this.createAccountMemory.username) {
            this.newAccountUsername = this.createAccountMemory.username;
            step = 'create-account-part2';
        }
        if (this.createAccountMemory.token) {
            step = 'validate-account';
            this.sdLogin.store.dispatch(validateAccountStep, this.createAccountMemory.token, this.createAccountMemory.tokenExpiry);
        }
        if (this.createAccountMemory.extraData) {
            this.extraData = this.createAccountMemory.extraData;
        }
        this.setStep(step);
        return true;
    };
    var GettingStarted_1;
    __decorate([
        bindable
    ], GettingStarted.prototype, "locales", void 0);
    __decorate([
        bindable
    ], GettingStarted.prototype, "theme", void 0);
    __decorate([
        observable
    ], GettingStarted.prototype, "step", void 0);
    __decorate([
        observable
    ], GettingStarted.prototype, "newAccountUsername", void 0);
    __decorate([
        observable
    ], GettingStarted.prototype, "newAccountUsernameAsEmail", void 0);
    __decorate([
        computedFrom('body.offsetHeight', 'window.innerHeight', 'html.scrollTop')
    ], GettingStarted.prototype, "compensationHeight", null);
    __decorate([
        computedFrom('sdLogin.state')
    ], GettingStarted.prototype, "state", null);
    GettingStarted = GettingStarted_1 = __decorate([
        inject(Element, StyleEngine, SdLogin, I18N, ValidationControllerFactory, DialogService)
    ], GettingStarted);
    return GettingStarted;
}());
export { GettingStarted };
var GettingStartedStartCustomAttribute = /** @class */ (function () {
    function GettingStartedStartCustomAttribute(element) {
        this.element = element;
        this.element = element;
    }
    GettingStartedStartCustomAttribute.prototype.attached = function () {
        var _this = this;
        this.element.addEventListener('click', function () {
            var gsElement = _this.element.closest('.getting-started');
            var elementIsGettingStarted = gsElement &&
                gsElement.au &&
                gsElement.au.controller &&
                gsElement.au.controller.viewModel &&
                gsElement.au.controller.viewModel instanceof GettingStarted;
            if (elementIsGettingStarted) {
                var vm = gsElement.au.controller.viewModel;
                vm.goToStart();
            }
        }, false);
    };
    GettingStartedStartCustomAttribute = __decorate([
        inject(Element)
    ], GettingStartedStartCustomAttribute);
    return GettingStartedStartCustomAttribute;
}());
export { GettingStartedStartCustomAttribute };
var isEmail = function (obj, prop) {
    if (prop === void 0) { prop = 'newAccountUsername'; }
    var rightInstance = obj instanceof GettingStarted;
    if (!rightInstance)
        return false;
    var val = obj[prop];
    if (typeof val === 'string') {
        if (val.match(/^[a-zA-Z](.*)/g)) {
            // username starts with a letter
            return true;
        }
        if (val.indexOf('@') !== -1) {
            // username contains the @ symbol
            return true;
        }
        return false;
    }
    return false;
};
