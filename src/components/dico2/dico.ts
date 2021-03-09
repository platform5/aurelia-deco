import { UxModalService } from '@aurelia-ux/modal';
import { inject, observable, NewInstance, Container } from 'aurelia-framework';
import { getLogger } from 'aurelia-logging';
import { errorify } from 'aurelia-resources';
import { DicoModel } from '../../models';
import { jsonify } from '../../deco';
import { HttpClient } from 'aurelia-fetch-client';
import { DicoDialog } from './dico-dialog';
import { SwissdataGlobal } from './../../helpers/swissdata-global';
const log = getLogger('dico');

const googleApiKey = 'AIzaSyAfTjyWuowZAAQWZ0t6dB8yyvJpq3HMAf4';

@inject(Container, UxModalService, NewInstance.of(HttpClient))
export class Dico {

  public model: typeof DicoModel = DicoModel;
  public suffix: string;
  public items: Array< DicoModel> = [];
  public sortingOptions: string[] = ['key', '-_updatedAt'];

  public limit = 50;
  public skip = 0;
  public currentCount?: number;
  @observable public search: string = '';
  @observable public sort: string = '-_updatedAt';
  
  private nbElements: number = 0;
  private contexts: string[] = [];
  private selectedContexts: string[] = [];

  private canEdit: boolean = false;
  public global: SwissdataGlobal;

  constructor(private container: Container, private modalService: UxModalService, private http: HttpClient) {
    this.http.configure((config) => {
      config.useStandardConfiguration()
      config.withBaseUrl('https://translation.googleapis.com/language/translate/v2')
    });
    setTimeout(async () => {
      // this.addUserWhereMissing();
    }, 500);
  }

  public activate() {
    this.global = this.container.get('sd-global');
    const roles = this.global.state.swissdata.user?.roles || [];
    this.canEdit = false;
    if (roles.includes('admin')) {
      this.canEdit = true;
    }
    try {
      const dicoViewSettings: any = JSON.parse(localStorage.getItem(`${this.global.state.swissdata.publicKey}-dico-view-settings`));
      this.search = dicoViewSettings.search || '';
      this.sort = dicoViewSettings.sort || '-_updatedAt';
      this.selectedContexts = dicoViewSettings.selectedContexts || [];
    } catch (error) {}
  }

  public async init() {
    this.skip = 0;
    this.fetchNbDico();
    this.fetchContexts();
    const firstItems = await this.fetchItems();
    this.items = firstItems;
    const dicoViewSettings = {
      search: this.search,
      sort: this.sort,
      selectedContexts: this.selectedContexts
    };
    localStorage.setItem(`${this.global.state.swissdata.publicKey}-dico-view-settings`, JSON.stringify(dicoViewSettings));
  }

  private async fetchNbDico(): Promise<void> {
    const items: any = await DicoModel.getAll(`?limit=1&skip=0`, {includeResponse: true});
    const total = items.length === 0 ? 0 : items?._response[0]?.__count;
    if (total !== undefined) {
      this.nbElements = total;
    }
  }

  private async fetchContexts(): Promise<void> {
    if (!this.global && this.container) {
      this.global = this.container.get('sd-global');
    }
    if (!this.global) {
      return;
    }
    const contexts: any = await this.global.swissdataApi.get(`/dico/contexts`).then(jsonify);
    this.contexts = contexts;
  }

  private fetchingItems: boolean = false;
  public async fetchItems(): Promise<any> {
    if (!this.global && this.container) {
      this.global = this.container.get('sd-global');
    }
    if (!this.global) {
      return;
    }
    this.fetchingItems = true;
    const language = this.global.state.language;
    const refLanguage = this.global.state.refLanguage || '';

    let contextFilter = '';
    if (Array.isArray(this.selectedContexts) && this.selectedContexts.length > 0) {
      contextFilter = `&key=${this.selectedContexts.join(',')}`;
    }

    try {
      let suffix: string = `?locale=${language}&reflocale=${refLanguage}&sort=${this.sort}&limit=${this.limit}&skip=${this.skip}${contextFilter}`;
      if (this.search) {
        suffix += `&q=${this.search}`;
      }
      if (this.suffix) {
        suffix += this.suffix;
      }
      const items = await this.model.getAll(suffix, {includeResponse: true});
      const response = (items as any)._response;
      const total = response[0]?.__count;
      if (total !== undefined) {
        this.currentCount = total;
      } else {
        this.currentCount = undefined;
      }
      this.fetchingItems = false;
      this.skip += this.limit;
      this.global.ensureUsers.ensureIds(items.filter(i => i._updatedBy).map(i => i._updatedBy));
      return items;
    } catch (error) {
      errorify(error);
      this.fetchingItems = false;
      return [];
    }
  }

