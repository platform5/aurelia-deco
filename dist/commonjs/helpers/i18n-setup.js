"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18nSetup = exports.getI18NSetupOptions = void 0;
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_i18n_1 = require("aurelia-i18n");
var i18next_xhr_backend_1 = require("i18next-xhr-backend");
var _options = {
    host: '',
    apiKey: '',
    translationMemoryApiKey: '',
    defaultLanguage: ''
};
function getI18NSetupOptions() {
    return _options;
}
exports.getI18NSetupOptions = getI18NSetupOptions;
var i18nSetup = function (options) {
    _options = options;
    var saveMissing = options.saveMissing !== undefined ? options.saveMissing : true;
    var skipTranslationOnMissingKey = options.skipTranslationOnMissingKey !== undefined ? options.skipTranslationOnMissingKey : false;
    var debug = options.debug !== undefined ? options.debug : false;
    return function (instance) {
        var aliases = ['t', 'i18n'];
        // add aliases for 't' attribute
        aurelia_i18n_1.TCustomAttribute.configureAliases(aliases);
        // register backend plugin
        instance.i18next.use(i18next_xhr_backend_1.default);
        // adapt options to your needs (see http://i18next.com/docs/options/)
        // make sure to return the promise of the setup method, in order to guarantee proper loading
        return instance.setup({
            backend: {
                loadPath: function (lngs, namespaces) {
                    if (namespaces.includes('languages') || namespaces.includes('countries')) {
                        return "/ar-translation/{{ns}}-{{lng}}.json";
                    }
                    options.translationMemoryHost = options.translationMemoryHost || options.host;
                    var apiKey = namespaces.includes('global') ? options.translationMemoryApiKey : options.apiKey;
                    var apiHost = namespaces.includes('global') ? options.translationMemoryHost : options.host;
                    return apiHost + "/dico/backend?locale={{lng}}&apiKey=" + apiKey; // <-- XHR settings for where to get the files from
                },
                crossDomain: true
            },
            saveMissing: saveMissing,
            missingKeyHandler: function (lng, ns, key, fallbackValue) {
                var data = {
                    lng: lng,
                    ns: ns,
                    key: key,
                    fallbackValue: fallbackValue
                };
                setTimeout(function () {
                    // send the event with 250ms delay to ensure API is ready to handle the missing key and send to server
                    aurelia_framework_1.Container.instance.get(aurelia_event_aggregator_1.EventAggregator).publish('i18next.missing.key', data);
                }, 250);
            },
            skipTranslationOnMissingKey: skipTranslationOnMissingKey,
            attributes: aliases,
            lng: options.defaultLanguage,
            fallbackLng: options.defaultLanguage,
            ns: ['translation', 'languages', 'countries', 'global'],
            defaultNS: 'translation',
            fallbackNS: 'global',
            // https://aurelia.io/blog/2017/03/17/combining-value-converters-with-i18n-in-aurelia/
            // see the link above for more informations on the interpolation value
            interpolation: {
                format: function (value, format, lng) {
                    var _a;
                    // IMPORTANT: aurelia must be passed to the i18nSetup method
                    // in order for interpolation to work !
                    if (!options.aurelia)
                        return value;
                    var parts = format.replace(/\\:/g, '%%%%').split(':').map(function (p) { return p.replace(/%%%%/g, ':'); });
                    //  Check if the value converter is registered as a resource
                    var vc = options.aurelia.resources.getValueConverter(parts.shift());
                    return vc ? (_a = vc).toView.apply(_a, __spreadArray([value], parts)) : value;
                }
            },
            debug: debug
        });
    };
};
exports.i18nSetup = i18nSetup;
