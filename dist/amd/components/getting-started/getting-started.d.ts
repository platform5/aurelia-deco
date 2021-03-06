import { AppState } from './../../state/interfaces';
import { ValidationControllerFactory, ValidationController } from 'aurelia-validation';
import { I18N } from 'aurelia-i18n';
import { ArNext } from 'aurelia-resources';
import { SdLogin } from '../../helpers/sd-login';
import { StyleEngine } from '@aurelia-ux/core';
import { DialogService } from 'aurelia-dialog';
declare type StepTypes = 'pre-account' | 'post-account' | 'accounts-list' | 'login' | 'password' | 'create-account' | 'create-account-part2' | 'validate-account' | 'forgot-password' | 'reset-password';
export declare class GettingStarted {
    private element;
    private styleEngine;
    private sdLogin;
    private i18n;
    validationControllerFactory: ValidationControllerFactory;
    private dialogService;
    private locales;
    private theme;
    step: StepTypes;
    private username;
    private password;
    private firstname;
    private lastname;
    newAccountUsername: string;
    private newAccountUsernameAsEmail;
    private newAccountPassword;
    private code;
    private extraData;
    private forgotUsername;
    private forgotNewPassword;
    private forgotCode;
    arNextStart: ArNext;
    private nbStepPreAccount;
    private nbStepPostAccount;
    private nbStepPostLogin;
    private w;
    private h;
    private handleResize;
    private keyboardPlugin;
    private handleKeyboardUp;
    private handleKeyboardDown;
    private keyboardHeight;
    private window;
    private body;
    private html;
    private arNextElement;
    private swissdataConfig;
    validationController: ValidationController;
    processing: boolean;
    private subscriptions;
    private createAccountMemory;
    constructor(element: HTMLElement, styleEngine: StyleEngine, sdLogin: SdLogin, i18n: I18N, validationControllerFactory: ValidationControllerFactory, dialogService: DialogService);
    bind(): void;
    attached(): void;
    detached(): void;
    get compensationHeight(): Number;
    private fixSlots;
    newAccountUsernameChanged(): void;
    private showUsernameField;
    private showPasswordField;
    private setStep;
    private focusFirstInputIn;
    goToStart(): void;
    goToAccountsList(): void;
    loginWithUsername(username: string): void;
    goToLogin(): void;
    private prepareUsernameForApi;
    checkUsername(): Promise<any>;
    openLanguageDialog(): void;
    goToPassword(): void;
    authenticate(): void;
    private login;
    goToCreateAnAccount(): void;
    goToCreateAnAccountPart2(): Promise<any>;
    createAccount(): Promise<any>;
    validateCode(): Promise<any>;
    sendValidationCodeAgain(): Promise<any>;
    cancelAccountCreation(): void;
    goToForgetPassword(username: 'string'): void;
    requestResetPasswordCode(): Promise<any>;
    goToResetPassword(): void;
    sendForgotPasswordCode(): any;
    resetPassword(): any;
    goToPostLogin(): void;
    goToPostAccount(): void;
    get state(): AppState | {};
    stepChanged(): void;
    private saveCreateAccountMemory;
    private fetchCreateAccountMemory;
    private clearCreateAccountMemory;
    private continueFromCreateAccountMemory;
}
export declare class GettingStartedStartCustomAttribute {
    private element;
    constructor(element: Element);
    attached(): void;
}
export {};
