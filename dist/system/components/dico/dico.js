System.register(["aurelia-i18n", "../../models/dico.model", "aurelia-framework", "../../helpers/swissdata-api", "aurelia-resources", "aurelia-validation"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_i18n_1, dico_model_1, aurelia_framework_1, swissdata_api_1, aurelia_resources_1, aurelia_validation_1, Dico, ContextValueConverter, KeyValueConverter, FilterContextValueConverter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_i18n_1_1) {
                aurelia_i18n_1 = aurelia_i18n_1_1;
            },
            function (dico_model_1_1) {
                dico_model_1 = dico_model_1_1;
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (swissdata_api_1_1) {
                swissdata_api_1 = swissdata_api_1_1;
            },
            function (aurelia_resources_1_1) {
                aurelia_resources_1 = aurelia_resources_1_1;
            },
            function (aurelia_validation_1_1) {
                aurelia_validation_1 = aurelia_validation_1_1;
            }
        ],
        execute: function () {
            Dico = /** @class */ (function () {
                function Dico(i18n, api, validationController, bindingEngine) {
                    var _this = this;
                    this.i18n = i18n;
                    this.api = api;
                    this.validationController = validationController;
                    this.bindingEngine = bindingEngine;
                    this.defaultLanguage = 'fr';
                    this.languages = ['fr'];
                    //{
                    //  'admin.dico.en': {
                    //    'en': DicoModel,
                    //    'fr': DicoModel
                    //  }
                    //}
                    this.allDicoItemsByLocale = [];
                    this.showedKeys = [];
                    this.showedLanguages = ['fr'];
                    this.updateItems = 0;
                    this.viewAddElement = false;
                    this.processing = false;
                    this.subscription = this.bindingEngine.collectionObserver(this.showedKeys)
                        .subscribe(function () {
                        _this.updateItems++;
                        window.localStorage.setItem(_this.api.state.swissdata.publicKey + "-dico-key", JSON.stringify(_this.showedKeys));
                    });
                    this.subscription2 = this.bindingEngine.collectionObserver(this.showedLanguages)
                        .subscribe(function () {
                        _this.getDico();
                    });
                    this.validationController.validateTrigger = aurelia_validation_1.validateTrigger.change;
                }
                Dico.prototype.deactivate = function () {
                    if (this.subscription)
                        this.subscription.dispose();
                    if (this.subscription2)
                        this.subscription2.dispose();
                };
                Object.defineProperty(Dico.prototype, "keys", {
                    get: function () {
                        var keys = [];
                        for (var _i = 0, _a = this.allDicoItemsByLocale; _i < _a.length; _i++) {
                            var item = _a[_i];
                            if (item.key.indexOf('.') === -1) {
                                if (keys.indexOf('') === -1)
                                    keys.push('');
                                continue;
                            }
                            var key = item.key.split('.')[0];
                            if (keys.indexOf(key) === -1) {
                                keys.push(key);
                            }
                        }
                        keys.sort();
                        return keys;
                    },
                    enumerable: false,
                    configurable: true
                });
                Dico.prototype.setLanguage = function (language) {
                    this.api.store.dispatch('setLanguage', language);
                    // this.i18n.setLocale(locale);
                };
                Dico.prototype.activate = function () {
                    try {
                        var keys = JSON.parse(window.localStorage.getItem(this.api.state.swissdata.publicKey + "-dico-key"));
                        if (!Array.isArray(keys))
                            throw new Error('Invalid keys');
                        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                            var key = keys_1[_i];
                            if (typeof key === 'string') {
                                this.showedKeys.push(key);
                            }
                        }
                    }
                    catch (_a) {
                        // ignore
                    }
                    this.defaultLanguage = this.api.state.language;
                    this.languages = this.api.state.languages;
                    this.getDico();
                };
                Dico.prototype.getDico = function () {
                    var _this = this;
                    this.updateItems++;
                    var promises = [];
                    this.allDicoItemsByLocale = [];
                    this.processing = true;
                    var _loop_1 = function (language) {
                        promises.push(dico_model_1.DicoModel.getAll('?locale=' + language).then(function (elements) {
                            for (var _i = 0, _a = elements; _i < _a.length; _i++) {
                                var item = _a[_i];
                                _this.addItemToDico(item.key, language, item);
                            }
                        }));
                    };
                    for (var _i = 0, _a = this.showedLanguages; _i < _a.length; _i++) {
                        var language = _a[_i];
                        _loop_1(language);
                    }
                    return Promise.all(promises).then(function () {
                        _this.processing = false;
                    }).catch(function (error) {
                        _this.processing = false;
                        aurelia_resources_1.errorify(error);
                    });
                };
                Dico.prototype.addItemToDico = function (key, locale, item) {
                    for (var _i = 0, _a = this.allDicoItemsByLocale; _i < _a.length; _i++) {
                        var existingItem = _a[_i];
                        if (existingItem.key === key) {
                            if (!existingItem.locales)
                                existingItem.locales = {};
                            existingItem.iteration++;
                            existingItem.locales[locale] = item;
                            return;
                        }
                    }
                    // if not found, add to the list
                    var newItem = {
                        key: key,
                        iteration: 0,
                        locales: {}
                    };
                    newItem.locales[locale] = item;
                    this.allDicoItemsByLocale.push(newItem);
                };
                Dico.prototype.showViewAddElement = function () {
                    this.viewAddElement = true;
                    this.newDicoElement = new dico_model_1.DicoModel();
                };
                Dico.prototype.newDicoSaved = function () {
                    this.viewAddElement = false;
                    this.getDico();
                };
                Dico.prototype.dicoRemoved = function (event) {
                    this.getDico();
                };
                Dico = __decorate([
                    aurelia_framework_1.inject(aurelia_i18n_1.I18N, swissdata_api_1.SwissdataApi, aurelia_framework_1.NewInstance.of(aurelia_validation_1.ValidationController), aurelia_framework_1.BindingEngine)
                ], Dico);
                return Dico;
            }());
            exports_1("Dico", Dico);
            ContextValueConverter = /** @class */ (function () {
                function ContextValueConverter() {
                }
                ContextValueConverter.prototype.toView = function (value) {
                    if (value.indexOf('.') === -1)
                        return '';
                    var split = value.split('.');
                    var context = split.splice(0, split.length - 1).join(' > ');
                    return context;
                };
                return ContextValueConverter;
            }());
            exports_1("ContextValueConverter", ContextValueConverter);
            KeyValueConverter = /** @class */ (function () {
                function KeyValueConverter() {
                }
                KeyValueConverter.prototype.toView = function (value) {
                    if (value.indexOf('.') === -1)
                        return value;
                    return value.split('.').splice(-1, 1)[0];
                };
                return KeyValueConverter;
            }());
            exports_1("KeyValueConverter", KeyValueConverter);
            FilterContextValueConverter = /** @class */ (function () {
                function FilterContextValueConverter() {
                }
                FilterContextValueConverter.prototype.toView = function (items, keys, updateItems) {
                    if (!keys || !Array.isArray(keys) || keys.length === 0)
                        return this.sort(items);
                    var returneditems = [];
                    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                        var item = items_1[_i];
                        if (item.key.indexOf('.') === -1 && keys.indexOf('') !== -1) {
                            returneditems.push(item);
                        }
                        else {
                            var key = item.key.split('.')[0];
                            if (keys.indexOf(key) !== -1) {
                                returneditems.push(item);
                            }
                        }
                    }
                    return this.sort(returneditems);
                };
                FilterContextValueConverter.prototype.sort = function (items) {
                    items.sort(function (a, b) {
                        if (a.key < b.key) {
                            return -1;
                        }
                        if (a.key > b.key) {
                            return 1;
                        }
                        return 0;
                    });
                    return items;
                };
                return FilterContextValueConverter;
            }());
            exports_1("FilterContextValueConverter", FilterContextValueConverter);
        }
    };
});
