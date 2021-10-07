"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressControl = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_resources_1 = require("aurelia-resources");
var aurelia_fetch_client_1 = require("aurelia-fetch-client");
var AddressControl = /** @class */ (function () {
    function AddressControl(httpClient) {
        this.httpClient = httpClient;
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
    AddressControl.prototype.addressChanged = function () {
        this.fetchLatLng();
    };
    AddressControl.prototype.fetchLatLng = function () {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var searchValue, response, value, firstResult, lat, lng, error_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!(((_a = this.value) === null || _a === void 0 ? void 0 : _a.street) && ((_b = this.value) === null || _b === void 0 ? void 0 : _b.zip) && ((_c = this.value) === null || _c === void 0 ? void 0 : _c.city) && ((_d = this.value) === null || _d === void 0 ? void 0 : _d.country))) return [3 /*break*/, 5];
                        if (!(this.value.country === 'Suisse')) return [3 /*break*/, 5];
                        this.httpClient.configure(function (config) {
                            config.withBaseUrl('https://api3.geo.admin.ch/rest/services/api');
                        });
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 4, , 5]);
                        searchValue = this.value.street + ", " + this.value.zip + " " + this.value.city;
                        return [4 /*yield*/, this.httpClient.get("/SearchServer?searchText=" + encodeURIComponent(searchValue) + "&type=locations")];
                    case 2:
                        response = _g.sent();
                        console.log('response', response);
                        return [4 /*yield*/, response.json()];
                    case 3:
                        value = _g.sent();
                        if (value === null || value === void 0 ? void 0 : value.results.length) {
                            firstResult = value.results[0];
                            lat = (_e = firstResult === null || firstResult === void 0 ? void 0 : firstResult.attrs) === null || _e === void 0 ? void 0 : _e.lat;
                            lng = (_f = firstResult === null || firstResult === void 0 ? void 0 : firstResult.attrs) === null || _f === void 0 ? void 0 : _f.lng;
                            if (typeof lat === 'number' && typeof lng === 'number') {
                                this.value.lat = lat;
                                this.value.lng = lng;
                            }
                            console.log('value after fetch lat lng', this.value);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _g.sent();
                        console.warn('Error when fetch lat lng', error_1.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
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
    AddressControl = __decorate([
        aurelia_framework_1.inject(aurelia_framework_1.NewInstance.of(aurelia_fetch_client_1.HttpClient))
    ], AddressControl);
    return AddressControl;
}());
exports.AddressControl = AddressControl;
/*
// fetch lat lng anytime the address changes value

// below is previous idea
1. If the fields for lat / lng are not displayed => fetch lat / lng when address is ready
2. If the fields are displayed but no value => fetch lat / lng when address is ready
3. If the fields are displayed and have a value => only fetch on request (button)
*/ 
