var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject, bindable, computedFrom, observable, NewInstance } from 'aurelia-framework';
import { StyleEngine } from '@aurelia-ux/core';
import { SwissdataApi } from '../../helpers/swissdata-api';
import { UserModel } from '../../models/user.model';
import { validate, jsonify } from '../../deco';
import { SwissdataLoginFormValidationRenderer } from './swissdata-login-form-validation-renderer';
import { errorHandler, notifier } from '../notification/swissdata-notification';
import { DOM } from 'aurelia-pal';
import { countries } from 'aurelia-resources';
import PhoneNumber from 'awesome-phonenumber';
import { ValidationController, validateTrigger } from 'aurelia-validation';
import { setLoginStep, setSwissdataStateProps } from '../../state/actions';
import { getLogger } from 'aurelia-logging';
// INFO: currently the "account-created" screen is useless because the component
// will immediatly login the user and fire the "login" event when an account is created
var SwissdataLogin = /** @class */ (function () {
    function SwissdataLogin(element, styleEngine, eventAggregator, swissdataApi, forgotPasswordValidationController) {
        var _this = this;
        this.element = element;
        this.styleEngine = styleEngine;
        this.eventAggregator = eventAggregator;
        this.swissdataApi = swissdataApi;
        this.forgotPasswordValidationController = forgotPasswordValidationController;
        this.step = 'login';
        this.requireEmail = true;
        this.requireMobile = true;
        this.processing = false;
        this.loginInput = '';
        this.loginPassword = '';
        this.doubleAuthCode = '';
        this.createAccountPassword = '';
        this.createAccountMobile = '';
        this.createAccountValidation = 'emailOrMobile';
        this.countryCode = 'ch';
        this.countryPrefix = '+41';
        this.phonePlaceholder = '079 000 00 00';
        this.countries = countries;
        this.countrySelectorOpened = false;
        this.countrySearchTerm = '';
        this.validateEmailCode = '';
        this.validateMobileCode = '';
        this.emailValidated = false;
        this.mobileValidated = false;
        this.forgotPasswordEmail = '';
        this.forgotPasswordMobileInput = '';
        this.forgotPasswordMobile = '';
        this.resetPasswordToken = '';
        this.resetPasswordCode = '';
        this.resetPasswordNewPassword = '';
        this.log = getLogger('swissdata-login');
        this.forgotPasswordValidationController.trigger = validateTrigger.change;
        validate.ValidationRules
            .ensure('forgotPasswordMobileInput').displayName('Mobile').satisfies(function (value, object) {
            _this.forgotPasswordMobileInput = '';
            var number = new PhoneNumber(value, _this.countryCode);
            if (!number.isValid())
                return false;
            if (!number.isPossible())
                return false;
            if (!number.isMobile())
                return false;
            _this.forgotPasswordMobileInput = number.getNumber('national');
            _this.forgotPasswordMobile = number.getNumber();
            return true;
        }).withMessage('Mobile phone is invalid')
            .on(this);
        this.forgotPasswordValidationController.addObject(this);
        this.forgotPasswordValidationController.addRenderer(new SwissdataLoginFormValidationRenderer());
    }
    SwissdataLogin.prototype.bind = function () {
        this.themeChanged(this.theme);
    };
    SwissdataLogin.prototype.attached = function () {
        var _this = this;
        this.swissdataApi.isReady().then(function () {
            _this.step = _this.swissdataApi.state.swissdata.loginStep || 'login';
            return _this.swissdataApi.store.dispatch(setLoginStep, _this.step);
        }).then(function () {
            _this.fixInputs();
            var storedInput = localStorage.getItem(_this.swissdataApi.state.swissdata.publicKey + "-login-input");
            if (storedInput) {
                _this.loginInput = storedInput;
                setTimeout(function () {
                    _this.loginInput = storedInput;
                    _this.stepChanged();
                }, 2000);
            }
        });
        this.subscription = this.eventAggregator.subscribe('swissdata-login.goto-step', function (data) {
            var allowedSteps = ['login', 'double-auth', 'create-account', 'validate-account', 'account-created', 'forgot-password', 'reset-password'];
            if (allowedSteps.indexOf(data) !== -1) {
                _this.step = data;
            }
        });
    };
    SwissdataLogin.prototype.detached = function () {
        if (this.subscription)
            this.subscription.dispose();
    };
    SwissdataLogin.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'swissdata-login';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    SwissdataLogin.prototype.startCreateAccount = function () { this.step = 'create-account'; };
    SwissdataLogin.prototype.startForgotPassword = function () { this.step = 'forgot-password'; };
    SwissdataLogin.prototype.stepChanged = function () {
        var _this = this;
        this.swissdataApi.state.swissdata.loginStep = this.step;
        if (this.step === 'login') {
            // focus on userinput field if empty or password otherwise
            this.focusLoginField();
        }
        if (this.step === 'double-auth') {
        }
        if (this.step === 'create-account') {
            if (!this.newAccountInstance) {
                this.newAccountInstance = new UserModel();
                validate.ValidationRules
                    .ensure('createAccountPassword').displayName('Password').required().minLength(10)
                    .ensure('createAccountMobile').displayName('Mobile').required().then().satisfies(function (value, object) {
                    _this.newAccountInstance.mobile = ''; // reset the mobile value, will be set to the final number if validated
                    var number = new PhoneNumber(value, _this.countryCode);
                    if (!number.isValid())
                        return false;
                    if (!number.isPossible())
                        return false;
                    if (!number.isMobile())
                        return false;
                    _this.createAccountMobile = number.getNumber('national');
                    _this.newAccountInstance.mobile = number.getNumber();
                    return true;
                    //let mobileIsValid = StringHelpers.validatePhoneNumber(value);
                    //return mobileIsValid !== false;
                }).withMessage('Mobile phone is invalid')
                    .on(this);
                this.newAccountInstance.validationController.addObject(this);
                this.newAccountInstance.validationController.addObject(this.newAccountInstance);
                this.newAccountInstance.validationController.addRenderer(new SwissdataLoginFormValidationRenderer());
            }
            if (this.swissdataApi.state.swissdata.newAccountInstance) {
                this.newAccountInstance.updateInstanceFromElement(this.swissdataApi.state.swissdata.newAccountInstance);
            }
            if (this.swissdataApi.state.swissdata.newAccountPhone) {
                this.countryCode = this.swissdataApi.state.swissdata.newAccountPhone.countryCode;
                this.countryPrefix = this.swissdataApi.state.swissdata.newAccountPhone.countryPrefix;
                this.createAccountMobile = this.swissdataApi.state.swissdata.newAccountPhone.number;
                this.phonePlaceholder = this.swissdataApi.state.swissdata.newAccountPhone.placeholder;
            }
        }
        if (this.step === 'validate-account') {
            if (!this.newAccountInstance) {
                this.newAccountInstance = new UserModel();
                if (this.swissdataApi.state.swissdata.newAccountInstance) {
                    this.newAccountInstance.updateInstanceFromElement(this.swissdataApi.state.swissdata.newAccountInstance);
                }
            }
        }
        if (this.step === 'reset-password') {
            this.swissdataApi.store.dispatch(setSwissdataStateProps, { resetPasswordToken: this.resetPasswordToken });
            if (!this.resetPasswordToken && this.swissdataApi.state.swissdata.resetPasswordToken) {
                this.resetPasswordToken = this.swissdataApi.state.swissdata.resetPasswordToken;
            }
        }
        return this.swissdataApi.store.dispatch(setLoginStep, this.step);
    };
    SwissdataLogin.prototype.focusLoginField = function () {
        var _this = this;
        setTimeout(function () {
            var inputElement;
            if (_this.loginInput) {
                inputElement = _this.element.querySelector('.swissdata-login-step.login').querySelector('ux-input[type=password]');
            }
            else {
                inputElement = _this.element.querySelector('.swissdata-login-step.login').querySelector('ux-input');
            }
            if (inputElement) {
                inputElement.focus();
            }
            _this.fixInputs();
        }, 100);
    };
    SwissdataLogin.prototype.resetStep = function () {
        if (this.step === 'login') {
            this.loginInput = '';
            this.loginPassword = '';
        }
        else if (this.step === 'double-auth') {
            this.doubleAuthCode = '';
        }
        else if (this.step === 'create-account') {
            this.createAccountPassword = '';
        }
        else if (this.step === 'validate-account') {
            this.validateEmailCode = '';
            this.validateMobileCode = '';
        }
        else if (this.step === 'forgot-password') {
            this.forgotPasswordEmail = '';
            this.forgotPasswordMobileInput = '';
            this.forgotPasswordMobile = '';
        }
        else if (this.step === 'reset-password') {
            this.resetPasswordCode = '';
        }
    };
    SwissdataLogin.prototype.backToLogin = function () {
        this.step = 'login';
    };
    SwissdataLogin.prototype.fixInputs = function () {
        var elements = document.querySelectorAll('swissdata-login');
        for (var index = 0; index < elements.length; index++) {
            var element = elements.item(index);
            var inputs = element.getElementsByTagName('INPUT');
            var _loop_1 = function (index2) {
                var input = inputs.item(index2);
                if (input instanceof HTMLInputElement)
                    return "continue";
                if (input.getAttribute('type') && input.getAttribute('type') !== 'text')
                    return { value: void 0 };
                input.setAttribute('autocorrect', 'off');
                input.setAttribute('autocomplete', 'nope');
                input.setAttribute('autocapitalize', 'none');
                var value = input.value;
                input.value = value + ' ';
                setTimeout(function () {
                    input.value = value;
                }, 100);
            };
            for (var index2 = 0; index < inputs.length; index++) {
                var state_1 = _loop_1(index2);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
    };
    SwissdataLogin.prototype.login = function () {
        var _this = this;
        this.processing = true;
        localStorage.setItem(this.swissdataApi.state.swissdata.publicKey + "-login-input", this.loginInput);
        this.swissdataApi.authenticate(this.loginInput, this.loginPassword).then(function () {
            _this.processing = false;
            if (_this.swissdataApi.state.swissdata.authenticated) {
                _this.loginOk();
            }
            else if (_this.swissdataApi.state.swissdata.requireDoubleAuthValidation) {
                _this.step = 'double-auth';
            }
        }).catch(function (error) {
            _this.processing = false;
            errorHandler('login.login', { hideOnClick: false, clearHandlerWhenIntercepted: true })(error);
        });
    };
    SwissdataLogin.prototype.doubleAuth = function () {
        var _this = this;
        this.processing = true;
        this.swissdataApi.doubleAuth(this.doubleAuthCode).then(function () {
            _this.processing = false;
            if (_this.swissdataApi.state.swissdata.authenticated) {
                _this.loginOk();
                _this.swissdataApi.state.swissdata.requireDoubleAuthValidation = false;
                _this.step = 'login';
            }
        }).catch(function (error) {
            _this.processing = false;
            errorHandler('login.double-auth', { hideOnClick: false, clearHandlerWhenIntercepted: true })(error);
        });
    };
    SwissdataLogin.prototype.loginOk = function () {
        var data = {
            accessToken: this.swissdataApi.state.swissdata.accessToken,
            user: this.swissdataApi.state.swissdata.user
        };
        this.eventAggregator.publish('swissdata:login', data);
        this.eventAggregator.publish('swissdata-login', data);
        var event = DOM.createCustomEvent('login', { bubbles: true, detail: data });
        this.element.dispatchEvent(event);
    };
    SwissdataLogin.prototype.createAccount = function () {
        var _this = this;
        this.newAccountInstance.validationController.validate().then(function (result) {
            if (!result || !result.valid) {
                // validation failed, but it can be that the mobile is not required and validation failed only for mobile (or same for email).
                for (var _i = 0, _a = result.results; _i < _a.length; _i++) {
                    var r = _a[_i];
                    if (r.valid)
                        continue;
                    if (r.propertyName === 'mobile' && !_this.requireMobile)
                        continue;
                    if (r.propertyName === 'createAccountMobile' && !_this.requireMobile)
                        continue;
                    if (r.propertyName === 'email' && !_this.requireEmail)
                        continue;
                    // if we arrive here, it means we have a failed validation for a required field
                    return Promise.resolve(null);
                }
                // if we arrive here, it's good news, what failed was not required. We can go on...
            }
            _this.processing = true;
            _this.eventAggregator.publish('analytics:event', { category: 'login', action: 'create-account', value: { email: _this.newAccountInstance.email, mobile: _this.newAccountInstance.mobile } });
            return _this.newAccountInstance.createAccount({ body: { password: _this.createAccountPassword } });
        }).then(function (element) {
            if (!element)
                return Promise.resolve(null);
            _this.processing = false;
            if (element.token) {
                _this.createAccountValidation = element.createAccountValidation;
                // go to validation screen
                _this.step = 'validate-account';
                return _this.swissdataApi.store.dispatch(setSwissdataStateProps, { createAccountValidationToken: element.token, newAccountInstance: _this.newAccountInstance });
                //this.swissdataApi.state.swissdata.createAccountValidationToken = element.token;
            }
            else if (element.firstname) {
                // user is correctly created, go to confirmation screen
                // info: we don't go to confirmation screen, we login the user
                if (element.id) {
                    _this.eventAggregator.publish('analytics:event', { category: 'login', action: 'validate-account', value: { userId: element.id } });
                }
                _this.loginInput = element.email || element.mobile;
                _this.loginPassword = _this.createAccountPassword;
                setTimeout(function () {
                    _this.step = 'login';
                }, 500);
                return _this.login();
                //this.step = 'account-created';
            }
        }).then(function () {
            _this.log.info('End of create-account process');
            _this.log.info('this.step', _this.step);
        }).catch(function (error) {
            _this.processing = false;
            errorHandler('login.create-account', { hideOnClick: false, clearHandlerWhenIntercepted: true })(error);
        });
    };
    SwissdataLogin.prototype.saveNewAccountInstanceInState = function () {
        return this.swissdataApi.store.dispatch(setSwissdataStateProps, { newAccountInstance: this.newAccountInstance });
    };
    Object.defineProperty(SwissdataLogin.prototype, "countryCodeFlag", {
        get: function () {
            return "svg-country-flags/png100px/" + this.countryCode + ".png";
        },
        enumerable: false,
        configurable: true
    });
    /*
      mobileChanged() {
        let ayt = PhoneNumber.getAsYouType( this.countryCode );
        ayt.reset(this.newAccountInstance.mobile);
        let number = ayt.number();
        if (number !== this.newAccountInstance.mobile) this.newAccountInstance.mobile = number;
      }
    */
    SwissdataLogin.prototype.selectCountry = function (country) {
        this.countryCode = country.countryCode2.toLowerCase();
        this.countrySelectorOpened = false;
        this.countrySearchTerm = '';
        this.countryPrefix = '+' + PhoneNumber.getCountryCodeForRegionCode(this.countryCode).toString();
        this.phonePlaceholder = PhoneNumber.getExample(this.countryCode, 'mobile').getNumber('national');
        var number = new PhoneNumber(this.newAccountInstance.mobile, this.countryCode);
        if (!number.isValid()) {
            this.newAccountInstance.mobile = '';
        }
        this.saveNewAccountPhoneInState();
    };
    SwissdataLogin.prototype.closeCountrySelector = function () {
        this.countrySelectorOpened = false;
        this.countrySearchTerm = '';
        return false;
    };
    SwissdataLogin.prototype.saveNewAccountPhoneInState = function () {
        this.swissdataApi.store.dispatch(setSwissdataStateProps, { newAccountPhone: {
                countryCode: this.countryCode,
                countryPrefix: this.countryPrefix,
                placeholder: this.phonePlaceholder,
                number: this.createAccountMobile
            } });
    };
    SwissdataLogin.prototype.validateEmail = function () {
        var _this = this;
        if (!this.validateEmailCode || this.validateEmailCode.length !== 6) {
            errorHandler('login.validate-email', { hideOnClick: false, clearHandlerWhenIntercepted: true })(new Error('The code must be 6 digits'));
            return;
        }
        this.processing = false;
        return this.newAccountInstance.validAccountCreationToken('email', this.swissdataApi.state.swissdata.createAccountValidationToken, this.validateEmailCode).then(function (element) {
            _this.processing = false;
            _this.processValidationResponse(element);
        }).catch(function (error) {
            _this.processing = false;
            errorHandler('login.validate-email', { hideOnClick: false, clearHandlerWhenIntercepted: true })(error);
        });
    };
    SwissdataLogin.prototype.validateMobile = function () {
        var _this = this;
        if (!this.validateMobileCode || this.validateMobileCode.length !== 6) {
            errorHandler('login.validate-mobile', { hideOnClick: false, clearHandlerWhenIntercepted: true })(new Error('The code must be 6 digits'));
            return;
        }
        this.processing = false;
        return this.newAccountInstance.validAccountCreationToken('mobile', this.swissdataApi.state.swissdata.createAccountValidationToken, this.validateMobileCode).then(function (element) {
            _this.processing = false;
            _this.processValidationResponse(element);
        }).catch(function (error) {
            _this.processing = false;
            errorHandler('login.validate-mobile', { hideOnClick: false, clearHandlerWhenIntercepted: true })(error);
        });
    };
    SwissdataLogin.prototype.resendCode = function (method) {
        return this.swissdataApi.put("/user/resend-code", {
            token: this.swissdataApi.state.swissdata.createAccountValidationToken,
            method: method
        }).then(jsonify).then(function () {
            notifier('login.validate-' + method, { lifetime: 10000, hideOnClick: true })('', 'login.Your code has been sent again', 'confirmation');
        }).catch(errorHandler('login.validate-' + method));
    };
    SwissdataLogin.prototype.processValidationResponse = function (response) {
        // the emailValidated and mobileValidated properties are both in token and user response
        this.emailValidated = response.emailValidated;
        this.mobileValidated = response.mobileValidated;
        if (response.createAccountValidation)
            this.createAccountValidation = response.createAccountValidation;
        if (response.firstname) {
            // we have a user
            if (response.id) {
                this.eventAggregator.publish('analytics:event', { category: 'login', action: 'validated-account', value: { userId: response.id } });
            }
            if (!response.email || !response.mobile || this.createAccountValidation === 'emailOnly' || this.createAccountValidation === 'mobileOnly') {
                // we have enough validation, confirm screen
                this.goToAccountCreatedScreen();
            }
            else if (this.emailValidated && this.mobileValidated) {
                // we have enough validation, confirm screen
                this.goToAccountCreatedScreen();
            }
        }
    };
    SwissdataLogin.prototype.skipSecondValidation = function () {
        if (this.createAccountValidation === 'emailOrMobile' && (this.emailValidated || this.mobileValidated)) {
            this.goToAccountCreatedScreen();
        }
    };
    SwissdataLogin.prototype.goToAccountCreatedScreen = function () {
        this.validateMobileCode = '';
        this.validateEmailCode = '';
        this.step = 'account-created';
        //this.swissdataApi.state.swissdata.createAccountValidationToken = '';
        return this.swissdataApi.store.dispatch(setSwissdataStateProps, { createAccountValidationToken: '', newAccountInstance: null });
    };
    SwissdataLogin.prototype.requestResetPassword = function () {
        var _this = this;
        var forgotPasswordInput = this.forgotPasswordEmail || this.forgotPasswordMobile;
        if (!forgotPasswordInput)
            return;
        this.processing = true;
        this.swissdataApi.requestResetPassword(forgotPasswordInput).then(function (token) {
            if (!token)
                throw new Error('Invalid request');
            _this.resetPasswordToken = token.token;
            _this.swissdataApi.store.dispatch(setSwissdataStateProps, { resetPasswordToken: _this.resetPasswordToken });
            _this.processing = false;
            _this.step = 'reset-password';
        }).catch(function (error) {
            _this.processing = false;
            errorHandler('login.forgot-password', { hideOnClick: false, clearHandlerWhenIntercepted: true })(error);
        });
    };
    SwissdataLogin.prototype.forgotPasswordEmailChanged = function () {
        if (this.forgotPasswordEmail) {
            this.forgotPasswordMobile = '';
            this.forgotPasswordMobileInput = '';
        }
    };
    SwissdataLogin.prototype.forgotPasswordMobileInputChanged = function () {
        if (this.forgotPasswordMobileInput)
            this.forgotPasswordEmail = '';
    };
    SwissdataLogin.prototype.stopForgotPassword = function () {
        this.step = 'login';
    };
    SwissdataLogin.prototype.resetPassword = function () {
        var _this = this;
        if (!this.resetPasswordCode)
            return;
        if (!this.resetPasswordNewPassword)
            return;
        this.processing = true;
        this.swissdataApi.resetPassword(this.resetPasswordToken, this.resetPasswordCode, this.resetPasswordNewPassword).then(function () {
            _this.processing = false;
            _this.resetPasswordToken = '';
            _this.resetPasswordCode = '';
            _this.resetPasswordNewPassword = '';
            _this.step = 'login';
            setTimeout(function () {
                notifier('login.login', { lifetime: 0, hideOnClick: false })('', 'login.Your password has been reset, you can now safely login with your new password', 'confirmation');
            }, 200);
        }).catch(function (error) {
            _this.processing = false;
            errorHandler('login.reset-password', { hideOnClick: false, clearHandlerWhenIntercepted: true })(error);
        });
    };
    __decorate([
        bindable
    ], SwissdataLogin.prototype, "theme", void 0);
    __decorate([
        bindable
    ], SwissdataLogin.prototype, "step", void 0);
    __decorate([
        bindable
    ], SwissdataLogin.prototype, "requireEmail", void 0);
    __decorate([
        bindable
    ], SwissdataLogin.prototype, "requireMobile", void 0);
    __decorate([
        observable
    ], SwissdataLogin.prototype, "forgotPasswordEmail", void 0);
    __decorate([
        observable
    ], SwissdataLogin.prototype, "forgotPasswordMobileInput", void 0);
    __decorate([
        observable
    ], SwissdataLogin.prototype, "forgotPasswordMobile", void 0);
    __decorate([
        computedFrom('countryCode')
    ], SwissdataLogin.prototype, "countryCodeFlag", null);
    SwissdataLogin = __decorate([
        inject(Element, StyleEngine, EventAggregator, SwissdataApi, NewInstance.of(ValidationController))
    ], SwissdataLogin);
    return SwissdataLogin;
}());
export { SwissdataLogin };
var FilterCountriesValueConverter = /** @class */ (function () {
    function FilterCountriesValueConverter() {
    }
    FilterCountriesValueConverter.prototype.toView = function (list, term) {
        if (!term)
            return list;
        var newList = [];
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            if (item.name.toLowerCase().indexOf(term.toLowerCase()) !== -1)
                newList.push(item);
        }
        return newList;
    };
    return FilterCountriesValueConverter;
}());
export { FilterCountriesValueConverter };