  public async getMoreItems(_scrollContext: any) {
    if (_scrollContext.isAtTop) {
      return;
    }
    if (this.skip > this.currentCount) {
      return;
    }
    if (!this.fetchingItems) {
      const newItems = await this.fetchItems();
      this.items.push(...newItems);
    }
  }

  private searchTimeout: any;
  public searchChanged() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.init();
    }, 500);
  }

  public sortChanged() {
    this.init();
  }

  public selectedContextsChanged() {
    this.init();
  }

  public async openAddDicoDialog() {
    const modal = await this.modalService.open({
      viewModel: DicoDialog,
      keyboard: ['Escape'],
      model: {}
    });
    modal.whenClosed().then((result) => {
      if (!result.wasCancelled) {
        // TODO: get the updated dico back in the view
        this.init();
      }
    });
  }

  public async openEditDicoDialog(dico: DicoModel) {
    const _refLocales = dico._refLocales;
    const editedDico = new DicoModel();
    await editedDico.updateInstanceFromElement(dico);
    const modal = await this.modalService.open({
      viewModel: DicoDialog, 
      keyboard: ['Escape'],
      model: {dico: editedDico}
    });
    modal.whenClosed().then((result) => {
      if (!result.wasCancelled && result.output instanceof DicoModel) {
        for (let dico of this.items) {
          if (dico.id === result.output.id) {
            dico.updateInstanceFromElement(result.output).then(() => {
              dico._refLocales = _refLocales;
            });
          }
        }
      } else if (!result.wasCancelled && result.output === 'remove') {
        const ids = this.items.map(i => i.id);
        const index = ids.indexOf(editedDico.id);
        if (index !== -1) {
          this.items.splice(index, 1);
        }
      }
    });
  }

  public async addUserWhereMissing(): Promise<any> {
    const items = await DicoModel.getAll(`?_createdBy=`, {includeResponse: true});

    for (const item of items) {
      item.tags = item.tags || [];
      if (item.tags.includes('dico-tool')) {
        continue;
      }
      await item.updateProperties('', ['tags']);
      await new Promise(resolve => setTimeout(resolve, 20));
    }

  }

  public async addCertifiedTag(): Promise<any> {
    const items = await DicoModel.getAll(``, {includeResponse: true});

    for (const item of items) {
      item.tags = item.tags || [];
      if (item.tags.includes('certified')) {
        continue;
      }
      item.tags.push('certified');
      await item.updateProperties('', ['tags']);
      await new Promise(resolve => setTimeout(resolve, 20));
    }

  }

  public async getKeysWithoutHumanTranslation(): Promise<DicoModel[]> {
    return await DicoModel.getAll(`?_createdBy=&locale=all`, {includeResponse: true});
  }

  public async autoTranslate(): Promise<void> {
    const keysNeededTranslation = await this.getKeysWithoutHumanTranslation();
    for (const dicoElement of keysNeededTranslation) {
      const value: any = dicoElement.value;
      const frTranslation = await this.requestGoogleTranslation(value.en, 'fr');
      const itTranslation = await this.requestGoogleTranslation(value.en, 'it');
      const deTranslation = await this.requestGoogleTranslation(value.en, 'de');
      value.fr = frTranslation;
      value.it = itTranslation;
      value.de = deTranslation;
      dicoElement.tags = (dicoElement.tags || []);
      dicoElement.tags.push('auto-translate');
      await dicoElement.updateProperties('?locale=', ['value', 'tags'])
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  public async requestGoogleTranslation(text: string, target: 'de' | 'fr' | 'it' | 'en', original: 'de' | 'fr' | 'it' | 'en' = 'en'): Promise<string> {
    try {
      const response = await this.http.post(`?key=${googleApiKey}`, JSON.stringify({q: text, source: original, target, format: 'text'}));
      const json = await response.json();
      return json.data.translations[0].translatedText;
    } catch (error) {
      throw error;
    }
  }

}
