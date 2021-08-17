import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { inject, bindable, Container, computedFrom, observable, NewInstance } from 'aurelia-framework';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { SwissdataLoginTheme } from './swissdata-login-theme';
import { SwissdataApi } from '../../helpers/swissdata-api';
import { UserModel } from '../../models/user.model';
import { validate, jsonify } from '../../deco';
import { SwissdataLoginFormValidationRenderer } from './swissdata-login-form-validation-renderer';
import { errorHandler, notifier } from '../notification/swissdata-notification';
import { DOM } from 'aurelia-pal';
import { countries }  from 'aurelia-resources';
import PhoneNumber from 'awesome-phonenumber';
import { ValidationController, validateTrigger } from 'aurelia-validation';
import { setLoginStep, setSwissdataStateProps } from '../../state/actions';
import { Logger, getLogger } from 'aurelia-logging';

// INFO: currently the "account-created" screen is useless because the component
// will immediatly login the user and fire the "login" event when an account is created

@inject(Element, StyleEngine, EventAggregator, SwissdataApi, NewInstance.of(ValidationController))
export class SwissdataLogin implements UxComponent {

  @bindable theme: SwissdataLoginTheme;
  @bindable step: 'login' | 'double-auth' | 'create-account' | 'validate-account' | 'account-created' | 'forgot-password' | 'reset-password' = 'login';
  @bindable requireEmail: boolean = true;
  @bindable requireMobile: boolean = true;

  processing: boolean = false;

  loginInput: string = '';
  loginPassword: string = '';

  doubleAuthCode: string = '';

  newAccountInstance: UserModel;
  createAccountPassword: string = '';
  createAccountMobile: string = '';
  createAccountValidation: 'emailOrMobile' | 'emailAndMobile' | 'emailOnly' | 'mobileOnly' | 'none' = 'emailOrMobile';
  private countryCode: string = 'ch';
  private countryPrefix: string = '+41';
  private phonePlaceholder: string = '079 000 00 00';
  private countries = countries;
  private countrySelectorOpened: boolean = false;
  private countrySearchTerm: string = '';

  validateEmailCode: string = '';
  validateMobileCode: string = '';
  emailValidated: boolean = false;
  mobileValidated: boolean = false;

  @observable forgotPasswordEmail: string = '';
  @observable forgotPasswordMobileInput: string = '';
  @observable forgotPasswordMobile: string = '';

  resetPasswordToken: string = '';
  resetPasswordCode: string = '';
  resetPasswordNewPassword: string = '';

  subscription: Subscription;

  private log: Logger;

  constructor(public element: HTMLElement, private styleEngine: StyleEngine, private eventAggregator: EventAggregator, private swissdataApi: SwissdataApi, private forgotPasswordValidationController){
    this.log = getLogger('swissdata-login');
    this.forgotPasswordValidationController.trigger = validateTrigger.change;
    validate.ValidationRules
      .ensure('forgotPasswordMobileInput').displayName('Mobile').satisfies((value: any, object: {}) => {
        this.forgotPasswordMobileInput = '';
        let number = new PhoneNumber( value, this.countryCode );
        if (!number.isValid()) return false;
        if (!number.isPossible()) return false;
        if (!number.isMobile()) return false;
        this.forgotPasswordMobileInput = number.getNumber('national');
        this.forgotPasswordMobile = number.getNumber();
        return true;
      }).withMessage('Mobile phone is invalid')
      .on(this);
    this.forgotPasswordValidationController.addObject(this);
    this.forgotPasswordValidationController.addRenderer(new SwissdataLoginFormValidationRenderer());
  }

  public bind() {
    this.themeChanged(this.theme);
  }

  public attached() {
    this.swissdataApi.isReady().then(() => {
      this.step = this.swissdataApi.state.swissdata.loginStep || 'login';
      return this.swissdataApi.store.dispatch(setLoginStep, this.step);
    }).then(() => {
      this.fixInputs();
      let storedInput = localStorage.getItem(`${this.swissdataApi.state.swissdata.publicKey}-login-input`);
      if (storedInput) {
        this.loginInput = storedInput;
        setTimeout(() => {
          this.loginInput = storedInput;
          this.stepChanged();
        }, 2000);
      }
    });
    this.subscription = this.eventAggregator.subscribe('swissdata-login.goto-step', (data) => {
      let allowedSteps = ['login', 'double-auth', 'create-account', 'validate-account', 'account-created', 'forgot-password', 'reset-password' ];
      if (allowedSteps.indexOf(data) !== -1) {
        this.step = data;
      }
    })
  }

