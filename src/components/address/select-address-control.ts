import { SelectAddressDialog } from './select-address-dialog';
import { bindable, bindingMode, inject, computedFrom } from 'aurelia-framework';
import { Address } from '../../decorators';
import { UxModalService } from '@aurelia-ux/modal';
import { getLogger } from 'aurelia-logging';
import { DOM, PLATFORM } from 'aurelia-pal';
const log = getLogger('select-address-control');

@inject(UxModalService, Element)
export class SelectAddressControl {
  @bindable({defaultBindingMode: bindingMode.twoWay}) public value: any;
  @bindable public addresses: Array<Address> = [];
  @bindable public dicoContext = '';
  @bindable public displayDescription = false;
  @bindable public displayAccessInformation = false;

  constructor(private modalService: UxModalService, private element: HTMLElement) {

  }

  @computedFrom('value', 'value.street', 'value.zip', 'value.city', 'value.country')
  public get hasAddress(): boolean {
    if (!this.value || typeof this.value !== 'object') {
      return false;
    } else if (!this.value.street && !this.value.zip && !this.value.city && !this.value.country) {
      return false;
    }
    return true;
  }

  public unselect() {
    this.value = undefined;
    delete this.value;
  }

  public async openDialog() {
    const editingAddress = Object.assign({}, this.value);
    const modal = await this.modalService.open({
      viewModel: SelectAddressDialog,
      model: {
        address: editingAddress,
        addresses: this.addresses
      }
    });
    const result = await modal.whenClosed();
    if (result.wasCancelled) {
      return;
    }
    this.value = result.output;
    this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
    this.element.dispatchEvent(DOM.createCustomEvent('input', { bubbles: true }));
  }
}