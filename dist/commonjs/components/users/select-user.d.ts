import { UserModel } from './../../models/user.model';
import { UxModalService, UxModalServiceResult } from '@aurelia-ux/modal';
import { Model } from '../../deco';
import { SwissdataApi } from '../../helpers/swissdata-api';
export declare class SelectUser {
    private swissdataApi;
    private modalService;
    model: typeof Model;
    suffix: string;
    items: Array<Model>;
    sortingOptions: string[];
    limit: number;
    skip: number;
    currentCount?: number;
    search: string;
    sort: string;
    userId: string;
    disableIds: Array<string>;
    constructor(swissdataApi: SwissdataApi, modalService: UxModalService);
    activate(params: any): void;
    init(): Promise<void>;
    private fetchingItems;
    fetchItems(): Promise<Model[]>;
    getMoreItems(_scrollContext: any): Promise<void>;
    private searchTimeout;
    searchChanged(): void;
    sortChanged(): void;
    selectUser(user: UserModel): void;
    canDeactivate(result: UxModalServiceResult): Promise<boolean>;
}
