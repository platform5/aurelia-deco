import { Address } from './../../decorators/address';
import { bindable } from 'aurelia-framework';

export class AddressItem {
  @bindable public address: Address;
  @bindable public dicoContext = '';
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
    if (this.address.zip || this.address.city) {
      parts.push(`${this.address.zip} ${this.address.city}`.trim());
    }
    if (this.address.country) {
      parts.push(this.address.country);
    }
    this.secondary = parts.join(', ');
    this.label = this.address.label || '';
  }

  context() {
    return this.dicoContext ? this.dicoContext + '.' : '';
  }
}