var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { errorify } from 'aurelia-resources';
import { I18N } from 'aurelia-i18n';
import { inject } from 'aurelia-framework';
var AddressDialog = /** @class */ (function () {
    function AddressDialog(i18n) {
        this.i18n = i18n;
        this.dialogTitle = 'Edit Address';
        this.address = {};
        this.mode = 'create';
        this.checkAllValues = false;
        this.labels = [];
        this.dicoContext = '';
        this.allowDescription = false;
        this.allowAccessInformation = false;
        this.allowLatLngEdition = false;
        this.countryType = 'input';
        this.countryList = 'all';
    }
    AddressDialog.prototype.activate = function (params) {
        if (params.address && typeof params.address === 'object') {
            this.address = params.address;
        }
        if (params.mode === 'edit') {
            this.mode = 'edit';
        }
        else {
            this.mode = 'create';
        }
        if (params.checkAllValues) {
            this.checkAllValues = params.checkAllValues;
        }
        if (params.dialogTitle) {
            this.dialogTitle = params.dialogTitle;
        }
        else {
            this.dialogTitle = this.i18n.tr('Edit Address');
        }
        if (params.labels && Array.isArray(params.labels)) {
            this.labels = params.labels;
        }
        else {
            this.labels = [];
        }
        if (params.countryType && typeof params.countryType === 'string') {
            this.countryType = params.countryType;
        }
        if (params.countryList) {
            this.countryList = params.countryList;
        }
        if (params.allowDescription && typeof params.allowDescription === 'boolean') {
            this.allowDescription = params.allowDescription;
        }
        if (params.allowAccessInformation && typeof params.allowAccessInformation === 'boolean') {
            this.allowAccessInformation = params.allowAccessInformation;
        }
        if (params.allowLatLngEdition && typeof params.allowLatLngEdition === 'boolean') {
            this.allowLatLngEdition = params.allowLatLngEdition;
        }
        if (params.dicoContext) {
            this.dicoContext = params.dicoContext;
        }
        else {
            this.dicoContext = '';
        }
    };
    AddressDialog.prototype.canDeactivate = function (result) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (result.wasCancelled) {
                    return [2 /*return*/, true];
                }
                if (this.checkAllValues) {
                    if (!this.address.country && this.countryList && this.countryList.length > 0)
                        this.address.country = this.countryList[0];
                    if (!this.address.street || !this.address.zip || !this.address.city || !this.address.country) {
                        errorify(new Error('You must fill out all fields'));
                        return [2 /*return*/, false];
                    }
                    else {
                        result.output = this.address;
                        return [2 /*return*/, true];
                    }
                }
                if (!this.address)
                    return [2 /*return*/, false];
                result.output = this.address;
                return [2 /*return*/, true];
            });
        });
    };
    AddressDialog.prototype.fixAddressKeys = function () {
        if (typeof this.address.label !== 'string') {
            this.address.label = '';
        }
    };
    AddressDialog = __decorate([
        inject(I18N)
    ], AddressDialog);
    return AddressDialog;
}());
export { AddressDialog };
