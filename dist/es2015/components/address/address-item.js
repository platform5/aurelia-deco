var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { bindable } from 'aurelia-framework';
var AddressItem = /** @class */ (function () {
    function AddressItem() {
        this.dicoContext = '';
        this.displayDescription = false;
        this.displayAccessInformation = false;
        this.main = '';
        this.secondary = '';
        this.label = '';
    }
    AddressItem.prototype.bind = function () {
        this.addressChanged();
    };
    AddressItem.prototype.addressChanged = function () {
        if (!this.address || typeof this.address !== 'object') {
            this.main = '';
            this.secondary = '';
            return;
        }
        this.main = this.address.street;
        var parts = [];
        if (this.address.zip || this.address.city) {
            parts.push((this.address.zip + " " + this.address.city).trim());
        }
        if (this.address.country) {
            parts.push(this.address.country);
        }
        if (this.address.description && this.displayDescription) {
            parts.push(this.address.description);
        }
        if (this.address.accessInformation && this.displayAccessInformation) {
            parts.push(this.address.accessInformation);
        }
        this.secondary = parts.join(', ');
        this.label = this.address.label || '';
    };
    AddressItem.prototype.context = function () {
        return this.dicoContext ? this.dicoContext + '.' : '';
    };
    __decorate([
        bindable
    ], AddressItem.prototype, "address", void 0);
    __decorate([
        bindable
    ], AddressItem.prototype, "dicoContext", void 0);
    __decorate([
        bindable
    ], AddressItem.prototype, "displayDescription", void 0);
    __decorate([
        bindable
    ], AddressItem.prototype, "displayAccessInformation", void 0);
    return AddressItem;
}());
export { AddressItem };
