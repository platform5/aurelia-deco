import { AppState } from './../../state/interfaces';
import { AureliaSwissdataConfig } from './../../index';
import { GettingStartedTheme } from './getting-started-theme';
import { inject, bindable, observable, computedFrom, Container, TaskQueue } from 'aurelia-framework';
import { ValidationControllerFactory, ValidationController, ValidationRules, validateTrigger } from 'aurelia-validation';
import { getLogger } from 'aurelia-logging';
import { I18N } from 'aurelia-i18n';
import { ArNext, errorify, notify, AureliaUXFormRenderer, LocalesDialog } from 'aurelia-resources';
import { jsonify } from '../../deco';
import { SdLogin } from '../../helpers/sd-login';
import { StyleEngine } from '@aurelia-ux/core';
import { DialogService } from 'aurelia-dialog';
import PhoneNumber from 'awesome-phonenumber';
import { notifier } from '../notification/swissdata-notification';
import { Subscription } from 'aurelia-event-aggregator';
import * as moment from 'moment';
import { validateAccountStep } from '../../state/sd-login-actions';

const log = getLogger('getting-started');

// TODO: for login and for forgot-password we must enable mobile to be written in local format

//import { DOM } from 'aurelia-pal';

// STRINGS TO TRANSLATE
// gettingStarted.Choose an account
// gettingStarted.Create an account
// gettingStarted.Use another account
// gettingStarted.Connection
// gettingStarted.Email or phone number
// gettingStarted.Next
// gettingStarted.Welcome Back
// gettingStarted.Log in with {{username}}
// gettingStarted.Username
// gettingStarted.Password
// gettingStarted.Login
// gettingStarted.Forgot Password
// gettingStarted.Firstname
// gettingStarted.Lastname
// gettingStarted.Back to login
// gettingStarted.back
// gettingStarted.Validate your account
// gettingStarted.We sent you a code to {{username}}, please enter it below
// gettingStarted.Code
// gettingStarted.Validate
// gettingStarted.Send the code again
// gettingStarted.Forgot password
// gettingStarted.Where can we send you a code to reset your password ?
// 
// 
// 

// gettingStarted.Username must be a valid email or mobile number
// gettingStarted.Invalid mobile number
// gettingStarted.This username does not exists
// gettingStarted.Your code has been sent again
// gettingStarted.This email already exists
// 
// 
// gettingStarted.Your password has been changed! Enter your password again to login
// gettingStarted.Password not strong enough
// gettingStarted.Validation failed
// gettingStarted.Invalid request
// gettingStarted.Token not found

type StepTypes = 'pre-account' | 'post-account' | 'accounts-list' | 'login'
                    | 'password' | 'create-account' | 'create-account-part2'
                    | 'validate-account' | 'forgot-password' | 'reset-password'

@inject(Element, StyleEngine, SdLogin, I18N, ValidationControllerFactory, DialogService)
export class GettingStarted {    

  @bindable private locales: Array<string> | null = ['fr_CH', 'de_CH', 'fr_FR'];
  @bindable private theme: GettingStartedTheme;
  
  @observable public step: StepTypes = 'pre-account';

  private username: string;
  private password: string;
  
  private firstname: string;
  private lastname: string;
  @observable public newAccountUsername: string;
  @observable private newAccountUsernameAsEmail: boolean = false;
  private newAccountPassword: string;
  private code: string;
  private extraData: any;

  private forgotUsername: string;
  private forgotNewPassword: string;
  private forgotCode: string;

  public arNextStart: ArNext;
  private nbStepPreAccount = 0;
  private nbStepPostAccount = 0;
  private nbStepPostLogin = 0;

  // will see later if we still need these variables for keyboard adaptation (cordova)
  private w: number;
  private h: number;
  private handleResize: EventListener;
  private keyboardPlugin: boolean = false;
  private handleKeyboardUp: EventListener;
  private handleKeyboardDown: EventListener;
  private keyboardHeight: number = 0;
  private window: Window;
  private body: HTMLElement;
  private html: HTMLElement;

  private arNextElement: HTMLElement;
  private swissdataConfig: AureliaSwissdataConfig;
  public validationController: ValidationController;
  public processing: boolean = false;

  private subscriptions: Subscription[] = [];

  private createAccountMemory: {
    firstname?: string;
    lastname?: string;
    username?   : string;
    token?: string;
    tokenExpiry?: string;
    extraData?: any
  } = {};
  
