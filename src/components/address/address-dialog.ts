import { Address } from './../../decorators/address';
import { UxModalServiceResult } from '@aurelia-ux/modal';
import { errorify } from 'aurelia-resources';
import { I18N } from 'aurelia-i18n';
import { inject } from 'aurelia-framework';


@inject(I18N)
export class AddressDialog {

  public dialogTitle: string = 'Edit Address'
  public address: Address = {};
  public mode: 'create' | 'edit' = 'create';
  public checkAllValues: boolean = false;
  public labels: string[] = [];
  public dicoContext = '';
  public allowDescription = false;
  public allowLatLngEdition = false;
  public countryType: 'input' | 'list' = 'input';
  public countryList: 'all' | Array<string> = 'all';

  constructor(private i18n: I18N) {
  }

  public activate(params: any) {
    if (params.address && typeof params.address === 'object') {
      this.address = params.address;
    }
    if (params.mode === 'edit') {
      this.mode = 'edit';
    } else {
      this.mode = 'create';
    }
    
    if (params.checkAllValues) {
      this.checkAllValues = params.checkAllValues;
    }
    if (params.dialogTitle) {
      this.dialogTitle = params.dialogTitle;
    } else {
      this.dialogTitle = this.i18n.tr('Edit Address');
    }
    if (params.labels && Array.isArray(params.labels)) {
      this.labels = params.labels;
    } else {
      this.labels = [];
    }
    if (params.countryType && typeof params.countryType === 'string') {
      this.countryType = params.countryType;
    }
    if (params.countryList) {
      this.countryList = params.countryList;
    }
    if (params.allowDescription && typeof params.allowDescription === 'boolean') {
      this.allowDescription = params.allowDescription;
    }
    if (params.allowLatLngEdition && typeof params.allowLatLngEdition === 'boolean') {
      this.allowLatLngEdition = params.allowLatLngEdition;
    }
    if (params.dicoContext) {
      this.dicoContext = params.dicoContext;
    } else {
      this.dicoContext = '';
    }
  }
  
  public async canDeactivate(result: UxModalServiceResult) {
    if (result.wasCancelled) {
      return true;
    }
    
    if (this.checkAllValues) {
      if (!this.address.country && this.countryList && this.countryList.length > 0) this.address.country = this.countryList[0];
      if (!this.address.street || !this.address.zip || !this.address.city || !this.address.country) {
        errorify(new Error('You must fill out all fields'));
        return false;
      } else {
        result.output = this.address;
        return true;
      } 
    }

    if (!this.address) return false;

    result.output = this.address;
    return true;

  }

  private fixAddressKeys() {
    if (typeof this.address.label !== 'string') {
      this.address.label = '';
    }
  }

}