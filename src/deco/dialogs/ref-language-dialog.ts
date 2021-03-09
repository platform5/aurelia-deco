import { DecoApi } from '../helpers/deco-api';
import { inject } from 'aurelia-framework';

@inject(DecoApi)
export class RefLanguageDialog {
  constructor(public deco: DecoApi) {

  }

  public toggleRefLanguage(language: string) {
    if (this.deco.state.languages.indexOf(language) !== -1) {
      if (this.deco.state.refLanguage === language) {
        this.deco.store.dispatch('setRefLanguage', '');  
      } else {
        this.deco.store.dispatch('setRefLanguage', language);
      }
    }
  }
}
