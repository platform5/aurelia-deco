import { AppState } from '../../state/index';
import { inject, bindable, NewInstance, computedFrom } from 'aurelia-framework';
import { SwissdataApi } from '../../helpers/swissdata-api';
import { getLogger, Logger } from 'aurelia-logging';
import { DOM } from 'aurelia-pal';
import { jsonify, validate } from '../../deco';
import { UserModel } from '../../models/user.model';
import { notify, errorify, AureliaUXFormRenderer } from 'aurelia-resources';
import { ValidationController, validateTrigger } from 'aurelia-validation';
import { I18N } from 'aurelia-i18n';
import PhoneNumber from 'awesome-phonenumber';


const log = getLogger('swissdata-user-field');

@inject(SwissdataApi, Element, NewInstance.of(ValidationController), I18N)
export class SwissdataUserField {    

  private log: Logger;
  @bindable public instance: UserModel | 'state' = 'state';
  @bindable public property: 'email' | 'mobile' | 'password';

  private _instance: UserModel;
  private currentPassword: string;
  private newPassword: string;
  private email: string;
  private mobile: string; // full mobile value
  private token: string;
  private code: string;
  
  constructor(private swissdataApi: SwissdataApi, private element: Element, private validationController: ValidationController, private i18n: I18N) {
    this.swissdataApi.store.registerAction('updateUser', updateUser);
    this.validationController.validateTrigger = validateTrigger.blur;
    validate.ValidationRules
      .ensure('currentPassword').displayName(this.i18n.tr('userField.Current Password')).required()
      .ensure('newPassword').displayName(this.i18n.tr('userField.New Password')).required().minLength(10)
      .ensure('email').displayName(this.i18n.tr('userField.Email')).required().email()
      .ensure('mobile').displayName(this.i18n.tr('userField.Mobile')).required().then().satisfies((value: any, object: {}) => {
        if (!value) return true; // this rule is not wrong, because its purpose is not to check if its required or not
        const countryCode = this.swissdataApi.state.country;
        let number = new PhoneNumber( value, countryCode.toLowerCase() );
        if (!number.isValid()) return false;
        if (!number.isPossible()) return false;
        if (!number.isMobile()) return false;
        return true;
      }).withMessage(this.i18n.tr('userField.Invalid mobile number'))
      .on(this);

    this.validationController.addObject(this);
    this.validationController.addRenderer(new AureliaUXFormRenderer());
  }

  public bind() {
    this.instanceChanged();
  }

  public instanceChanged() {
    this._instance = undefined;
    if (this.instance === 'state') {
      if (this.swissdataApi.state.swissdata.authenticated && this.swissdataApi.state.swissdata.user) {
        let instance = new UserModel();
        instance.id = this.swissdataApi.state.swissdata.user.id;
        instance.updateInstanceFromElement(this.swissdataApi.state.swissdata.user).then(() => {
          this._instance = instance;
        });
      }
    } else if (this.instance instanceof UserModel) {
      this._instance = this.instance;
    }
    this.initField();
  }
  
  public propertyChanged() {
    this.initField();
  }

  private initField() {
    this.processProperty();
  }

  private processProperty() {
    let rightInstance = this._instance instanceof UserModel;

    if (!this._instance || !rightInstance) {
      log.warn('this._instance [' + this.property + '] is not set properly');
      log.debug('this.instance', this.instance);
      log.debug('this._instance', this._instance);
      return;
    }
  }

  public async updatePassword() {

    const result1 = await this.validationController.validate({object: this, propertyName: 'currentPassword'});
    const result2 = await this.validationController.validate({object: this, propertyName: 'newPassword'});

    if (!result1.valid || !result2.valid) {
      return;
    }

    try {
      const body = {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      }
      await this.swissdataApi.put('/auth/password-change', body).then(jsonify);
      
      this.currentPassword = '';
      this.newPassword = '';

      notify(this.i18n.tr('userField.Your password has been updated'), {type: 'success', formatter: undefined});
      this.notify();
    } catch (error) {
      errorify(error);
    }
  }

  public async requestEmailChange() {
    const result = await this.validationController.validate({object: this, propertyName: 'email'});
    if (!result.valid) {
      return;
    }
    try {
      const body = {
        email: this.email
      }
      const token = await this.swissdataApi.put('/auth/request-email-change', body).then(jsonify);
      this.token = token.token;
    } catch(error) {
      errorify(error);
    }
  }

  public async validateEmailChange() {
    const body = {
      token: this.token,
      code: this.code.trim()
    }
    try {
      const user = await this.swissdataApi.put('/auth/validate-email-change', body).then(jsonify);
      this.token = '';
      this.code = '';
      this.email = '';
      if (this._instance) {
        this._instance.email = user.email;
        this._instance.emailValidated = user.emailValidated;
      }
      if (this.instance === 'state') this.updateStateUserWithInstance();
      notify(this.i18n.tr('userField.Your email has been changed'), {type: 'success', formatter: undefined});
      this.notify();
    } catch (error) {
      errorify(error);
    }
  }

  public cancelEmailChange() {
    this.token = '';
    this.code = '';
    this.email = '';
  }

  public async requestMobileChange() {
    const intMobile = new PhoneNumber( this.mobile, this.swissdataApi.state.country.toLowerCase() ).getNumber();
    const body = {
      mobile: intMobile
    }
    try {
      const token = await this.swissdataApi.put('/auth/request-mobile-change', body).then(jsonify);
      this.token = token.token;
    } catch (error) {
      errorify(error);
    }
  }

  public cancelMobileChange() {
    this.token = '';
    this.code = '';
    this.mobile = '';
  }

  public async validateMobileChange() {
    const body = {
      token: this.token,
      code: this.code.trim()
    };
    try {
      const user = await this.swissdataApi.put('/auth/validate-mobile-change', body).then(jsonify);
      this.token = '';
      this.code = '';
      this.mobile = '';
      if (this._instance) {
        this._instance.mobile = user.mobile;
        this._instance.mobileValidated = user.mobileValidated;
      }
      if (this.instance === 'state') this.updateStateUserWithInstance();
      notify(this.i18n.tr('userField.Your mobile has been changed'), {type: 'success', formatter: undefined});
      this.notify();
    } catch (error) {
      errorify(error);
    }
  }

  public sendEmailCodeAgain() {
    this.requestEmailChange();
  }

  public sendMobileCodeAgain() {
    this.requestMobileChange();
  }

  private updateStateUserWithInstance() {
    this.swissdataApi.store.dispatch(updateUser, this._instance, ['email', 'emailValidated', 'mobile', 'mobileValidated']);
  }

  private notify() {
    const customEvent = DOM.createCustomEvent('changed', {bubbles: true});
    this.element.dispatchEvent(customEvent);
  }

  @computedFrom('swissdataApi.state.country')
  public get mobileNumberExemple(): string {
    const countryCode = this.swissdataApi.state?.country;
    if (!countryCode) {
      return '';
    }
    return PhoneNumber.getExample( this.swissdataApi.state.country, 'mobile' ).getNumber( 'international' );
  }
}

export function updateUser(state: AppState, user: UserModel, properties: Array<string> | string) {
  log.debug('updateUser', state, user, properties);
  if (!state.swissdata.user) return state;
  const newState = Object.assign({}, state);
  if (typeof properties === 'string') properties = [properties];
  for (let prop of properties) {
    newState.swissdata.user[prop] = user[prop];
  }
  return newState;
}
