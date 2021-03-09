import { DecoField, Model, DecoApi } from '../../deco';
import { inject, bindable } from 'aurelia-framework';
import { getLogger, Logger } from 'aurelia-logging';
import { DynamicDataModel } from '../../models';
let log: Logger = getLogger('components:swissdata-field');

@inject(Element, DecoApi)
export class SwissdataField extends DecoField {

  @bindable public instance: Model;
  @bindable public property: string;
  @bindable public type: string;
  @bindable public autohint: boolean = false;
  @bindable public variant: string = '';

  @bindable public selectOptions: Array<any> | null = null;

  constructor(public element: HTMLElement, decoApi: DecoApi) {
    super(element, decoApi);
  }

  bind() {
    this.initField();
  }

  instanceChanged() {
    this.initField();
  }
  
  propertyChanged() {
    this.initField();
  }

  initField() {
    super.processProperty();
    if (this._type === 'model' && typeof this.options.model === 'string') {
      // this is a dynamic model
      this._type = 'dynamicmodel';
      this.setDynamicModelOption();
    } else if (this._type === 'models' && typeof this.options.model === 'string') {
      // this is a dynamic model
      this._type = 'dynamicmodels';
      this.setDynamicModelOption();
    }
    this.processType();
  }

  processType() {
    if (this._type === 'dynamicmodel' || this._type === 'dynamicmodels') {
      if (Array.isArray(this.selectOptions)) {
        this.selectOptions = this.selectOptions;
      } else if (!this.options.dynamicmodel || !this.options.dynamicmodel.slug) {
        log.warn('Dynamicmodel not set in options for property', this.property);
      } else {
        DynamicDataModel.use(this.options.dynamicmodel.slug).getAll().then((results) => {
          this.selectOptions = results;
        });
      }
    } else if (this._type === 'address') {
      if (this.instance[this.property] === null || this.instance[this.property] === undefined || typeof this.instance[this.property] !== 'object') {
        this.instance[this.property] = {};
      }
    } else {
      super.processType();
    }
  }

  setDynamicModelOption() {
    if (this._type !== 'dynamicmodel' && this._type !== 'dynamicmodels') return;
    if (this.options.dynamicmodel && this.options.dynamicmodel instanceof DynamicDataModel) return;
    this.options.dynamicmodel = DynamicDataModel.models[this.options.model];
  }
}
