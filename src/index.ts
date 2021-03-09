import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
export  { Container } from 'aurelia-dependency-injection';
export * from './deco';

export interface AureliaSwissdataConfig {
  api: {
    host: string,
    publicKey: string
  },
  registerMissingTranslationKeys: boolean;
  ipStack?: {
    apiKey?: string
  };
  version?: string;
}

let defaultSettings:AureliaSwissdataConfig = {
  api: {
    host: '',
    publicKey: ''
  },
  registerMissingTranslationKeys: true
}

export function configure(config: FrameworkConfiguration, pluginConfig?: AureliaSwissdataConfig) {
  let pConfig = Object.assign({}, defaultSettings, pluginConfig);
  config.container.registerInstance('aurelia-deco-config', pConfig);
  config.globalResources([

    PLATFORM.moduleName('./deco/attributes/decoedit'),
    PLATFORM.moduleName('./deco/components/form/deco-field'),
    PLATFORM.moduleName('./deco/components/form/deco-save'),
    PLATFORM.moduleName('./deco/components/form/deco-update'),
    PLATFORM.moduleName('./deco/components/form/deco-remove'),
    PLATFORM.moduleName('./deco/components/form/ux-file-input'),
    PLATFORM.moduleName('./deco/components/form/ad-dialog-model'),
    PLATFORM.moduleName('./deco/components/ad-image'),
    PLATFORM.moduleName('./deco/components/ad-images'),
    PLATFORM.moduleName('./deco/components/ad-country-selector'),
    PLATFORM.moduleName('./deco/components/ad-lang-selector'),

    PLATFORM.moduleName('./deco/dialogs/model-editor-default-form.html'),
    PLATFORM.moduleName('./deco/dialogs/model-editor-dialog'),
    PLATFORM.moduleName('./deco/dialogs/ref-language-dialog'),

    PLATFORM.moduleName('./components/address/address-control'),
    PLATFORM.moduleName('./components/address/address-dialog'),
    PLATFORM.moduleName('./components/address/address-item'),
    PLATFORM.moduleName('./components/address/select-address-control'),
    PLATFORM.moduleName('./components/address/select-address-dialog'),
    PLATFORM.moduleName('./components/login/swissdata-login'),
    PLATFORM.moduleName('./components/notification/swissdata-notification'),
    PLATFORM.moduleName('./components/dico2/dico'),
    PLATFORM.moduleName('./components/dico2/dico-dialog'),
    PLATFORM.moduleName('./components/dico/dico-translate-key-locale'),
    PLATFORM.moduleName('./components/form/swissdata-user-field'),
    PLATFORM.moduleName('./components/form/swissdata-field'),
    PLATFORM.moduleName('./components/contact/as-contact'),
    PLATFORM.moduleName('./components/getting-started/getting-started'),
    PLATFORM.moduleName('./components/getting-started/tour-step'),
    PLATFORM.moduleName('./components/request-recorder/request-recorder-tool'),
    PLATFORM.moduleName('./components/request-recorder/request-recorder-viewer'),
    PLATFORM.moduleName('./components/users/select-user'),
    PLATFORM.moduleName('./components/users/user-item'),
  ]);
}

/* Expose models */
export * from './models';

/* Expose actions */
export * from './state/actions';
import * as SdLoginActions from './state/sd-login-actions';
export { SdLoginActions };

/* Expose helpers */
export * from './helpers/swissdata-api';
export * from './helpers/request-recorder';
export * from './helpers/profile-helper';
export * from './helpers/analytics';
export * from './components/notification/swissdata-notification';
export * from './helpers/i18n-setup';
export * from './helpers/swissdata-global';
export * from './helpers/sd-login';

/* Expose elements */
export * from './components/address';
export { SwissdataLogin } from './components/login/swissdata-login';
export { SwissdataLoginTheme } from './components/login/swissdata-login-theme';
export * from './components/dico2/dico';
export * from './components/dico2/dico-dialog';
export * from './components/dico/dico-translate-key-locale';
export * from './components/form/swissdata-field';
export * from './components/form/swissdata-user-field';
export * from './components/contact/as-contact';
export * from './components/contact/as-contact-theme';
export * from './components/getting-started/getting-started';
export * from './components/getting-started/getting-started-theme';
export * from './components/getting-started/tour-step';
export * from './components/users/select-user';

/* Expose attributes */
//export { SmoothScroll } from './attributes/smooth-scroll';

/* Expose interfaces */
//export { StringTMap, NumberTMap, StringAnyMap, NumberAnyMap, StringStringMap, NumberStringMap, StringNumberMap, NumberNumberMap, StringBooleanMap, NumberBooleanMap} from './interfaces/types';

export * from './state';
export * from './decorators';