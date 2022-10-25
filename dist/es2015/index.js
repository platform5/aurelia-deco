import { PLATFORM } from 'aurelia-framework';
import { ValidationMessageProvider } from 'aurelia-validation';
import { I18N } from 'aurelia-i18n';
export { Container } from 'aurelia-dependency-injection';
export * from './deco';
var defaultSettings = {
    api: {
        host: '',
        publicKey: ''
    },
    registerMissingTranslationKeys: true
};
export function configure(config, pluginConfig) {
    var pConfig = Object.assign({}, defaultSettings, pluginConfig);
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
        PLATFORM.moduleName('./components/users/select-user-control'),
        PLATFORM.moduleName('./components/users/select-user'),
        PLATFORM.moduleName('./components/users/user-item'),
    ]);
    // Default Validation messages by key
    // default: "${$displayName} is invalid.",
    // required: "${$displayName} is required.",
    // matches: "${$displayName} is not correctly formatted.",
    // email: "${$displayName} is not a valid email.",
    // minLength: "${$displayName} must be at least ${$config.length} character${$config.length === 1 ? '' : 's'}.",
    // maxLength: "${$displayName} cannot be longer than ${$config.length} character${$config.length === 1 ? '' : 's'}.",
    // minItems: "${$displayName} must contain at least ${$config.count} item${$config.count === 1 ? '' : 's'}.",
    // maxItems: "${$displayName} cannot contain more than ${$config.count} item${$config.count === 1 ? '' : 's'}.",
    // min: "${$displayName} must be at least ${$config.constraint}.",
    // max: "${$displayName} must be at most ${$config.constraint}.",
    // range: "${$displayName} must be between or equal to ${$config.min} and ${$config.max}.",
    // between: "${$displayName} must be between but not equal to ${$config.min} and ${$config.max}.",
    // equals: "${$displayName} must be ${$config.expectedValue}.",
    var i18n = config.container.get(I18N);
    ValidationMessageProvider.prototype.getMessage = function (key) {
        var translation = i18n.tr("global.validationMessages." + key);
        return this.parser.parse(translation);
    };
    ValidationMessageProvider.prototype.getDisplayName = function (propertyName, displayName) {
        if (displayName !== null && displayName !== undefined) {
            return typeof displayName === 'string' ? displayName : displayName();
        }
        return i18n.tr(propertyName);
    };
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
