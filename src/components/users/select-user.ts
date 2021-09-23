import { UserModel } from './../../models/user.model';
import { UxModalService, UxModalServiceResult } from '@aurelia-ux/modal';
import { Model } from '../../deco';
import { inject, observable } from 'aurelia-framework';
import { errorify } from 'aurelia-resources';
import { getLogger } from 'aurelia-logging';
import { SwissdataApi } from '../../helpers/swissdata-api';
const log = getLogger('select-user');

@inject(SwissdataApi, UxModalService)
export class SelectUser {

  public model: typeof Model;
  public suffix: string;
  public items: Array<Model> = [];
  public sortingOptions: string[] = ['firstname', 'name', '_updatedAt'];

  public limit = 50;
  public skip = 0;
  public currentCount?: number;
  @observable public search: string = '';
  @observable public sort: string = 'firstname';
  @observable public userId: string;
  public disableIds: Array<string> = [];

  constructor(private swissdataApi:  SwissdataApi, private modalService: UxModalService) {
    this.model = UserModel;
    this.suffix = '&autoFetch=profile';
  }

  public activate(params: any) {
    log.debug('activate', params);
    if (params.userId) {
      log.debug('set userId', params);
      this.userId = params.userId;
    }
    if (params.disableIds) {
      this.disableIds = params.disableIds;
    }
    if (Array.isArray(params?.availabledIds) && params.availabledIds.length > 0) {
      this.suffix += `&id=${params.availabledIds.join(',')}`;
    }
    this.init();
  }

  public async init() {
    this.skip = 0;
    const firstItems = await this.fetchItems();
    this.items = firstItems;
  }

  private fetchingItems: boolean = false;
  public async fetchItems() {
    this.fetchingItems = true;
    await this.swissdataApi.isReady();
    const language = this.swissdataApi.state.language;
    const refLanguage = this.swissdataApi.state.refLanguage;
    try {
      let suffix: string = `?locale=${language}&reflocale=${refLanguage}&sort=${this.sort}&limit=${this.limit}&skip=${this.skip}`;
      if (this.search) {
        suffix += `&q=${this.search}`;
      }
      if (this.suffix) {
        suffix += this.suffix;
      }
      const items = await this.model.getAll(suffix, {
        includeResponse: true,
        route: `/search-user`
      });
      const response = (items as any)._response;
      const total = response[0]?.__count;
      if (total !== undefined) {
        this.currentCount = total;
      } else {
        this.currentCount = undefined;
      }
      this.fetchingItems = false;
      this.skip += this.limit;
      return items;
    } catch (error) {
      errorify(error);
      this.fetchingItems = false;
      return [];
    }
  }

  public async getMoreItems(_scrollContext: any) {
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

  public selectUser(user: UserModel) {
    if (this.disableIds.indexOf(user.id) !== -1) {
      return;
    }
    this.userId = user.id;
    this.modalService.ok(this.userId);
  }

  public async canDeactivate(result: UxModalServiceResult) {
    if (result.wasCancelled) {
      return true;
    }
    if (!result.output && !this.userId) {
      errorify(new Error('Select a user'));
      return false;
    }
    result.output = this.userId;
    return true;
  }
}
