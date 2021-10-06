import { UxFileItemArray } from './ux-file-input';
import { TypeDecorator } from '../../decorators/types/type-decorator';
import { inject, bindable } from 'aurelia-framework';
import { Model } from '../../decorators';
import { getLogger, Logger } from 'aurelia-logging';
import { DecoApi } from '../../helpers/deco-api';
import { UxFileItem } from '../../helpers/file-upload';
let log: Logger = getLogger('components:deco-field');

@inject(Element,  DecoApi)
export class DecoField {

  @bindable public instance: Model;
  @bindable public property: string;
  @bindable public type: string;
  @bindable public autohint: boolean = false;
  @bindable public variant: string = '';
  @bindable public displayRefLocale: boolean = false;
  @bindable public refLocale: string = '';
  @bindable public placeholder: string;
  @bindable public textarea: any;
  @bindable public outline: boolean = false;
  @bindable public labelPosition: 'floating' | 'placeholder' | 'label' = 'floating';
  @bindable public disabled: boolean = false;
  @bindable public dicoContext = ''
  @bindable public canRemoveBg: boolean = false;

  @bindable public fetchAllModels: boolean = true; // if true, the comp will fetch all related models to provide a list of select options when field type is model or models
  @bindable public modelsList: Array<Model> | null = null; // if provided, this value will be the list of models used as select options when field type is model or models

  public label: string = '';
  public hint: string = '';
  public typeDecorator: TypeDecorator;
  public options: any;

  public selectOptions: Array<any>;
  public _type: string;
  private _refLocale: string = '';

  constructor(public element: HTMLElement, private decoApi: DecoApi) {

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

  refLocaleChanged() {
    this.setRefLocale();
  }

  initField() {
    this.processProperty();
    this.processType();
    this.setRefLocale();
  }

  processProperty() {
    this.label = this.property;
    this.hint = this.autohint ? this.property : '';

    let rightInstance = this.instance instanceof Model;

    if (!this.instance || !rightInstance) {
      log.warn('this.instance [' + this.property + '] is not set properly');
      this._type = '';
      return;
    }
    
    this.typeDecorator = this.instance.deco.propertyTypes[this.property];
    this.options = this.instance.deco.propertyTypesOptions[this.property];

    if (this.typeDecorator === undefined) {
      throw new Error('[deco-field] typeDecorator is undefined for property: ' + this.property);
    }

    this._type = this.type ? this.type : this.typeDecorator.name;

    if (this.instance.deco.propertyForms[this.property]) {
      for (let propertyForm of this.instance.deco.propertyForms[this.property]) {
        if (propertyForm.type === 'label') this.label = propertyForm.options.text;
        if (propertyForm.type === 'hint') this.hint = propertyForm.options.text;
      }
    }
  }

  processType() {
    if (this._type === 'string' && (this.options.textarea || this.variant === 'textarea')) {
      setTimeout(() => {
        if (this.textarea && this.textarea.fitTextContent && typeof this.textarea.fitTextContent === 'function') this.textarea.fitTextContent();
      }, 20);
      setTimeout(() => {
        if (this.textarea && this.textarea.fitTextContent && typeof this.textarea.fitTextContent === 'function') this.textarea.fitTextContent();
      }, 500);
    }
    if (this._type === 'file' && this.instance[this.property] && this.instance[this.property].type && this.instance[this.property].type.substr(0, 6) === 'image/') {
      let format = '320:320';
      if (this.options.previewsFormats && this.options.previewsFormats.length) {
        if (this.options.defaultFormat && this.options.previewsFormats.indexOf(this.options.previewsFormats) !== -1) {
          format = this.options.defaultFormat;
        } else {
          format = this.options.previewsFormats[0];
        }
      }
      this.instance.getFilePreviewUrl(this.property, format).then((url) => {
        this.instance[this.property].previewData = url;
      });
    }

    if (this._type === 'files' && this.instance[this.property] && Array.isArray(this.instance[this.property])) {
      let files: UxFileItemArray<UxFileItem> = this.instance[this.property];
      let format = '320:320';
      if (this.options.previewsFormats && this.options.previewsFormats.length) {
        if (this.options.defaultFormat && this.options.previewsFormats.indexOf(this.options.previewsFormats) !== -1) {
          format = this.options.defaultFormat;
        } else {
          format = this.options.previewsFormats[0];
        }
      }
      for (let file of files) {
        if (file.type && file.type.substr(0, 6) === 'image/') {
          this.instance.getUxFilePreviewData(this.property, file, format);
        }
      }
    }

    if (this._type === 'select' && this.options.multiple) {
      if (typeof this.instance[this.property] === 'string') {
        this.instance[this.property] = [];
      } else if (!Array.isArray(this.instance[this.property])) {
        this.instance[this.property] = [];
      }
    }

    if (this._type === 'model' || this._type === 'models') {
      if (this.fetchAllModels && !this.modelsList) {
        this.options.model.getAll().then((results) => {
          this.selectOptions = results;
        });
      } else if (this.modelsList && Array.isArray(this.modelsList)) {
        this.selectOptions = this.modelsList;
      }
    }

  }

  setRefLocale() {
    this._refLocale = this.refLocale || this.decoApi.state.refLanguage;
  }

  firstLetterUpper(text: string): string {
    if (text && text.length) {
      return text.substr(0, 1).toUpperCase() + text.substr(1);
    }
    return '';
  }

  context() {
    return this.dicoContext ? this.dicoContext + '.' : '';
  }

}