System.register(["aurelia-framework", "aurelia-resources"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_framework_1, aurelia_resources_1, AddressControl;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_resources_1_1) {
                aurelia_resources_1 = aurelia_resources_1_1;
            }
        ],
        execute: function () {
            AddressControl = /** @class */ (function () {
                function AddressControl() {
                    this.variant = 'filled';
                    this.dense = false;
                    this.disabled = false;
                    this.countryType = 'input';
                    this.countryList = 'all';
                    this.labels = [];
                    this.dicoContext = '';
                    this.allowDescription = false;
                    this.allowLatLngEdition = false;
                    this.ready = false;
                }
                AddressControl.prototype.bind = function () {
                    this.fixValue();
                };
                AddressControl.prototype.valueChanged = function () {
                    this.fixValue();
                };
                AddressControl.prototype.fixValue = function () {
                    this.ready = false;
                    if (!this.value || typeof this.value !== 'object') {
                        this.value = {};
                    }
                    this.ready = true;
                };
                Object.defineProperty(AddressControl.prototype, "computedCountryList", {
                    get: function () {
                        if (this.countryList === 'all') {
                            return aurelia_resources_1.countries.map(function (c) { return c.name; });
                        }
                        else if (Array.isArray(this.countryList)) {
                            return this.countryList;
                        }
                        else {
                            return [];
                        }
                    },
                    enumerable: false,
                    configurable: true
                });
                AddressControl.prototype.context = function () {
                    return this.dicoContext ? this.dicoContext + '.' : '';
                };
                __decorate([
                    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay })
                ], AddressControl.prototype, "value", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AddressControl.prototype, "variant", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AddressControl.prototype, "dense", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AddressControl.prototype, "disabled", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AddressControl.prototype, "countryType", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AddressControl.prototype, "countryList", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AddressControl.prototype, "labels", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AddressControl.prototype, "dicoContext", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AddressControl.prototype, "allowDescription", void 0);
                __decorate([
                    aurelia_framework_1.bindable
                ], AddressControl.prototype, "allowLatLngEdition", void 0);
                __decorate([
                    aurelia_framework_1.computedFrom('countryList')
                ], AddressControl.prototype, "computedCountryList", null);
                return AddressControl;
            }());
            exports_1("AddressControl", AddressControl);
        }
    };
});
