var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { bindable, computedFrom, bindingMode } from 'aurelia-framework';
import { countries } from 'aurelia-resources';
var AddressControl = /** @class */ (function () {
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
                return countries.map(function (c) { return c.name; });
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
        bindable({ defaultBindingMode: bindingMode.twoWay })
    ], AddressControl.prototype, "value", void 0);
    __decorate([
        bindable
    ], AddressControl.prototype, "variant", void 0);
    __decorate([
        bindable
    ], AddressControl.prototype, "dense", void 0);
    __decorate([
        bindable
    ], AddressControl.prototype, "disabled", void 0);
    __decorate([
        bindable
    ], AddressControl.prototype, "countryType", void 0);
    __decorate([
        bindable
    ], AddressControl.prototype, "countryList", void 0);
    __decorate([
        bindable
    ], AddressControl.prototype, "labels", void 0);
    __decorate([
        bindable
    ], AddressControl.prototype, "dicoContext", void 0);
    __decorate([
        bindable
    ], AddressControl.prototype, "allowDescription", void 0);
    __decorate([
        bindable
    ], AddressControl.prototype, "allowLatLngEdition", void 0);
    __decorate([
        computedFrom('countryList')
    ], AddressControl.prototype, "computedCountryList", null);
    return AddressControl;
}());
export { AddressControl };
