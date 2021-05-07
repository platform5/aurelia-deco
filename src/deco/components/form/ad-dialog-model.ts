import { inject, bindable, Container, TemplatingEngine} from 'aurelia-framework';
import { getLogger, Logger } from 'aurelia-logging';
import { DOM } from 'aurelia-pal';
import { Model } from '../../decorators';
import { ArDialog, DialogTypes, arDialog, ArDialogOptions } from 'aurelia-resources';

export interface AdDialogModelParams {
  instance: Model;
  properties: 'all' | Array<string>;
  viewPath?: string;
  data?: any;
  displayRefLocale?: boolean;
  refLocale?: string;
}

@inject(Element)
export class AdDialogModel {  
  
  params: AdDialogModelParams;
  instance: Model;
  properties: 'all' | Array<string> = [];
  data: any = {};
  displayRefLocale: boolean = false;
  refLocale: string = ''

  activate(params: AdDialogModelParams) {
    this.params = params;
    this.processParams();
  }

  processParams() {
    this.instance = this.params.instance;
    this.properties = this.params.properties;
    this.data = this.params.data;
    if (typeof this.params.displayRefLocale === 'boolean') this.displayRefLocale = this.params.displayRefLocale;
    else this.params.displayRefLocale = false;
    if (typeof this.params.refLocale === 'string') this.refLocale = this.params.refLocale;
    else this.params.refLocale = '';
  }

  getViewStrategy(): string {
    if (this.params.viewPath) return this.params.viewPath;
    return './ad-dialog-model.html';
  }
}

export interface AdDialogOptions {
  title: string;
  bindingContext?: any;
  content?: string;
  contentViewModelPath?: string;
  editionViewModelPath?: string;
  editionViewPath?: string;
  type?: DialogTypes;
  editionCallback?: Function;
  editionCallbackSuffix?: string;
  data?: any;
}

let adDialogModel = (instance: Model, options: AdDialogOptions, properties: Array<string> | 'all' = []): ArDialog => {
  let dialogOptions: ArDialogOptions = {
    title: options.title,
    type: options.type ? options.type : 'edition',
    bindingContext: options.bindingContext,
    content: options.content,
    contentViewModelPath: options.contentViewModelPath,
    editionViewModelPath: options.editionViewModelPath ? options.editionViewModelPath : 'aurelia-deco/deco/components/form/ad-dialog-model',
  }
  dialogOptions.editionModel = {
    instance: instance,
    properties: properties
  }
  if (options.editionViewPath) {
    dialogOptions.editionModel.viewPath = options.editionViewPath;
  }
  if (options.editionCallback) {
    dialogOptions.editionCallback = options.editionCallback;
  } else {
    dialogOptions.editionCallback = () => {
      if (instance.id) {
        let prop = Array.isArray(properties) ? properties : Object.keys(instance);
        return instance.updateProperties(options.editionCallbackSuffix, prop);
      } else {
        return instance.save(options.editionCallbackSuffix);
      }
    };
  }
  if (options.data) dialogOptions.editionModel.data = options.data;
  let dialog = arDialog(dialogOptions);
  return dialog;
}

export {adDialogModel};
