import { inject, computedFrom } from 'aurelia-framework';
import { Model } from '../decorators';
import { PLATFORM } from 'aurelia-pal';
import { Subscription } from 'aurelia-event-aggregator';
import { errorify, ConfirmDialog } from 'aurelia-resources';
import { UxModalService, UxModalServiceResult } from '@aurelia-ux/modal';
import { DecoApi } from '../helpers/deco-api';

@inject(DecoApi, UxModalService)
export class ModelEditorDialog {

  public instance: Model;
  public subscription: Subscription
  public canRemove: boolean = false;
  public mode: 'create' | 'edit' = 'create';
  public properties: Array<string> = []; // empty means all
  public suffix: '';
  public defaultViewPath = PLATFORM.moduleName('./model-editor-default-form.html');
  public viewPath: string;

  constructor(private deco: DecoApi, private modalService: UxModalService) {
  }

  public canActivate(params: any) {
    const rightInstance = params.instance && params.instance instanceof Model;
    if (!rightInstance) {
      errorify(new Error('Missing or invalid instance'));
      return false;
    }
    return true;
  }

  public activate(params: any) {
    this.instance = params.instance;
    if (params.mode === 'create' || params.mode === 'edit') {
      this.mode = params.mode;
    } else if (this.instance.id) {
      this.mode = 'edit';
    } else {
      this.mode = 'create';
    }
    if (Array.isArray(params.properties)) {
      this.properties = params.properties;
    } else {
      this.properties = [];
    }
    if (params.suffix) {
      this.suffix = params.suffix;
    } else {
      this.suffix = '';
    }
    if (params.viewPath) {
      this.viewPath = params.viewPath;
    } else {
      this.viewPath = this.defaultViewPath;
    }
    if (params.canRemove !== undefined) {
      this.canRemove = params.canRemove;
    }
  }

  public async canDeactivate(result: UxModalServiceResult) {
    if (result.wasCancelled) {
      return true;
    }
    if (result.output === 'remove') {
      const confirmModal = await this.modalService.open({
        viewModel: ConfirmDialog,
        model: {
          title: 'Are you sure ?',
          text: 'You want to remove this item ?'
        },
        position: 'center'
      });
      const confirmResult = await confirmModal.whenClosed();
      if (!confirmResult.wasCancelled) {
        await this.instance.remove();
        result.output = 'remove';
        return true;
      }
      return false;
    }
    const validation = await this.instance.validationController.validate();
    if (!validation.valid) {
      return false;
    }
    try {
      let newInstance: Model;
      if (this.mode === 'edit') {
        newInstance = await this.instance.updateProperties(this.suffix, this.editableProperties);
      } else {
        newInstance = await this.instance.save(this.suffix);
      }
      result.output = newInstance;
      return true;
    } catch (error) {
      errorify(error);
      return false;
    }
  }

  @computedFrom('instance')
  public get instanceProperties(): Array<string> {
    if (!this.instance) {
      return [];
    }
    if (!this.instance.deco) {
      return [];
    }
    return Object.keys(this.instance.deco.propertyTypes);
  }

  @computedFrom('instanceProperties')
  public get editableProperties(): Array<string> {
    if (this.properties.length === 0) {
      return this.instanceProperties;
    }
    return this.instanceProperties.filter(prop => this.properties.includes(prop));
  }
}
