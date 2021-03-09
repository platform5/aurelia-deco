import { Address, isSameAddress } from './../../decorators/address';
import { UxModalService, UxModalServiceResult } from '@aurelia-ux/modal';
import { inject } from 'aurelia-framework';
import { errorify } from 'aurelia-resources';
import { getLogger } from 'aurelia-logging';
const log = getLogger('select-address-dialog');

@inject(UxModalService)
export class SelectAddressDialog {

  public addresses: Array<Address> = [];
  public address: Address = {};
  public dicoContext = '';

  constructor(private modalService: UxModalService) {
  }

  public activate(params: any) {
    if (params.addresses) {
      this.addresses = params.addresses;
    }
    if (params.address) {
      this.address = params.address;
    }
    if (params.dicoContext) {
      this.dicoContext = params.dicoContext;
    } else {
      this.dicoContext = '';
    }
  }

  public selectAddress(address: Address) {
    this.address = address;
    this.modalService.ok(this.address);
  }

  public async canDeactivate(result: UxModalServiceResult) {
    if (result.wasCancelled) {
      return true;
    }
    if (!result.output && !this.address) {
      errorify(new Error('Select an address'));
      return false;
    }
    result.output = this.address;
    return true;
  }

  public compareAddresses(a: any, b: any) {
    return isSameAddress(a, b);
  }
}
