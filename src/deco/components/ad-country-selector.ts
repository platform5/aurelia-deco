import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { observable, computedFrom, bindingMode } from 'aurelia-binding';
import { inject, Container } from 'aurelia-dependency-injection';
import { StyleEngine, UxInputComponent, normalizeBooleanAttribute, getBackgroundColorThroughParents } from '@aurelia-ux/core';
import { AdSelectorTheme } from './ad-selector-theme';
import { getLogger } from 'aurelia-logging';
import { DialogService } from 'aurelia-dialog';
import { DecoApi } from '../helpers/deco-api';
import { CountriesDialog } from 'aurelia-resources';
import { LanguagesDialog } from 'aurelia-resources';
const log = getLogger('ad-country-selector');
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component.css';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component--outline.css';
import { TaskQueue } from 'aurelia-framework';

export interface UxSelectorElement extends HTMLElement {
  value: any;
}

@inject(Element, StyleEngine, DialogService, DecoApi)
@customElement('ad-country-selector')
export class AdCountrySelector implements UxInputComponent {

  @bindable public disabled: any = false;
  @bindable public readonly: any = false;
  @bindable public theme: AdSelectorTheme;
  @bindable public label: string;
  @bindable public placeholder: string;
  @bindable public variant: 'filled' | 'outline' = 'filled';
  @bindable public dense: any = false;

  @bindable public countries: Array<string> = [];
  @bindable public prefix: string = '';
  @bindable public bindToState: boolean = false;

  @observable
  public focused: boolean = false;

  @bindable({defaultBindingMode: bindingMode.twoWay}) value: string;

  constructor(private element: UxSelectorElement, public styleEngine: StyleEngine, private dialogService: DialogService, private deco: DecoApi, private taskQueue: TaskQueue) {
    Object.setPrototypeOf(element, uxInputElementProto);
  }

  public bind() {
    this.dense = normalizeBooleanAttribute('dense', this.dense);
    this.themeChanged(this.theme);
  }

  public get countriesList() {
    if (this.countries && this.countries.length > 0) {
      return this.countries;
    }
    const countries = this.deco.state.countries
    if (Array.isArray(countries) && countries.length > 0) {
      return countries;
    }
    return [];
  }

  public attached() {
    this.variantChanged(this.variant);
  }

  public detached() {
  }

  public getValue() {
    return this.value;
  }

  @computedFrom('bindToState', 'deco.state.country')
  public get displayValue() {
    if (this.bindToState) {
      return this.deco.state.country;
    } else {
      return this.value;
    }
  }

  public async setValue(value: any) {
    if (this.value !== value) {
      this.value = value;
      if (this.bindToState) {
        await this.deco.store.dispatch('setCountry', this.value);
      }
      if (this.taskQueue) {
        this.taskQueue.queueMicroTask(() => {
          this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true, detail: this.value }));
        });
      } else {
        setTimeout(() => {
          this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true, detail: this.value }));
        }, 5);
      }
    }
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'ad-selector';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public focusedChanged(focused: boolean) {
    this.element.classList.toggle('ux-input-component--focused', focused);

    this.element.dispatchEvent(DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
  }

  public focus() {
    this.focused = true;
    this.openDialog();
  }

  public openDialog() {
    this.dialogService.open({ viewModel: CountriesDialog, model: {country: this.displayValue, countries: this.countriesList, prefix: this.prefix}, centerHorizontalOnly: true, overlayDismiss: true }).whenClosed(response => {
      if (!response.wasCancelled) {
        this.setValue(response.output);
      }
      this.focused = false;
    });
  }

  public variantChanged(newValue: string) {
    this.element.style.backgroundColor = newValue === 'outline' ?
      this.element.style.backgroundColor = getBackgroundColorThroughParents(this.element) :
      '';
  }

  @computedFrom('label')
  get placeholderMode(): boolean {
    return typeof this.label !== 'string' || this.label.length === 0;
  }

}

function stopEvent(e: Event) {
  e.stopPropagation();
}

const getVm = <T>(_: any) => _.au.controller.viewModel as T;
const uxInputElementProto = Object.create(HTMLElement.prototype, {
  value: {
    get() {
      return getVm<AdCountrySelector>(this).getValue();
    },
    set(value: any) {
      getVm<AdCountrySelector>(this).setValue(value);
    }
  }
});
