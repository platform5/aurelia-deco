import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { observable, computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxInputComponent, normalizeBooleanAttribute, getBackgroundColorThroughParents } from '@aurelia-ux/core';
import { AdSelectorTheme } from './ad-selector-theme';
import { getLogger } from 'aurelia-logging';
import { DialogService } from 'aurelia-dialog';
import { DecoApi } from '../helpers/deco-api';
import { LanguagesDialog } from 'aurelia-resources';
const log = getLogger('ad-lang-selector');
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component.css';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component--outline.css';
import { TaskQueue } from 'aurelia-framework';

export interface UxSelectorElement extends HTMLElement {
  value: any;
}

@inject(Element, StyleEngine, DialogService, DecoApi, TaskQueue)
@customElement('ad-lang-selector')
export class AdLangSelector implements UxInputComponent {

  @bindable public disabled: any = false;
  @bindable public readonly: any = false;
  @bindable public theme: AdSelectorTheme;
  @bindable public label: string;
  @bindable public placeholder: string;
  @bindable public variant: 'filled' | 'outline' = 'filled';
  @bindable public dense: any = false;

  @bindable public languages: Array<string> = [];
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

  public get languagesList() {
    if (this.languages && this.languages.length > 0) {
      return this.languages;
    }
    const languages = this.deco.state.languages
    if (Array.isArray(languages) && languages.length > 0) {
      return languages;
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

  @computedFrom('bindToState', 'deco.state.language')
  public get displayValue() {
    if (this.bindToState && this.deco.state) {
      return this.deco.state.language;
    } else {
      return this.value;
    }
  }

  public async setValue(value: any) {
    if (this.value !== value) {
      this.value = value;
      if (this.bindToState) {
        await this.deco.store.dispatch('setLanguage', this.value);
      }
      this.taskQueue.queueMicroTask(() => {
        this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true, detail: this.value }));
      });
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
    this.dialogService.open({ viewModel: LanguagesDialog, model: {language: this.displayValue, languages: this.languagesList, prefix: this.prefix}, centerHorizontalOnly: true, overlayDismiss: true }).whenClosed(response => {
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
      return getVm<AdLangSelector>(this).getValue();
    },
    set(value: any) {
      getVm<AdLangSelector>(this).setValue(value);
    }
  }
});
