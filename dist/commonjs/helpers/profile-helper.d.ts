import { SwissdataApi } from './swissdata-api';
import { ProfileModel } from '../models/profile.model';
import { UserModel } from '../models/user.model';
export declare class ProfileHelper {
    private swissdataApi;
    private static _swissdataApi;
    static profileInstance: ProfileModel;
    static get swissdataApi(): SwissdataApi;
    constructor(swissdataApi: SwissdataApi);
    static registerActions(): void;
    static getCurrentProfile(): Promise<void>;
    static getEditingInstance(): ProfileModel;
    static getEditingUserInstance(): UserModel;
    static clearProfile(): Promise<void>;
}
