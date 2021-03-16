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
define(["require", "exports", "aurelia-framework", "aurelia-dependency-injection", "./deco", "./models", "./state/actions", "./state/sd-login-actions", "./helpers/swissdata-api", "./helpers/request-recorder", "./helpers/profile-helper", "./helpers/analytics", "./components/notification/swissdata-notification", "./helpers/i18n-setup", "./helpers/swissdata-global", "./helpers/sd-login", "./components/address", "./components/login/swissdata-login", "./components/login/swissdata-login-theme", "./components/dico2/dico", "./components/dico2/dico-dialog", "./components/dico/dico-translate-key-locale", "./components/form/swissdata-field", "./components/form/swissdata-user-field", "./components/contact/as-contact", "./components/contact/as-contact-theme", "./components/getting-started/getting-started", "./components/getting-started/getting-started-theme", "./components/getting-started/tour-step", "./components/users/select-user", "./state", "./decorators"], function (require, exports, aurelia_framework_1, aurelia_dependency_injection_1, deco_1, models_1, actions_1, SdLoginActions, swissdata_api_1, request_recorder_1, profile_helper_1, analytics_1, swissdata_notification_1, i18n_setup_1, swissdata_global_1, sd_login_1, address_1, swissdata_login_1, swissdata_login_theme_1, dico_1, dico_dialog_1, dico_translate_key_locale_1, swissdata_field_1, swissdata_user_field_1, as_contact_1, as_contact_theme_1, getting_started_1, getting_started_theme_1, tour_step_1, select_user_1, state_1, decorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SwissdataLoginTheme = exports.SwissdataLogin = exports.SdLoginActions = exports.configure = exports.Container = void 0;
    Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return aurelia_dependency_injection_1.Container; } });
    __exportStar(deco_1, exports);
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
    __exportStar(models_1, exports);
    /* Expose actions */
    __exportStar(actions_1, exports);
    exports.SdLoginActions = SdLoginActions;
    /* Expose helpers */
    __exportStar(swissdata_api_1, exports);
    __exportStar(request_recorder_1, exports);
    __exportStar(profile_helper_1, exports);
    __exportStar(analytics_1, exports);
    __exportStar(swissdata_notification_1, exports);
    __exportStar(i18n_setup_1, exports);
    __exportStar(swissdata_global_1, exports);
    __exportStar(sd_login_1, exports);
    /* Expose elements */
    __exportStar(address_1, exports);
    Object.defineProperty(exports, "SwissdataLogin", { enumerable: true, get: function () { return swissdata_login_1.SwissdataLogin; } });
    Object.defineProperty(exports, "SwissdataLoginTheme", { enumerable: true, get: function () { return swissdata_login_theme_1.SwissdataLoginTheme; } });
    __exportStar(dico_1, exports);
    __exportStar(dico_dialog_1, exports);
    __exportStar(dico_translate_key_locale_1, exports);
    __exportStar(swissdata_field_1, exports);
    __exportStar(swissdata_user_field_1, exports);
    __exportStar(as_contact_1, exports);
    __exportStar(as_contact_theme_1, exports);
    __exportStar(getting_started_1, exports);
    __exportStar(getting_started_theme_1, exports);
    __exportStar(tour_step_1, exports);
    __exportStar(select_user_1, exports);
    /* Expose attributes */
    //export { SmoothScroll } from './attributes/smooth-scroll';
    /* Expose interfaces */
    //export { StringTMap, NumberTMap, StringAnyMap, NumberAnyMap, StringStringMap, NumberStringMap, StringNumberMap, NumberNumberMap, StringBooleanMap, NumberBooleanMap} from './interfaces/types';
    __exportStar(state_1, exports);
    __exportStar(decorators_1, exports);
});
