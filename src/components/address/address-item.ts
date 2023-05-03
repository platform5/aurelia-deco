import { Address } from './../../decorators/address';
import { bindable } from 'aurelia-framework';

export class AddressItem {
  @bindable public address: Address;
  @bindable public dicoContext = '';
  @bindable public displayDescription = false;
  @bindable public displayAccessInformation = false;
  public main: string = '';
  public secondary: string = '';
  public label: string = '';

  public bind() {
    this.addressChanged();
  }

  public addressChanged() {
    if (!this.address || typeof this.address !== 'object') {
      this.main = '';
      this.secondary = '';
      return;
    }
    this.main = this.address.street;
    const parts: Array<string> = [];
    if (this.address.zip || this.address.city) {
      parts.push(`${this.address.zip} ${this.address.city}`.trim());
    }
    if (this.address.country) {
      parts.push(this.address.country);
    }
    if (this.address.description && this.displayDescription) {
      parts.push(this.address.description);
    }
    if (this.address.accessInformation && this.displayAccessInformation) {
      parts.push(this.address.accessInformation);
    }
    this.secondary = parts.join(', ');
    this.label = this.address.label || '';
  }

  context() {
    return this.dicoContext ? this.dicoContext + '.' : '';
  }
}