  constructor(private element: HTMLElement, private styleEngine: StyleEngine, private sdLogin: SdLogin, private i18n: I18N, public validationControllerFactory: ValidationControllerFactory, private dialogService: DialogService) {

    this.handleResize = e => {
      const h = this.element.offsetHeight;
      this.arNextElement.style.height = `${h - 130}px`;
    };
    this.handleKeyboardUp = e => {
      setTimeout(() => {
        this.keyboardHeight = (e as any).keyboardHeight;
      }, 50);
    };
    this.handleKeyboardDown = e => {
      setTimeout(() => {
        this.keyboardHeight = 0;
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
        .email().when((obj: any) => {
          return isEmail(obj);
        }).withMessage(this.i18n.tr('gettingStarted.Username must be a valid email or mobile number'))
        .satisfies((value: any, obj: any) => {
          if (isEmail(obj)) {
            // assume an email, return true here
            return true;
          }
          if (!value) return true; // this rule is not wrong, because its purpose is not to check if its required or not
          const countryCode = (this.state as any).country;
          let number = new PhoneNumber( value, countryCode.toLowerCase() );
          if (!number.isValid()) return false;
          if (!number.isPossible()) return false;
          if (!number.isMobile()) return false;
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
      .on(GettingStarted);

    this.validationController = validationControllerFactory.create();
    this.validationController.validateTrigger = validateTrigger.manual;
    this.validationController.addObject(this);
    this.validationController.addRenderer(new AureliaUXFormRenderer());
  }

  public bind() {
    if (this.theme != null && this.theme.themeKey == null) {
      this.theme.themeKey = 'getting-started';
    }
    this.styleEngine.applyTheme(this.theme, this.element);
    // this.goToStart();
  }

  public attached() {
    const search = location.search;
    if (search && search.substr(0, 1) === '?') {
      const searchParts = search.substr(1).split('&');
      for (const part of searchParts) {
        const keyValue = part.split('=');
        const key = keyValue[0];
        const value = keyValue[1];
        if (key === 'step' && value === 'create-account') {
          setTimeout(() => {
            this.goToCreateAnAccount();
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
          } catch (error) {
            this.extraData = value;
          }
        }
        location.search.replace(part, '');
      }
    }
    this.fetchCreateAccountMemory();

    this.subscriptions.push(this.sdLogin.eventAggregator.subscribe('swissdata:logout', () => {
      if (this.step !== 'pre-account' && this.step !== 'accounts-list' && this.step !== 'login') {
        this.goToStart();
      }
    }));
    this.subscriptions.push(this.sdLogin.eventAggregator.subscribe('getting-started.goto-step', (data) => {
      let allowedSteps = ['pre-account', 'post-account', 'accounts-list', 'login'
     , 'password', 'create-account', 'create-account-part2'
     , 'validate-account', 'forgot-password', 'reset-password'];
      if (allowedSteps.indexOf(data) !== -1) {
        this.setStep(data);
      }
    }));

    this.sdLogin.ready().then(() => {
      Container.instance.get(TaskQueue).queueTask(() => {
        this.fixSlots();
        if (this.arNextStart) {
          this.arNextStart.reset();
        }
        if (this.sdLogin.state.swissdata.authenticated) {
          this.goToPostLogin();
        } else {
          if (this.nbStepPreAccount > 0) {
            this.step = 'pre-account';
          } else {
            this.goToStart();
          }
        }
      });
    });
    this.handleResize(null);
    window.addEventListener('resize', this.handleResize);
    if ((window as any).Keyboard) {
      this.keyboardPlugin = true;
      window.addEventListener('keyboardWillShow', this.handleKeyboardUp);
      window.addEventListener('keyboardWillHide', this.handleKeyboardDown);
    }
    this.window = window;
    this.body = document.body;
    this.html = document.querySelector('html');    
  }

  public detached() {
    for (let sub of this.subscriptions) {
      sub.dispose();
    }
    this.subscriptions = [];
    this.arNextStart.reset();
    window.removeEventListener('resize', this.handleResize);
    if (this.keyboardPlugin) {
      window.addEventListener('keyboardWillShow', this.handleKeyboardUp);
      window.addEventListener('keyboardWillHide', this.handleKeyboardDown);
    }
  }

  @computedFrom('body.offsetHeight', 'window.innerHeight', 'html.scrollTop')
  get compensationHeight(): Number {
    if (this.keyboardPlugin || !this.body || !this.window) return 0;
    this.html.scrollTop = 0;
    return this.body.offsetHeight - this.window.innerHeight;
  }

  private fixSlots() {
    let elements = this.element.querySelectorAll('.getting-started__slots-container > *');
    let containers = this.element.querySelectorAll('.getting-started__step');    
    for (let index = 0; index < elements.length; index++) {
      let element = elements.item(index);

      if (element.getAttribute('slot') === 'pre-account') {
        let arNextItem = document.createElement('ar-next-item');
        arNextItem.appendChild(element);
        element.classList.add('getting-started__step');
        arNextItem.id = element.id || `getting-started-pre-account-${this.nbStepPreAccount}`;
        arNextItem.setAttribute('data-gs-id', `getting-started-pre-account-${this.nbStepPreAccount}`);
        this.arNextElement.prepend(arNextItem);
        this.nbStepPreAccount++;
        continue;
      } else if (element.getAttribute('slot') === 'post-account') {
        let arNextItem = document.createElement('ar-next-item');
        arNextItem.appendChild(element);
        element.classList.add('getting-started__step');
        arNextItem.id = element.id || `getting-started-post-account-${this.nbStepPostAccount}`;
        arNextItem.setAttribute('data-gs-id', `getting-started-post-account-${this.nbStepPostAccount}`);
        this.arNextElement.appendChild(arNextItem);
        this.nbStepPostAccount++;
        continue;
      } else if (element.getAttribute('slot') === 'post-login') {
        let arNextItem = document.createElement('ar-next-item');
        arNextItem.appendChild(element);
        element.classList.add('getting-started__step');
        arNextItem.id = element.id || `getting-started-post-login-${this.nbStepPostLogin}`;
        arNextItem.setAttribute('data-gs-id', `getting-started-post-login-${this.nbStepPostLogin}`);
        this.arNextElement.appendChild(arNextItem);
        this.nbStepPostLogin++;
        continue;
      }

      for (let index2 = 0; index2 < containers.length; index2++) {
        let container = containers.item(index2);
        if (element.getAttribute('slot') === container.id) {
          let slotContainer = container.querySelector('.slot');
          if (slotContainer) slotContainer.appendChild(element);
        }
      }
    }
  }

  public newAccountUsernameChanged() {
    this.newAccountUsernameAsEmail = isEmail(this);
  }

  private showUsernameField: boolean = !(window as any).chrome;
  private showPasswordField: boolean = !(window as any).chrome;
  private setStep(step: StepTypes, focusFirstField: boolean = true) {
    if (step === 'login') {
      setTimeout(() => {
        this.showUsernameField = true;
      }, 450);
    } else {
      this.showUsernameField = !(window as any).chrome;
    }
    if (step === 'password') {
      setTimeout(() => {
        this.showPasswordField = true;
      }, 450);
    } else {
      this.showPasswordField = !(window as any).chrome;
    }
    this.validationController.reset();
    if (this.arNextStart && this.arNextElement) {
      this.arNextStart.to(step);
    }
    this.step = step;
    if (focusFirstField) {
      this.focusFirstInputIn(step);
    }
  }

  private focusFirstInputIn(id: string) {
    setTimeout(() => {
      let element = document.querySelector(`ar-next-item#${id} ux-input input:not([disabled])`);
      if (element instanceof HTMLInputElement) element.focus();
    }, 450);
  }

  public goToStart() {
    if (Array.isArray(this.sdLogin.state.sdlogin.accounts) && this.sdLogin.state.sdlogin.accounts.length > 0) {
      this.goToAccountsList();
    } else {
      this.goToLogin();
    }
  }

  public goToAccountsList() {
    this.setStep('accounts-list');
  }

  public loginWithUsername(username: string) {
    this.username = username;
    this.goToPassword();
  }
  
  public goToLogin() {
    this.setStep('login');
  }

  private prepareUsernameForApi(prop: string = 'username') {
    let usernameForApi: string = this.username;
    if (isEmail(this, 'username')) {
      usernameForApi = this.username.trim().toLowerCase();
    } else {
      const countryCode = (this.state as any).country;
      usernameForApi = new PhoneNumber( this.username, countryCode.toLowerCase() ).getNumber();
    }
    return usernameForApi;
  }

  public checkUsername() {
    this.validationController.reset();

    const usernameForApi = this.prepareUsernameForApi();

    this.processing = true;
    return this.validationController.validate({object: this, propertyName: 'username'}).then((result): Promise<any> => {
      if (result.valid) {
        return this.sdLogin.checkIfUsernameExists(usernameForApi).then((exists) => {
          if (exists === false) {
            errorify(new Error(this.i18n.tr('gettingStarted.This username does not exists')));
          } else if (exists === 'mobile') {
            this.goToPassword();
          } else {
            this.goToPassword();
          }
        });
      }
      return Promise.resolve();
    }).finally(() => {
      this.processing = false;
    });
  }

  public openLanguageDialog() {
    const currentLocale = (this.state as any).language + '_' + (this.state as any).country;
    this.dialogService.open({ viewModel: LocalesDialog, model: {locale: currentLocale, locales: this.locales}, centerHorizontalOnly: true, overlayDismiss: true }).whenClosed(response => {
      if (!response.wasCancelled && response.output) {
        this.sdLogin.store.dispatch('setLanguage', response.output.substr(0, 2));
        this.sdLogin.store.dispatch('setCountry', response.output.substr(3, 2));
      }
    });
  }

  public goToPassword() {
    if (!this.username) {
      this.goToLogin();
      return;
    }
    this.setStep('password');
  }

  public authenticate() {
    this.login(false, null);
  }

  private login(autoLoginAfterCreateAccount = false, event?: Event | null) {
    if (event && event.stopPropagation) event.stopPropagation();
    if (event && event.preventDefault) event.preventDefault();
    if (!this.sdLogin.inited) throw new Error('SdLogin must be inited before using Getting Started component');

    this.validationController.reset();
    this.processing = true;
    return this.validationController.validate({object: this, propertyName: 'password'}).then((result): Promise<any> => {
      if (result.valid) {
        const usernameForApi = this.prepareUsernameForApi();
        return this.sdLogin.login(usernameForApi, this.password).then((a) => {
          this.password = '';
          this.username = '';
          if (autoLoginAfterCreateAccount) {
            this.goToPostAccount();
          } else {
            this.goToPostLogin();
          }
        }).catch(error => errorify(new Error(this.i18n.tr('gettingStarted.' + error.message))));
      }
      return Promise.resolve();
    }).finally(() => {
      this.processing = false;
    });
  }

  public goToCreateAnAccount() {
    if (!this.continueFromCreateAccountMemory()) {
      this.setStep('create-account');
    }
  }

  public goToCreateAnAccountPart2() {
    if (!this.sdLogin.inited) throw new Error('SdLogin must be inited before using Getting Started component');
    this.processing = true;
    return Promise.all([
      this.validationController.validate({object: this, propertyName: 'firstname'}),
      this.validationController.validate({object: this, propertyName: 'lastname'}),
    ]).then((results): Promise<any> => {
      if (results[0].valid && results[1].valid) {
        this.username = '';
        this.newAccountPassword = '';
        this.saveCreateAccountMemory();
        this.setStep('create-account-part2');
      }
      return Promise.resolve();
    }).finally(() => {
      this.processing = false;
    });
    
  }

  public createAccount() {
    if (!this.sdLogin.inited) throw new Error('SdLogin must be inited before using Getting Started component');
    this.validationController.reset();
    this.processing = true;
    return Promise.all([
      this.validationController.validate({object: this, propertyName: 'newAccountUsername'}),
      this.validationController.validate({object: this, propertyName: 'newAccountPassword'}),
    ]).then((results): Promise<any> => {
      if (results[0].valid && results[1].valid) {
        let email = null;
        let mobile = null;
        let ensureMobile = false;
        let ensureEmail = false;
        if (this.newAccountUsernameAsEmail) {
          email = this.newAccountUsername.trim().toLowerCase();
          // this.niceUsername = email;
          ensureEmail = true;
        } else {
          const countryCode = (this.state as any).country;
          mobile = new PhoneNumber( this.newAccountUsername, countryCode.toLowerCase() ).getNumber();
          // this.niceUsername = new PhoneNumber( this.newAccountUsername, countryCode.toLowerCase() ).getNumber('international');
          ensureMobile = true;
        }
        return this.sdLogin.createAccount(this.firstname, this.lastname, email, mobile, this.newAccountPassword, ensureEmail, ensureMobile, this.extraData).then((result) => {
          this.code = '';
          this.saveCreateAccountMemory(this.sdLogin.state.sdlogin.createAccountValidationToken, this.sdLogin.state.sdlogin.createAccountValidationTokenExpiry);
          this.setStep('validate-account');
        }).catch(error => errorify(new Error(this.i18n.tr('gettingStarted.' + error.message))));
      }
      return Promise.resolve();
    }).finally(() => {
      this.processing = false;
    });
  }

  public validateCode() {
    if (!this.sdLogin.inited) throw new Error('SdLogin must be inited before using Getting Started component');
    this.validationController.reset();
    this.processing = true;
    return this.validationController.validate({object: this, propertyName: 'code'}).then((result): Promise<any> => {
      if (result.valid) {
        let type: 'email' | 'mobile' = isEmail(this, 'newAccountUsername') ? 'email' : 'mobile';
        return this.sdLogin.validateCode(this.code, type).then((result) => {
          this.username = this.newAccountUsername;
          this.password = this.newAccountPassword;
          //this.sdLogin.login(result.mobile || result.email, this.password);
        }).catch(error => errorify(new Error(this.i18n.tr('gettingStarted.' + error.message))));
      }
      return Promise.resolve();
    }).finally(() => {
      this.processing = false;
      this.clearCreateAccountMemory();
      if (this.password) {
        notify(this.i18n.tr('gettingStarted.Your account has been created'));
        this.login(true);
      } else {
        notify(this.i18n.tr('gettingStarted.Your account has been created, you can now enter your password to login'));
        this.goToPassword();
      }
    });
  }

  public sendValidationCodeAgain() {
    if (!this.sdLogin.inited) throw new Error('SdLogin must be inited before using Getting Started component');
    let type: 'email' | 'mobile' = this.newAccountUsernameAsEmail ? 'email' : 'mobile';
    this.processing = true;
    return this.sdLogin.api.put(`/user/resend-code`, {
      token: this.sdLogin.state.sdlogin.createAccountValidationToken,
      method: type
    }).then(jsonify).then(() => {
      notify(this.i18n.tr('gettingStarted.Your code has been sent again'));
    }).catch(error => errorify(new Error(this.i18n.tr('gettingStarted.' + error.message)))).finally(() => {
      this.processing = false;
    });

  }

  public cancelAccountCreation() {
    this.clearCreateAccountMemory();
    this.goToStart();
  }

  public goToForgetPassword(username: 'string') {
    this.forgotUsername = username;
    this.setStep('forgot-password');
  }

  public requestResetPasswordCode() {
    this.validationController.reset();
    this.processing = true;
    return this.validationController.validate({object: this, propertyName: 'forgotUsername'}).then((result): Promise<any> => {
      if (result.valid) {
        const usernameForApi = this.prepareUsernameForApi('forgotUsername')
        return this.sdLogin.checkIfUsernameExists(usernameForApi).then((exists) => {
          if (exists === false) {
            errorify(new Error(this.i18n.tr('gettingStarted.This username does not exists')));
          } else if (exists === 'mobile') {
            this.goToResetPassword();
          } else {
            this.goToResetPassword();
          }
        });
      }
      return Promise.resolve();
    }).finally(() => {
      this.processing = false;
    });
  }

  public goToResetPassword() {
    this.sendForgotPasswordCode().then(() => {
      this.setStep('reset-password');
    });
  }

  public sendForgotPasswordCode(): any {
    if (!this.sdLogin.inited) throw new Error('SdLogin must be inited before using Getting Started component');
    
    this.processing = true;
    const usernameForApi = this.prepareUsernameForApi('forgotUsername')
    return this.sdLogin.requestResetPassword(usernameForApi).then(() => {
      this.forgotNewPassword = '';
      this.forgotCode = '';
    }).catch(error => errorify(new Error(this.i18n.tr('gettingStarted.' + error.message)))).finally(() => {
      this.processing = false;
    });
  }

  public resetPassword(): any {
    if (!this.sdLogin.inited) throw new Error('SdLogin must be inited before using Getting Started component');
    
    this.processing = true;
    this.validationController.reset();
    return Promise.all([
      this.validationController.validate({object: this, propertyName: 'forgotCode'}),
      this.validationController.validate({object: this, propertyName: 'forgotNewPassword'}),
    ]).then((results): Promise<any> => {
      if (results[0].valid && results[1].valid) {
        return this.sdLogin.resetPassword(this.forgotCode, this.forgotNewPassword).then(() => {
          notifier(this.i18n.tr('gettingStarted.Your password has been changed! Enter your password again to login'));
          this.forgotCode = '';
          this.forgotNewPassword = '';
          this.username = this.forgotUsername;
          this.setStep('password');
        }).catch(error => errorify(new Error(this.i18n.tr('gettingStarted.' + error.message))));
      }
      return Promise.resolve();
    }).finally(() => {
      this.processing = false;
    });
  }

  goToPostLogin() {
    let id = 'account-ready';
    if (this.nbStepPostLogin) {
      let element = this.element.querySelector('ar-next-item[data-gs-id=getting-started-post-login-0]');
      if (element && element.id) id = element.id;
    }
    if (this.arNextElement && this.arNextStart) {
      this.arNextStart.to(id);
    }
    this.step = 'post-account';
  }

  goToPostAccount() {
    if (this.nbStepPostAccount === 0 && this.nbStepPostLogin !== 0) {
      return this.goToPostLogin();
    }
    let id = 'account-ready';
    if (this.nbStepPostAccount) {
      let element = this.element.querySelector('ar-next-item[data-gs-id=getting-started-post-account-0]');
      if (element && element.id) id = element.id;
    }
    if (this.arNextElement && this.arNextStart) {
      this.arNextStart.to(id);
    }
    this.step = 'post-account';
  }

  @computedFrom('sdLogin.state')
  get state(): AppState | {} {
    return this.sdLogin ? this.sdLogin.state : {};
  }

  stepChanged() {
    history.pushState({step: this.step}, '');
  }

  private saveCreateAccountMemory(token?: string, tokenExpiry?: string) {
    this.createAccountMemory.firstname = this.firstname;
    this.createAccountMemory.lastname = this.lastname;
    this.createAccountMemory.username = this.newAccountUsername;
    this.createAccountMemory.token = token || undefined;
    this.createAccountMemory.tokenExpiry = tokenExpiry ? moment(tokenExpiry).toString() : undefined;
    this.createAccountMemory.extraData = this.extraData;
    const string = btoa(JSON.stringify(this.createAccountMemory));
    localStorage.setItem('gs-cam', string);
  }

  private fetchCreateAccountMemory() {
    const cam = localStorage.getItem('gs-cam');
    if (cam) {
      try {
        this.createAccountMemory = JSON.parse(atob(cam));
        if (this.createAccountMemory.tokenExpiry) {
          const expires = moment(this.createAccountMemory.tokenExpiry);
          if (expires.isAfter(moment())) {
            this.createAccountMemory.token = undefined;
            this.createAccountMemory.tokenExpiry = undefined;
          }
        }
      } catch (error) {}
    }
  }

  private clearCreateAccountMemory() {
    localStorage.removeItem('gs-cam');
    this.createAccountMemory = {};
    this.firstname = '';
    this.lastname = '';
    this.newAccountUsername = '';
    this.newAccountPassword = '';
    this.sdLogin.store.dispatch(validateAccountStep, '', '');
  }

  private continueFromCreateAccountMemory() {
    if (!this.createAccountMemory.firstname) {
      return false;
    }
    let step: StepTypes = 'create-account';
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
  }

}

@inject(Element)
export class GettingStartedStartCustomAttribute {

  constructor(private element: Element){
    this.element = element;
  }

  attached() {
    this.element.addEventListener('click', () => {
      const gsElement: any = this.element.closest('.getting-started');
      const elementIsGettingStarted = gsElement && 
                                      gsElement.au && 
                                      gsElement.au.controller && 
                                      gsElement.au.controller.viewModel && 
                                      gsElement.au.controller.viewModel instanceof GettingStarted;
      if (elementIsGettingStarted) {
        const vm: GettingStarted = gsElement.au.controller.viewModel;
        vm.goToStart();
      }
    }, false)
  }

}

const isEmail = (obj: GettingStarted, prop: string = 'newAccountUsername') => {
  const rightInstance = obj instanceof GettingStarted;
  if (!rightInstance) return false;
  const val: string = obj[prop];
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
}