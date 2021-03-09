"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SdLoginActions = exports.configure = void 0;
var aurelia_framework_1 = require("aurelia-framework");
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
/* Expose attributes */
//export { SmoothScroll } from './attributes/smooth-scroll';
/* Expose interfaces */
//export { StringTMap, NumberTMap, StringAnyMap, NumberAnyMap, StringStringMap, NumberStringMap, StringNumberMap, NumberNumberMap, StringBooleanMap, NumberBooleanMap} from './interfaces/types';
__exportStar(require("./state"), exports);
__exportStar(require("./decorators"), exports);
