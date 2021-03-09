import { bindable, observable, inject } from 'aurelia-framework';
import { Model } from '../decorators';
import { DecoApi } from '../helpers/deco-api';

@inject(Element,  DecoApi)
export class DecoeditCustomAttribute {
  @bindable instance: any;
  @bindable property: string = '';
  @bindable trigger: string = 'change';
  @bindable unescapeContent: boolean = true;
  @bindable public suffix: string = '';
  @bindable public autoaddLocaleSuffix: boolean = false;

  public element: HTMLElement;

  private currentValue: string;

  @observable private edited: boolean = false;
  @observable private processing: boolean = false;
  @observable private error: boolean = false;

  constructor(element, public decoApi: DecoApi) {
    this.element = element;
    this.makeEditable();
  }
  
  bind() {
    this.initValue();
    this.setCurrentValue();
    this.setHandleChange();
  }

  makeEditable() {
    let ce = this.element.getAttribute('contenteditable');
    if (ce !== 'string') this.element.setAttribute('contenteditable', 'true');
    this.element.classList.add('decoedit');
  }

  initValue() {
    this.element.innerHTML = this.instance[this.property];
  }

  setCurrentValue() {
    this.currentValue = this.element.innerHTML;
  }

  setHandleChange() {
    this.element.addEventListener('input', (e) => {
      this.handleEdit(e);
      if (this.trigger === 'change') {
        this.handleUpdate(e);
      }
    });

    if (this.trigger === 'blur') {  
      this.element.addEventListener('blur', (e) => {
        this.handleUpdate(e);
      });
    }
  }

  handleEdit(e) {
    this.edited = this.element.innerHTML !== this.currentValue;
  }

  handleUpdate(e) {
    this.updateValue();
  }

  updateValue() {
    if (!this.edited) return;
    if (this.processing) {
      setTimeout(() => {
        this.updateValue();
      }, 100);
      return;
    }

    this.processing = true;

    if (this.autoaddLocaleSuffix && this.suffix.indexOf('locale=') === -1) {
      if (this.suffix.indexOf('?') === -1) {
        this.suffix += '?locale='
      } else {
        this.suffix += '&locale=';
      }
      
      this.suffix += this.decoApi.state.language;
    }

    (this.instance as any)[this.property] = this.element.innerHTML;
    if (this.unescapeContent) {
      let originalString = (this.instance as any)[this.property];
      let unescapeString = decodeURIComponent(originalString);
      unescapeString = originalString.replace(new RegExp('&lt;', 'g'), '<').replace(new RegExp('&gt;', 'g'), '>').replace(new RegExp('&amp;', 'g'), '&').replace(new RegExp('&nbsp;', 'g'), ' ');
      (this.instance as any)[this.property] = unescapeString;
    }
    (this.instance as Model).updateProperties(this.suffix, [this.property]).then(() => {
      this.processing = false;
      this.edited = false;
      this.setCurrentValue();
    }).catch((error) => {
      this.processing = false;
      this.error = true;
    });
  }

  editedChanged() {
    if (!this.element) return;
    if (this.edited) this.element.classList.add('edited');
    else this.element.classList.remove('edited');
  }
  
  processingChanged() {
    if (!this.element) return;
    if (this.processing) this.element.classList.add('processing');
    else this.element.classList.remove('processing');
  }
  
  errorChanged() {
    if (!this.element) return;
    if (this.error) this.element.classList.add('error');
    else this.element.classList.remove('error');
  }
}
