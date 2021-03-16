import { AuthenticationControl } from './authentication-control';
import { UserModel } from './../models/user.model';
import { DecoApi, DecoInitOptions, Store, EnsureModel } from '../deco';
import { SwissdataState, AppState } from '../state/interfaces';
import { Container } from 'aurelia-framework';
import 'whatwg-fetch';
import { NavigationInstruction } from 'aurelia-router';
export interface SwissdataInitOptions extends DecoInitOptions {
}
export declare class SwissdataApi extends DecoApi {
    state: AppState;
    private subscription;
    ready: boolean;
    authenticationControl: AuthenticationControl;
    get ensureUsers(): EnsureModel<typeof UserModel>;
    constructor(http: any);
    private swissdataInitDone;
    init(store: Store<AppState>, options?: SwissdataInitOptions): Promise<any>;
    setState(state: SwissdataState): void;
    defaultOptions(options?: any): any;
    extendEntrpoint(entrypoint: string): string;
    addAppId(entrypoint: string): string;
    isReady(): Promise<void>;
    private checkStatusInterval;
    private checkStatus;
    startCheckStatus(interval: number, unit?: 'milliseconds' | 'seconds'): void;
    stopCheckingStatus(): void;
    ensureAuthentication(): Promise<boolean>;
    checkAuthentication(): Promise<boolean>;
    authenticate(username: string, password: string): Promise<boolean>;
    doubleAuth(code: string): Promise<boolean>;
    setAccessToken(token: any): Promise<boolean>;
    setCurrentUser(): Promise<boolean>;
    setDoubleAuth(token: any): Promise<boolean>;
    logout(): Promise<void>;
    requestResetPassword(emailOrMobile: string): Promise<any>;
    resetPassword(token: any, code: any, newPassword: any): Promise<any>;
    hideOnboarding(): Promise<any>;
    private setStateAsUnauthenticated;
    private setStateAsAuthenticated;
}
export declare class AuthorizeStep {
    private container;
    constructor(container?: Container);
    static redirectUnauthenticatedTo: string;
    run(navigationInstruction: NavigationInstruction, next: any): any;
}
