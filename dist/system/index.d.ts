import { FrameworkConfiguration } from 'aurelia-framework';
export { Container } from 'aurelia-dependency-injection';
export * from './deco';
export interface AureliaSwissdataConfig {
    api: {
        host: string;
        publicKey: string;
    };
    registerMissingTranslationKeys: boolean;
    ipStack?: {
        apiKey?: string;
    };
    version?: string;
    clientUrl?: string;
}
export declare function configure(config: FrameworkConfiguration, pluginConfig?: AureliaSwissdataConfig): void;
export * from './models';
export * from './state/actions';
import * as SdLoginActions from './state/sd-login-actions';
export { SdLoginActions };
export * from './helpers/swissdata-api';
export * from './helpers/request-recorder';
export * from './helpers/profile-helper';
export * from './helpers/analytics';
export * from './components/notification/swissdata-notification';
export * from './helpers/i18n-setup';
export * from './helpers/swissdata-global';
export * from './helpers/sd-login';
export * from './components/address';
export { SwissdataLogin } from './components/login/swissdata-login';
export { SwissdataLoginTheme } from './components/login/swissdata-login-theme';
export * from './components/dico2/dico';
export * from './components/dico2/dico-dialog';
export * from './components/dico/dico-translate-key-locale';
export * from './components/form/swissdata-field';
export * from './components/form/swissdata-user-field';
export * from './components/contact/as-contact';
export * from './components/contact/as-contact-theme';
export * from './components/getting-started/getting-started';
export * from './components/getting-started/getting-started-theme';
export * from './components/getting-started/tour-step';
export * from './components/users/select-user-control';
export * from './components/users/select-user';
export * from './state';
export * from './decorators';
