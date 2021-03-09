import { inject, bindable, bindingMode } from 'aurelia-framework';
import { Model } from '../../decorators';
import { DOM } from 'aurelia-pal';
import { DecoApi } from '../../helpers/deco-api';

@inject(Element, DecoApi)
export class DecoUpdate {

  @bindable public instance: Model;
  @bindable public suffix: string = '';
  @bindable public autoaddLocaleSuffix: boolean = false;
  @bindable({defaultBindingMode: bindingMode.twoWay}) public processing: boolean = false;
  @bindable public route: string = '';

  constructor(public element: HTMLElement, public decoApi: DecoApi) {

  }

  update() {
    this.processing = true;
    if (this.autoaddLocaleSuffix && this.suffix.indexOf('locale=') === -1) {
      if (this.suffix.indexOf('?') === -1) {
        this.suffix += '?locale='
      } else {
        this.suffix += '&locale=';
      }

      this.suffix += this.decoApi.state.language;
    }

    this.instance.validationController.validate().then((result) => {
      if (result && result.valid) {
        this.instance.updateProperties(this.suffix, Object.keys(this.instance), {route: this.route}).then((element) => {
          this.processing = false;
          this.element.dispatchEvent(DOM.createCustomEvent('updated', {
            bubbles: true,
            detail: {
              instance: this.instance,
              newElement: element
            }
          }));
        }).catch((error) => {
          this.processing = false;
          // the upating-error is kept for downward compatibility. Use deco-error instead
          this.element.dispatchEvent(DOM.createCustomEvent('updating-error', {
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
      } else {
        this.processing = false;
        this.element.dispatchEvent(DOM.createCustomEvent('validation-error', {
          bubbles: true
        }));
      }
    });
  }
}
