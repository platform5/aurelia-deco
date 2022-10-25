import { AppState, SwissdataState, SwissdataUser, Steps } from './interfaces';
import { DynamicDataModel } from '../models/dynamicdata.model';
import { NavigationInstruction } from 'aurelia-router';
import { ProfileModel } from '../models';
export declare function clearSwissdataState(state: AppState): AppState;
export declare function initSwissdataState(state: AppState): AppState;
export declare function setApiHost(state: AppState, host: string): AppState;
export declare function setState(state: AppState, swissDataState: SwissdataState): AppState;
export declare function setAccessToken(state: AppState, accessToken: string): AppState;
export declare function setDoubleAuthValidationToken(state: AppState, token: string): AppState;
export declare function authenticate(state: AppState, user: SwissdataUser, accessToken?: string, profile?: ProfileModel): AppState;
export declare function waitForDoubleAuth(state: AppState, doubleAuthValidationToken: string): AppState;
export declare function logout(state: AppState): AppState;
export declare function setLoginStep(state: AppState, step: Steps): AppState;
export declare function setSwissdataStateProps(state: AppState, keyValues: {
    [key: string]: any;
}): AppState;
export declare function setAppModels(state: AppState, prop: string, models: Array<DynamicDataModel>): AppState;
export interface CurrentRoute {
    name: string;
    params?: {
        [key: string]: any;
    };
}
export declare function setCurrentRoute(state: AppState, instruction: NavigationInstruction): AppState;
export declare function setOnline(state: AppState, online: 'unkown' | boolean): AppState;
export declare function setProfile(state: AppState, profile: ProfileModel): AppState;
export declare function clearProfile(state: AppState): AppState;
