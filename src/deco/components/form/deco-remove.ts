import { inject, bindable, bindingMode } from 'aurelia-framework';
import { Model } from '../../decorators';
import { DOM } from 'aurelia-pal';

@inject(Element)
export class DecoRemove {

  @bindable public instance: Model;
  @bindable public suffix: string = '';
  @bindable public confirmLabel: string = 'Confirm ?';
  @bindable({defaultBindingMode: bindingMode.twoWay}) public processing: boolean = false;
  @bindable public route: string = '';

  private requestConfirmation: boolean = false;
  private timeout: any;

  constructor(public element: HTMLElement) {

  }

  remove() {
    this.requestConfirmation = true;
    this.timeout = setTimeout(() => {
      this.requestConfirmation = false;
    }, 2000);
  }

  confirm() {
    clearTimeout(this.timeout);
    this.processing = true;

    this.instance.remove(this.suffix, {route: this.route}).then(() => {
      this.processing = false;
      this.element.dispatchEvent(DOM.createCustomEvent('removed', {
        bubbles: true,
        detail: {
          instance: this.instance
        }
      }));
    }).catch((error) => {
      this.processing = false;
      // the removing-error is kept for downward compatibility. Use deco-error instead
      this.element.dispatchEvent(DOM.createCustomEvent('removing-error', {
        bubbles: true,
        detail: {
          error: error
        }
      }));  
      this.element.dispatchEvent(DOM.createCustomEvent('deco-error', {
        bubbles: true,
        detail: {
          error: error
        }
      }));  
    });
  }
}