  public detached() {
    if (this.subscription) this.subscription.dispose();
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'swissdata-login';
    }
    this.styleEngine.applyTheme(newValue, this.element);
  }

  public startCreateAccount() { this.step = 'create-account' }
  public startForgotPassword() { this.step = 'forgot-password' }

  public stepChanged() {
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
          .ensure('createAccountMobile').displayName('Mobile').required().then().satisfies((value: any, object: {}) => {
            this.newAccountInstance.mobile = ''; // reset the mobile value, will be set to the final number if validated
            let number = new PhoneNumber( value, this.countryCode );
            if (!number.isValid()) return false;
            if (!number.isPossible()) return false;
            if (!number.isMobile()) return false;
            this.createAccountMobile = number.getNumber('national');
            this.newAccountInstance.mobile = number.getNumber();
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
      this.swissdataApi.store.dispatch(setSwissdataStateProps, {resetPasswordToken: this.resetPasswordToken});
      if (!this.resetPasswordToken && this.swissdataApi.state.swissdata.resetPasswordToken) {
        this.resetPasswordToken = this.swissdataApi.state.swissdata.resetPasswordToken;
      }
    }
    return this.swissdataApi.store.dispatch(setLoginStep, this.step);
  }

  focusLoginField() {
    setTimeout(() => {
      let inputElement;
      if (this.loginInput) {
        inputElement = this.element.querySelector('.swissdata-login-step.login').querySelector('ux-input[type=password]');
        } else {
          inputElement = this.element.querySelector('.swissdata-login-step.login').querySelector('ux-input');
        }
        if (inputElement) {
          (inputElement as HTMLInputElement).focus();
        }
        this.fixInputs();
      }, 100);
  }

  public resetStep() {
    if (this.step === 'login') {
      this.loginInput = '';
      this.loginPassword = '';
    } else if (this.step === 'double-auth') {
      this.doubleAuthCode = '';
    } else if (this.step === 'create-account') {
      this.createAccountPassword = '';
    } else if (this.step === 'validate-account') {
      this.validateEmailCode = '';
      this.validateMobileCode = '';
    } else if (this.step === 'forgot-password') {
      this.forgotPasswordEmail = '';
      this.forgotPasswordMobileInput = '';
      this.forgotPasswordMobile = '';
    } else if (this.step === 'reset-password') {
      this.resetPasswordCode = '';
    }
  }

  public backToLogin() {
    this.step = 'login';
  }

  fixInputs() {
    let elements = document.querySelectorAll('swissdata-login');
    for (let index = 0; index < elements.length; index++) {
      let element = elements.item(index);
      let inputs = element.getElementsByTagName('INPUT');
      for (let index2 = 0; index < inputs.length; index++) {
        let input = inputs.item(index2);
        if (input ! instanceof HTMLInputElement) continue;
        if (input.getAttribute('type') && input.getAttribute('type') !== 'text') return;
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('autocomplete', 'nope');
        input.setAttribute('autocapitalize', 'none');
        let value = (input as HTMLInputElement).value;
        (input as HTMLInputElement).value = value + ' ';
        setTimeout(() => {
          (input as HTMLInputElement).value = value;
        }, 100);
      }
    }
  }

  login() {
    this.processing = true;
    localStorage.setItem(`${this.swissdataApi.state.swissdata.publicKey}-login-input`, this.loginInput);
    this.swissdataApi.authenticate(this.loginInput, this.loginPassword).then(() => {
      this.processing = false;
      if (this.swissdataApi.state.swissdata.authenticated) {
        this.loginOk();
      } else if (this.swissdataApi.state.swissdata.requireDoubleAuthValidation) {
        this.step = 'double-auth';
      }
    }).catch((error) => {
      this.processing = false;
      errorHandler('login.login', {hideOnClick: false, clearHandlerWhenIntercepted: true})(error);
    });
  }

  doubleAuth() {
    this.processing = true;
    this.swissdataApi.doubleAuth(this.doubleAuthCode).then(() => {
      this.processing = false;
      if (this.swissdataApi.state.swissdata.authenticated) {
        this.loginOk();
        this.swissdataApi.state.swissdata.requireDoubleAuthValidation = false;
        this.step = 'login';
      }
    }).catch((error) => {
      this.processing = false;
      errorHandler('login.double-auth', {hideOnClick: false, clearHandlerWhenIntercepted: true})(error);
    });
  }

  loginOk() {
    let data = {
      accessToken: this.swissdataApi.state.swissdata.accessToken,
      user: this.swissdataApi.state.swissdata.user
    }
    this.eventAggregator.publish('swissdata:login', data);
    this.eventAggregator.publish('swissdata-login', data);
    let event = DOM.createCustomEvent('login', { bubbles: true, detail: data });
    this.element.dispatchEvent(event);
  }

  createAccount() {
    this.newAccountInstance.validationController.validate().then((result) => {
      if (!result || !result.valid) {
        // validation failed, but it can be that the mobile is not required and validation failed only for mobile (or same for email).
        for (let r of result.results) {
          if (r.valid) continue;
          if (r.propertyName === 'mobile' && !this.requireMobile) continue;
          if (r.propertyName === 'createAccountMobile' && !this.requireMobile) continue;
          if (r.propertyName === 'email' && !this.requireEmail) continue;
          // if we arrive here, it means we have a failed validation for a required field
          return Promise.resolve(null);
        }
        // if we arrive here, it's good news, what failed was not required. We can go on...
      }
      this.processing = true;
      this.eventAggregator.publish('analytics:event', {category: 'login', action: 'create-account', value: {email: this.newAccountInstance.email, mobile: this.newAccountInstance.mobile}});
      return this.newAccountInstance.createAccount({body: {password: this.createAccountPassword}});
    }).then((element): void | Promise<any> => {
      if (!element) return Promise.resolve(null);
      this.processing = false;
      if (element.token) {
        this.createAccountValidation = element.createAccountValidation;
        // go to validation screen
        this.step = 'validate-account';
        return this.swissdataApi.store.dispatch(setSwissdataStateProps, {createAccountValidationToken: element.token, newAccountInstance: this.newAccountInstance});
        //this.swissdataApi.state.swissdata.createAccountValidationToken = element.token;
      } else if (element.firstname) {
        // user is correctly created, go to confirmation screen
        // info: we don't go to confirmation screen, we login the user
        if (element.id) {
          this.eventAggregator.publish('analytics:event', {category: 'login', action: 'validate-account', value: {userId: element.id}});
        }
        this.loginInput = element.email || element.mobile;
        this.loginPassword = this.createAccountPassword;
        setTimeout(() => {
          this.step = 'login';
        }, 500);
        return this.login();
        //this.step = 'account-created';
      }
    }).then(() => {
      this.log.info('End of create-account process');
      this.log.info('this.step', this.step);
    }).catch((error) => {
      this.processing = false;
      errorHandler('login.create-account', {hideOnClick: false, clearHandlerWhenIntercepted: true})(error);
    });
  }

  saveNewAccountInstanceInState() {
    return this.swissdataApi.store.dispatch(setSwissdataStateProps, {newAccountInstance: this.newAccountInstance});
  }

  @computedFrom('countryCode')
  get countryCodeFlag() {
    return `svg-country-flags/png100px/${this.countryCode}.png`;
  }
/*
  mobileChanged() {
    let ayt = PhoneNumber.getAsYouType( this.countryCode );
    ayt.reset(this.newAccountInstance.mobile);
    let number = ayt.number();
    if (number !== this.newAccountInstance.mobile) this.newAccountInstance.mobile = number;
  }
*/
  selectCountry(country: any) {
    this.countryCode = country.countryCode2.toLowerCase();
    this.countrySelectorOpened = false;
    this.countrySearchTerm = '';
    this.countryPrefix = '+' + PhoneNumber.getCountryCodeForRegionCode(this.countryCode).toString();
    this.phonePlaceholder = PhoneNumber.getExample( this.countryCode, 'mobile' ).getNumber( 'national' );
    let number = new PhoneNumber( this.newAccountInstance.mobile, this.countryCode );
    if (!number.isValid()) {
      this.newAccountInstance.mobile = '';
    }
    this.saveNewAccountPhoneInState();
  }

  closeCountrySelector() {
    this.countrySelectorOpened = false;
    this.countrySearchTerm = '';
    return false;
  }

  saveNewAccountPhoneInState() {
    this.swissdataApi.store.dispatch(setSwissdataStateProps, {newAccountPhone: {
      countryCode: this.countryCode,
      countryPrefix: this.countryPrefix,
      placeholder: this.phonePlaceholder,
      number: this.createAccountMobile
    }});
  }

  validateEmail(): any {
    if (!this.validateEmailCode || this.validateEmailCode.length !== 6) {
      errorHandler('login.validate-email', {hideOnClick: false, clearHandlerWhenIntercepted: true})(new Error('The code must be 6 digits'));
      return;
    }
    this.processing = false;
    return this.newAccountInstance.validAccountCreationToken('email', this.swissdataApi.state.swissdata.createAccountValidationToken, this.validateEmailCode).then((element) => {
      this.processing = false;
      this.processValidationResponse(element);
    }).catch((error) => {
      this.processing = false;
      errorHandler('login.validate-email', {hideOnClick: false, clearHandlerWhenIntercepted: true})(error);
    });
  }

  validateMobile(): any {
    if (!this.validateMobileCode || this.validateMobileCode.length !== 6) {
      errorHandler('login.validate-mobile', {hideOnClick: false, clearHandlerWhenIntercepted: true})(new Error('The code must be 6 digits'));
      return;
    }
    this.processing = false;
    return this.newAccountInstance.validAccountCreationToken('mobile', this.swissdataApi.state.swissdata.createAccountValidationToken, this.validateMobileCode).then((element) => {
      this.processing = false;
      this.processValidationResponse(element);
    }).catch((error) => {
      this.processing = false;
      errorHandler('login.validate-mobile', {hideOnClick: false, clearHandlerWhenIntercepted: true})(error);
    });
  }

  resendCode(method: 'email' | 'mobile') {
    return this.swissdataApi.put(`/user/resend-code`, {
      token: this.swissdataApi.state.swissdata.createAccountValidationToken,
      method: method
    }).then(jsonify).then(() => {
      notifier('login.validate-' + method, {lifetime: 10000, hideOnClick: true})('', 'login.Your code has been sent again', 'confirmation')
    }).catch(errorHandler('login.validate-' + method));
  }

  processValidationResponse(response: any) {
    // the emailValidated and mobileValidated properties are both in token and user response
    this.emailValidated = response.emailValidated;
    this.mobileValidated = response.mobileValidated;
    if (response.createAccountValidation) this.createAccountValidation = response.createAccountValidation;
    if (response.firstname) {
      // we have a user
      if (response.id) {
        this.eventAggregator.publish('analytics:event', {category: 'login', action: 'validated-account', value: {userId: response.id}});
      }
      if (!response.email || !response.mobile || this.createAccountValidation === 'emailOnly' || this.createAccountValidation === 'mobileOnly') {
        // we have enough validation, confirm screen
        this.goToAccountCreatedScreen();
      } else if (this.emailValidated && this.mobileValidated) {
        // we have enough validation, confirm screen
        this.goToAccountCreatedScreen();
      }
    }
  }

  skipSecondValidation() {
    if (this.createAccountValidation === 'emailOrMobile' && (this.emailValidated || this.mobileValidated)) {
      this.goToAccountCreatedScreen();
    }
  }

  goToAccountCreatedScreen() {
    this.validateMobileCode = '';
    this.validateEmailCode = '';
    this.step = 'account-created';
    //this.swissdataApi.state.swissdata.createAccountValidationToken = '';
    return this.swissdataApi.store.dispatch(setSwissdataStateProps, {createAccountValidationToken: '', newAccountInstance: null});
  }

  requestResetPassword() {
    let forgotPasswordInput = this.forgotPasswordEmail || this.forgotPasswordMobile;
    if (!forgotPasswordInput) return;

    this.processing = true;
    this.swissdataApi.requestResetPassword(forgotPasswordInput).then((token) => {
      if (!token) throw new Error('Invalid request');
      this.resetPasswordToken = token.token;
      this.swissdataApi.store.dispatch(setSwissdataStateProps, {resetPasswordToken: this.resetPasswordToken});
      this.processing = false;
      this.step = 'reset-password';
    }).catch((error) => {
      this.processing = false;
      errorHandler('login.forgot-password', {hideOnClick: false, clearHandlerWhenIntercepted: true})(error);
    });
  }

  forgotPasswordEmailChanged() {
    if (this.forgotPasswordEmail) {
      this.forgotPasswordMobile = '';
      this.forgotPasswordMobileInput = '';
    }
  }
  forgotPasswordMobileInputChanged() {
    if (this.forgotPasswordMobileInput) this.forgotPasswordEmail = '';
  }

  stopForgotPassword() {
    this.step = 'login';
  }

  resetPassword() {
    if (!this.resetPasswordCode) return;
    if (!this.resetPasswordNewPassword) return;
    this.processing = true;
    this.swissdataApi.resetPassword(this.resetPasswordToken, this.resetPasswordCode, this.resetPasswordNewPassword).then(() => {
      this.processing = false;
      this.resetPasswordToken = '';
      this.resetPasswordCode = '';
      this.resetPasswordNewPassword = '';
      this.step = 'login';
      setTimeout(() => {
        notifier('login.login', {lifetime: 0, hideOnClick: false})('', 'login.Your password has been reset, you can now safely login with your new password', 'confirmation')
      }, 200);
    }).catch((error) => {
      this.processing = false;
      errorHandler('login.reset-password', {hideOnClick: false, clearHandlerWhenIntercepted: true})(error);
    });
  }
}


export class FilterCountriesValueConverter {
  toView(list: Array<any>, term: string) {
    if (!term) return list;
    let newList: Array<any> = [];
    for (let item of list) {
      if (item.name.toLowerCase().indexOf(term.toLowerCase()) !== -1) newList.push(item);
    }
    return newList;
  }
}