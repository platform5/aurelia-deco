System.register(["aurelia-event-aggregator", "aurelia-framework", "aurelia-i18n", "i18next-xhr-backend"], function (exports_1, context_1) {
    "use strict";
    var __spreadArrays = (this && this.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    var aurelia_event_aggregator_1, aurelia_framework_1, aurelia_i18n_1, i18next_xhr_backend_1, _options, i18nSetup;
    var __moduleName = context_1 && context_1.id;
    function getI18NSetupOptions() {
        return _options;
    }
    exports_1("getI18NSetupOptions", getI18NSetupOptions);
    return {
        setters: [
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_i18n_1_1) {
                aurelia_i18n_1 = aurelia_i18n_1_1;
            },
            function (i18next_xhr_backend_1_1) {
                i18next_xhr_backend_1 = i18next_xhr_backend_1_1;
            }
        ],
        execute: function () {
            _options = {
                host: '',
                apiKey: '',
                translationMemoryApiKey: '',
                defaultLanguage: ''
            };
            exports_1("i18nSetup", i18nSetup = function (options) {
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
                                return vc ? (_a = vc).toView.apply(_a, __spreadArrays([value], parts)) : value;
                            }
                        },
                        debug: debug
                    });
                };
            });
        }
    };
});
