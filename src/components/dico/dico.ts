import { I18N } from 'aurelia-i18n';
import { DicoModel } from '../../models/dico.model';
import { inject, NewInstance, BindingEngine } from 'aurelia-framework';
import { type } from '../../deco';
import { SwissdataApi } from '../../helpers/swissdata-api';
import { errorify } from 'aurelia-resources';
import { ValidationController, validateTrigger } from 'aurelia-validation';

interface ModelConfigField {
  name: string;
  typeDecorator: type.TypeDecorator;
  options: any;
}

export interface TranslationItem {
  key: string;
  iteration: number;
  locales: {[key: string]: DicoModel};
}

@inject(I18N,  SwissdataApi, NewInstance.of(ValidationController), BindingEngine)
export class Dico {

  defaultLanguage: string = 'fr';
  languages: Array<string> = ['fr'];

  public newDicoElement: DicoModel;

  //{
  //  'admin.dico.en': {
  //    'en': DicoModel,
  //    'fr': DicoModel
  //  }
  //}
  public allDicoItemsByLocale: Array<TranslationItem> = [];

  public showedKeys: Array<string> = [];
  public showedLanguages: Array<string> = ['fr'];
  public updateItems: number = 0;

  private viewAddElement: boolean = false;

  private subscription: any;
  private subscription2: any;

  private processing: boolean = false;

  constructor(private i18n: I18N, private api:  SwissdataApi, public validationController: ValidationController, public bindingEngine: BindingEngine) {
    this.subscription = this.bindingEngine.collectionObserver(this.showedKeys)
          .subscribe(() => {
            this.updateItems++;
            window.localStorage.setItem(`${this.api.state.swissdata.publicKey}-dico-key`, JSON.stringify(this.showedKeys));
          });
    this.subscription2 = this.bindingEngine.collectionObserver(this.showedLanguages)
          .subscribe(() => {
            this.getDico();
          });
    this.validationController.validateTrigger = validateTrigger.change;
  }

  deactivate() {
    if (this.subscription) this.subscription.dispose()
    if (this.subscription2) this.subscription2.dispose()
  }

  get keys() {
    let keys: Array<string> = [];
    for (let item of this.allDicoItemsByLocale) {
      if (item.key.indexOf('.') === -1) {
        if (keys.indexOf('') === -1) keys.push('');
        continue;
      }
      let key = item.key.split('.')[0];
      if (keys.indexOf(key) === -1) {
        keys.push(key);
      }
    }
    keys.sort();
    return keys;
  }

  public setLanguage(language) {
    this.api.store.dispatch('setLanguage', language);
    // this.i18n.setLocale(locale);
  }

  activate() {
    try {
      const keys = JSON.parse(window.localStorage.getItem(`${this.api.state.swissdata.publicKey}-dico-key`));
      if (!Array.isArray(keys)) throw new Error('Invalid keys');
      for (let key of keys) {
        if (typeof key === 'string') {
          this.showedKeys.push(key);
        }
      }
    } catch {
      // ignore
    }
    this.defaultLanguage = this.api.state.language;
    this.languages = this.api.state.languages;
    this.getDico();
  }

  getDico() {
    this.updateItems++;
    let promises: Array<Promise<any>> = [];
    this.allDicoItemsByLocale = [];
    this.processing = true;
    for (let language of this.showedLanguages) {
      promises.push(DicoModel.getAll('?locale=' + language).then((elements) => {
        for (let item of (elements as Array<DicoModel>)) {
          this.addItemToDico(item.key, language, item);
        }
      }));
    }
    return Promise.all(promises).then(() => {
      this.processing = false;
    }).catch((error) => {
      this.processing = false;
      errorify(error);
    });
  }

  addItemToDico(key, locale, item: DicoModel) {
    for (let existingItem of this.allDicoItemsByLocale) {
      if (existingItem.key === key) {
        if (!existingItem.locales) existingItem.locales = {};
        existingItem.iteration++;
        existingItem.locales[locale] = item;
        return;
      }
    }
    // if not found, add to the list
    let newItem: TranslationItem = {
      key: key,
      iteration: 0,
      locales: {}
    };
    newItem.locales[locale] = item;
    this.allDicoItemsByLocale.push(newItem);
  }

  showViewAddElement() {
    this.viewAddElement = true;
    this.newDicoElement = new DicoModel();
  }

  newDicoSaved() {
    this.viewAddElement = false;
    this.getDico();
  }
  
  dicoRemoved(event) {
    this.getDico();
  }

}


export class ContextValueConverter {
  toView(value) {
    if (value.indexOf('.') === -1) return '';
    let split = value.split('.');
    let context = split.splice(0, split.length - 1).join(' > ');
    return context;
  }
}

export class KeyValueConverter {
  toView(value) {
    if (value.indexOf('.') === -1) return value;
    return value.split('.').splice(-1, 1)[0];
  }
}

export class FilterContextValueConverter {
  toView(items, keys, updateItems) {
    if (!keys || !Array.isArray(keys) || keys.length === 0) return this.sort(items);
    let returneditems: Array<DicoModel> = [];
    for (let item of items) {
      if (item.key.indexOf('.') === -1 && keys.indexOf('') !== -1) {
        returneditems.push(item);
      } else {
        let key = item.key.split('.')[0];
        if (keys.indexOf(key) !== -1) {
          returneditems.push(item);
        }
      }
    }
    return this.sort(returneditems);
  }

  sort(items) {
    items.sort((a,b) => {
      if(a.key < b.key) { return -1; }
      if(a.key > b.key) { return 1; }
      return 0;
    });
    return items;
  }
}
