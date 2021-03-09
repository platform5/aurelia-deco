import { customElement, bindable, children, observable } from 'aurelia-framework';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { AsContactTheme } from './as-contact-theme';
import { getLogger, Logger } from 'aurelia-logging';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DOM } from 'aurelia-pal';
//import { errorHandler, notifier } from '../notification/swissdata-notification';
import { computedFrom } from 'aurelia-framework';
import { DynamicDataModel } from '../../models';
import { StringAnyMap, errorify, notify } from 'aurelia-resources';

@inject(Element, StyleEngine, EventAggregator)
@customElement('as-contact')
export class AsContact implements UxComponent {

  @bindable public theme: AsContactTheme;
  @bindable public modelSlug: string;
  @bindable public includeProperties: Array<string> = [];
  @bindable public excludeProperties: Array<string> = [];
  @bindable public success: string = 'Your message has been sent';
  @bindable public showSuccess: boolean = false;
  @bindable public defaultValues: StringAnyMap = {};

  public instance: DynamicDataModel;
  private log: Logger;
  @observable public sending: boolean = false;
  
  constructor(private element: HTMLElement, public styleEngine: StyleEngine, private eventAggregator: EventAggregator) {
    this.log = getLogger('as-contact');
  }

  public bind() {
    const element = this.element;
    this.themeChanged(this.theme);
    this.modelSlugChanged();
  }

  public attached() {
  }

  public detached() {
  }

  public sendingChanged() {
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'as-contact';
    }
    this.styleEngine.applyTheme(newValue, this.element);
  }

  public modelSlugChanged() {
    if (!this.modelSlug) this.instance = null;
    this.instance = new DynamicDataModel(this.modelSlug);
    for (let key in this.defaultValues) {
      this.instance.set(key, this.defaultValues[key]);
    }
  }

  public send() {
    
  }

  public initInstance() {
    this.instance = new DynamicDataModel(this.modelSlug);
    for (let key in this.defaultValues) {
      this.instance.set(key, this.defaultValues[key]);
    }
  }

  private hasIncludeProperties(): boolean {
    return Array.isArray(this.includeProperties) && this.includeProperties.length > 0;
  }

  private hasExcludeProperties(): boolean {
    return Array.isArray(this.excludeProperties) && this.excludeProperties.length > 0;
  }

  @computedFrom('instance', 'includeProperties', 'excludeProperties')
  get properties(): Array<string> {
    if (!this.instance) return [];
    let rightInstance = this.instance instanceof DynamicDataModel;
    if (!rightInstance) {
      this.log.warn('Invalid instance');
      return [];
    }
    let properties: Array<string> = [];
    for (let property in this.instance.deco.propertyTypes) {
      if (this.hasIncludeProperties() && this.includeProperties.indexOf(property) === -1) continue;
      if (this.hasExcludeProperties() && this.excludeProperties.indexOf(property) !== -1) continue;
      properties.push(property);
    }
    return properties;
  }

  saved() {
    this.element.dispatchEvent(DOM.createCustomEvent('sent', {
      bubbles: true,
      detail: {
        instance: this.instance
      }
    }));
    this.initInstance();
    notify(this.success, {timeout: 30000});
    //notifier('main', {lifetime: 30000, hideOnClick: true})('', this.success, 'confirmation')
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
    }, 30000);
  }

  savingError(event) {
    if (event.detail && event.detail.error) {
      errorify(event.detail.error);
      //errorHandler('main', {hideOnClick: false, clearHandlerWhenIntercepted: true})(event.detail.error);
    }
  }

}
