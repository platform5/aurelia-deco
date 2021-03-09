import { Address } from './../../decorators/address';

export class AddressDialog {

  public address: Address = {};
  public mode: 'create' | 'edit' = 'create';
  public labels: string[] = [];
  public dicoContext = '';

  public activate(params: any) {
    if (params.address && typeof params.address === 'object') {
      this.address = params.address;
    }
    if (params.mode === 'edit') {
      this.mode = 'edit';
    } else {
      this.mode = 'create';
    }
    if (params.labels && Array.isArray(params.labels)) {
      this.labels = params.labels;
    } else {
      this.labels = [];
    }
    if (params.dicoContext) {
      this.dicoContext = params.dicoContext;
    } else {
      this.dicoContext = '';
    }
  }

  private fixAddressKeys() {
    if (typeof this.address.label !== 'string') {
      this.address.label = '';
    }
  }

}