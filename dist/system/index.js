System.register(["aurelia-framework", "aurelia-dependency-injection", "./deco", "./models", "./state/actions", "./state/sd-login-actions", "./helpers/swissdata-api", "./helpers/request-recorder", "./helpers/profile-helper", "./helpers/analytics", "./components/notification/swissdata-notification", "./helpers/i18n-setup", "./helpers/swissdata-global", "./helpers/sd-login", "./components/address", "./components/login/swissdata-login", "./components/login/swissdata-login-theme", "./components/dico2/dico", "./components/dico2/dico-dialog", "./components/dico/dico-translate-key-locale", "./components/form/swissdata-field", "./components/form/swissdata-user-field", "./components/contact/as-contact", "./components/contact/as-contact-theme", "./components/getting-started/getting-started", "./components/getting-started/getting-started-theme", "./components/getting-started/tour-step", "./components/users/select-user", "./state", "./decorators"], function (exports_1, context_1) {
    "use strict";
    var aurelia_framework_1, defaultSettings, SdLoginActions;
    var __moduleName = context_1 && context_1.id;
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
    exports_1("configure", configure);
    var exportedNames_1 = {
        "configure": true,
        "SdLoginActions": true,
        "Container": true,
        "SwissdataLogin": true,
        "SwissdataLoginTheme": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                exports_1({
                    "Container": aurelia_dependency_injection_1_1["Container"]
                });
            },
            function (deco_1_1) {
                exportStar_1(deco_1_1);
            },
            function (models_1_1) {
                exportStar_1(models_1_1);
            },
            function (actions_1_1) {
                exportStar_1(actions_1_1);
            },
            function (SdLoginActions_1) {
                SdLoginActions = SdLoginActions_1;
            },
            function (swissdata_api_1_1) {
                exportStar_1(swissdata_api_1_1);
            },
            function (request_recorder_1_1) {
                exportStar_1(request_recorder_1_1);
            },
            function (profile_helper_1_1) {
                exportStar_1(profile_helper_1_1);
            },
            function (analytics_1_1) {
                exportStar_1(analytics_1_1);
            },
            function (swissdata_notification_1_1) {
                exportStar_1(swissdata_notification_1_1);
            },
            function (i18n_setup_1_1) {
                exportStar_1(i18n_setup_1_1);
            },
            function (swissdata_global_1_1) {
                exportStar_1(swissdata_global_1_1);
            },
            function (sd_login_1_1) {
                exportStar_1(sd_login_1_1);
            },
            function (address_1_1) {
                exportStar_1(address_1_1);
            },
            function (swissdata_login_1_1) {
                exports_1({
                    "SwissdataLogin": swissdata_login_1_1["SwissdataLogin"]
                });
            },
            function (swissdata_login_theme_1_1) {
                exports_1({
                    "SwissdataLoginTheme": swissdata_login_theme_1_1["SwissdataLoginTheme"]
                });
            },
            function (dico_1_1) {
                exportStar_1(dico_1_1);
            },
            function (dico_dialog_1_1) {
                exportStar_1(dico_dialog_1_1);
            },
            function (dico_translate_key_locale_1_1) {
                exportStar_1(dico_translate_key_locale_1_1);
            },
            function (swissdata_field_1_1) {
                exportStar_1(swissdata_field_1_1);
            },
            function (swissdata_user_field_1_1) {
                exportStar_1(swissdata_user_field_1_1);
            },
            function (as_contact_1_1) {
                exportStar_1(as_contact_1_1);
            },
            function (as_contact_theme_1_1) {
                exportStar_1(as_contact_theme_1_1);
            },
            function (getting_started_1_1) {
                exportStar_1(getting_started_1_1);
            },
            function (getting_started_theme_1_1) {
                exportStar_1(getting_started_theme_1_1);
            },
            function (tour_step_1_1) {
                exportStar_1(tour_step_1_1);
            },
            function (select_user_1_1) {
                exportStar_1(select_user_1_1);
            },
            function (state_1_1) {
                exportStar_1(state_1_1);
            },
            function (decorators_1_1) {
                exportStar_1(decorators_1_1);
            }
        ],
        execute: function () {
            defaultSettings = {
                api: {
                    host: '',
                    publicKey: ''
                },
                registerMissingTranslationKeys: true
            };
            exports_1("SdLoginActions", SdLoginActions);
        }
    };
});
