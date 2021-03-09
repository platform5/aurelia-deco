import { DicoModel } from '../../models/dico.model';
import { inject, bindable, BindingEngine } from 'aurelia-framework';
import { TranslationItem } from './dico';

@inject(BindingEngine)
export class DicoTranslateKeyLocale {

  @bindable iteration: number;
  @bindable key: string;
  @bindable locale: string;
  @bindable allDicoItemsByLocale: Array<TranslationItem> = [];
  visible: boolean = false;
  instance: DicoModel | null = null;

  subscription: any;

  constructor(private bindingEngine: BindingEngine) {
    this.bindingEngine.collectionObserver(this.allDicoItemsByLocale)
      .subscribe(() => {
        this.setInstance();
      });
  }

  bind() {
    this.setInstance();
    setTimeout(() => {
      //this.setInstance();
    }, 1000);
  }

  iterationChanged() {
    this.setInstance();
  }

  localeChanged() {
    this.setInstance();
  }

  allDicoItemsByLocaleChanged() {
    this.setInstance();
  }

  attached() {

  }

  detached() {
    if (this.subscription) this.subscription.dispose();
  }

  setInstance() {
    for (let item of this.allDicoItemsByLocale) {
      if (item.key === this.key) {
        if (item.locales && item.locales[this.locale] && item.locales[this.locale] instanceof DicoModel) {
          this.instance = item.locales[this.locale];
          return;
        } else  if (item.locales) {
          this.subscription = this.bindingEngine.propertyObserver(item, 'locales')
          .subscribe(() => {
            this.setInstance();
          });
        }
      }
    }
    this.instance = null;
  }

  suffixFromLocale(locale) {
    return '?locale=' + locale;
  }

  valueChanged() {
    if (this.instance) {
      this.instance.updateProperties(this.suffixFromLocale(this.locale), ['value'])
    }
  }



}
