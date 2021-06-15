"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwissdataLoginTheme = exports.SwissdataLogin = exports.SdLoginActions = exports.configure = exports.Container = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_validation_1 = require("aurelia-validation");
var aurelia_i18n_1 = require("aurelia-i18n");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return aurelia_dependency_injection_1.Container; } });
__exportStar(require("./deco"), exports);
var defaultSettings = {
    api: {
        host: '',
        publicKey: ''
    },
    registerMissingTranslationKeys: true
};
function configure(config, pluginConfig) {
    var pConfig = Object.assign({}, defaultSettings, pluginConfig);
    config.container.registerInstance('aurelia-deco-config', pConfig);
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./deco/attributes/decoedit'),
        aurelia_framework_1.PLATFORM.moduleName('./deco/components/form/deco-field'),
        aurelia_framework_1.PLATFORM.moduleName('./deco/components/form/deco-save'),
        aurelia_framework_1.PLATFORM.moduleName('./deco/components/form/deco-update'),
        aurelia_framework_1.PLATFORM.moduleName('./deco/components/form/deco-remove'),
        aurelia_framework_1.PLATFORM.moduleName('./deco/components/form/ux-file-input'),
        aurelia_framework_1.PLATFORM.moduleName('./deco/components/form/ad-dialog-model'),
        aurelia_framework_1.PLATFORM.moduleName('./deco/components/ad-image'),
        aurelia_framework_1.PLATFORM.moduleName('./deco/components/ad-images'),
        aurelia_framework_1.PLATFORM.moduleName('./deco/components/ad-country-selector'),
        aurelia_framework_1.PLATFORM.moduleName('./deco/components/ad-lang-selector'),
        aurelia_framework_1.PLATFORM.moduleName('./deco/dialogs/model-editor-default-form.html'),
        aurelia_framework_1.PLATFORM.moduleName('./deco/dialogs/model-editor-dialog'),
        aurelia_framework_1.PLATFORM.moduleName('./deco/dialogs/ref-language-dialog'),
        aurelia_framework_1.PLATFORM.moduleName('./components/address/address-control'),
        aurelia_framework_1.PLATFORM.moduleName('./components/address/address-dialog'),
        aurelia_framework_1.PLATFORM.moduleName('./components/address/address-item'),
        aurelia_framework_1.PLATFORM.moduleName('./components/address/select-address-control'),
        aurelia_framework_1.PLATFORM.moduleName('./components/address/select-address-dialog'),
        aurelia_framework_1.PLATFORM.moduleName('./components/login/swissdata-login'),
        aurelia_framework_1.PLATFORM.moduleName('./components/notification/swissdata-notification'),
        aurelia_framework_1.PLATFORM.moduleName('./components/dico2/dico'),
        aurelia_framework_1.PLATFORM.moduleName('./components/dico2/dico-dialog'),
        aurelia_framework_1.PLATFORM.moduleName('./components/dico/dico-translate-key-locale'),
        aurelia_framework_1.PLATFORM.moduleName('./components/form/swissdata-user-field'),
        aurelia_framework_1.PLATFORM.moduleName('./components/form/swissdata-field'),
        aurelia_framework_1.PLATFORM.moduleName('./components/contact/as-contact'),
        aurelia_framework_1.PLATFORM.moduleName('./components/getting-started/getting-started'),
        aurelia_framework_1.PLATFORM.moduleName('./components/getting-started/tour-step'),
        aurelia_framework_1.PLATFORM.moduleName('./components/request-recorder/request-recorder-tool'),
        aurelia_framework_1.PLATFORM.moduleName('./components/request-recorder/request-recorder-viewer'),
        aurelia_framework_1.PLATFORM.moduleName('./components/users/select-user'),
        aurelia_framework_1.PLATFORM.moduleName('./components/users/user-item'),
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
    var i18n = config.container.get(aurelia_i18n_1.I18N);
    aurelia_validation_1.ValidationMessageProvider.prototype.getMessage = function (key) {
        var translation = i18n.tr("global.validationMessages." + key);
        return this.parser.parse(translation);
    };
    aurelia_validation_1.ValidationMessageProvider.prototype.getDisplayName = function (propertyName, displayName) {
        if (displayName !== null && displayName !== undefined) {
            return typeof displayName === 'string' ? displayName : displayName();
        }
        return i18n.tr(propertyName);
    };
}
exports.configure = configure;
/* Expose models */
__exportStar(require("./models"), exports);
/* Expose actions */
__exportStar(require("./state/actions"), exports);
var SdLoginActions = require("./state/sd-login-actions");
exports.SdLoginActions = SdLoginActions;
/* Expose helpers */
__exportStar(require("./helpers/swissdata-api"), exports);
__exportStar(require("./helpers/request-recorder"), exports);
__exportStar(require("./helpers/profile-helper"), exports);
__exportStar(require("./helpers/analytics"), exports);
__exportStar(require("./components/notification/swissdata-notification"), exports);
__exportStar(require("./helpers/i18n-setup"), exports);
__exportStar(require("./helpers/swissdata-global"), exports);
__exportStar(require("./helpers/sd-login"), exports);
/* Expose elements */
__exportStar(require("./components/address"), exports);
var swissdata_login_1 = require("./components/login/swissdata-login");
Object.defineProperty(exports, "SwissdataLogin", { enumerable: true, get: function () { return swissdata_login_1.SwissdataLogin; } });
var swissdata_login_theme_1 = require("./components/login/swissdata-login-theme");
Object.defineProperty(exports, "SwissdataLoginTheme", { enumerable: true, get: function () { return swissdata_login_theme_1.SwissdataLoginTheme; } });
__exportStar(require("./components/dico2/dico"), exports);
__exportStar(require("./components/dico2/dico-dialog"), exports);
__exportStar(require("./components/dico/dico-translate-key-locale"), exports);
__exportStar(require("./components/form/swissdata-field"), exports);
__exportStar(require("./components/form/swissdata-user-field"), exports);
__exportStar(require("./components/contact/as-contact"), exports);
__exportStar(require("./components/contact/as-contact-theme"), exports);
__exportStar(require("./components/getting-started/getting-started"), exports);
__exportStar(require("./components/getting-started/getting-started-theme"), exports);
__exportStar(require("./components/getting-started/tour-step"), exports);
__exportStar(require("./components/users/select-user"), exports);
__exportStar(require("./state"), exports);
__exportStar(require("./decorators"), exports);
