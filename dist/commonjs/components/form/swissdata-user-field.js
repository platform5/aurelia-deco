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
exports.updateUser = exports.SwissdataUserField = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var swissdata_api_1 = require("../../helpers/swissdata-api");
var aurelia_logging_1 = require("aurelia-logging");
var aurelia_pal_1 = require("aurelia-pal");
var deco_1 = require("../../deco");
var user_model_1 = require("../../models/user.model");
var aurelia_resources_1 = require("aurelia-resources");
var aurelia_validation_1 = require("aurelia-validation");
var aurelia_i18n_1 = require("aurelia-i18n");
var awesome_phonenumber_1 = require("awesome-phonenumber");
var log = aurelia_logging_1.getLogger('swissdata-user-field');
var SwissdataUserField = /** @class */ (function () {
    function SwissdataUserField(swissdataApi, element, validationController, i18n) {
        var _this = this;
        this.swissdataApi = swissdataApi;
        this.element = element;
        this.validationController = validationController;
        this.i18n = i18n;
        this.instance = 'state';
        this.swissdataApi.store.registerAction('updateUser', updateUser);
        this.validationController.validateTrigger = aurelia_validation_1.validateTrigger.blur;
        deco_1.validate.ValidationRules
            .ensure('currentPassword').displayName(this.i18n.tr('userField.Current Password')).required()
            .ensure('newPassword').displayName(this.i18n.tr('userField.New Password')).required().minLength(10)
            .ensure('email').displayName(this.i18n.tr('userField.Email')).required().email()
            .ensure('mobile').displayName(this.i18n.tr('userField.Mobile')).required().then().satisfies(function (value, object) {
            if (!value)
                return true; // this rule is not wrong, because its purpose is not to check if its required or not
            var countryCode = _this.swissdataApi.state.country;
            var number = new awesome_phonenumber_1.default(value, countryCode.toLowerCase());
            if (!number.isValid())
                return false;
            if (!number.isPossible())
                return false;
            if (!number.isMobile())
                return false;
            return true;
        }).withMessage(this.i18n.tr('userField.Invalid mobile number'))
            .on(this);
        this.validationController.addObject(this);
        this.validationController.addRenderer(new aurelia_resources_1.AureliaUXFormRenderer());
    }
    SwissdataUserField.prototype.bind = function () {
        this.instanceChanged();
    };
    SwissdataUserField.prototype.instanceChanged = function () {
        var _this = this;
        this._instance = undefined;
        if (this.instance === 'state') {
            if (this.swissdataApi.state.swissdata.authenticated && this.swissdataApi.state.swissdata.user) {
                var instance_1 = new user_model_1.UserModel();
                instance_1.id = this.swissdataApi.state.swissdata.user.id;
                instance_1.updateInstanceFromElement(this.swissdataApi.state.swissdata.user).then(function () {
                    _this._instance = instance_1;
                });
            }
        }
        else if (this.instance instanceof user_model_1.UserModel) {
            this._instance = this.instance;
        }
        this.initField();
    };
    SwissdataUserField.prototype.propertyChanged = function () {
        this.initField();
    };
    SwissdataUserField.prototype.initField = function () {
        this.processProperty();
    };
    SwissdataUserField.prototype.processProperty = function () {
        var rightInstance = this._instance instanceof user_model_1.UserModel;
        if (!this._instance || !rightInstance) {
            log.warn('this._instance [' + this.property + '] is not set properly');
            log.debug('this.instance', this.instance);
            log.debug('this._instance', this._instance);
            return;
        }
    };
    SwissdataUserField.prototype.updatePassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result1, result2, body, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validationController.validate({ object: this, propertyName: 'currentPassword' })];
                    case 1:
                        result1 = _a.sent();
                        return [4 /*yield*/, this.validationController.validate({ object: this, propertyName: 'newPassword' })];
                    case 2:
                        result2 = _a.sent();
                        if (!result1.valid || !result2.valid) {
                            return [2 /*return*/];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        body = {
                            currentPassword: this.currentPassword,
                            newPassword: this.newPassword
                        };
                        return [4 /*yield*/, this.swissdataApi.put('/auth/password-change', body).then(deco_1.jsonify)];
                    case 4:
                        _a.sent();
                        this.currentPassword = '';
                        this.newPassword = '';
                        aurelia_resources_1.notify(this.i18n.tr('userField.Your password has been updated'), { type: 'success' });
                        this.notify();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        aurelia_resources_1.errorify(error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SwissdataUserField.prototype.requestEmailChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, body, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validationController.validate({ object: this, propertyName: 'email' })];
                    case 1:
                        result = _a.sent();
                        if (!result.valid) {
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        body = {
                            email: this.email
                        };
                        return [4 /*yield*/, this.swissdataApi.put('/auth/request-email-change', body).then(deco_1.jsonify)];
                    case 3:
                        token = _a.sent();
                        this.token = token.token;
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        aurelia_resources_1.errorify(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SwissdataUserField.prototype.validateEmailChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            token: this.token,
                            code: this.code.trim()
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.swissdataApi.put('/auth/validate-email-change', body).then(deco_1.jsonify)];
                    case 2:
                        user = _a.sent();
                        this.token = '';
                        this.code = '';
                        this.email = '';
                        if (this._instance) {
                            this._instance.email = user.email;
                            this._instance.emailValidated = user.emailValidated;
                        }
                        if (this.instance === 'state')
                            this.updateStateUserWithInstance();
                        aurelia_resources_1.notify(this.i18n.tr('userField.Your email has been changed'), { type: 'success' });
                        this.notify();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        aurelia_resources_1.errorify(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SwissdataUserField.prototype.cancelEmailChange = function () {
        this.token = '';
        this.code = '';
        this.email = '';
    };
    SwissdataUserField.prototype.requestMobileChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var intMobile, body, token, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        intMobile = new awesome_phonenumber_1.default(this.mobile, this.swissdataApi.state.country.toLowerCase()).getNumber();
                        body = {
                            mobile: intMobile
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.swissdataApi.put('/auth/request-mobile-change', body).then(deco_1.jsonify)];
                    case 2:
                        token = _a.sent();
                        this.token = token.token;
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        aurelia_resources_1.errorify(error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SwissdataUserField.prototype.cancelMobileChange = function () {
        this.token = '';
        this.code = '';
        this.mobile = '';
    };
    SwissdataUserField.prototype.validateMobileChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            token: this.token,
                            code: this.code.trim()
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.swissdataApi.put('/auth/validate-mobile-change', body).then(deco_1.jsonify)];
                    case 2:
                        user = _a.sent();
                        this.token = '';
                        this.code = '';
                        this.mobile = '';
                        if (this._instance) {
                            this._instance.mobile = user.mobile;
                            this._instance.mobileValidated = user.mobileValidated;
                        }
                        if (this.instance === 'state')
                            this.updateStateUserWithInstance();
                        aurelia_resources_1.notify(this.i18n.tr('userField.Your mobile has been changed'), { type: 'success' });
                        this.notify();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        aurelia_resources_1.errorify(error_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SwissdataUserField.prototype.sendEmailCodeAgain = function () {
        this.requestEmailChange();
    };
    SwissdataUserField.prototype.sendMobileCodeAgain = function () {
        this.requestMobileChange();
    };
    SwissdataUserField.prototype.updateStateUserWithInstance = function () {
        this.swissdataApi.store.dispatch(updateUser, this._instance, ['email', 'emailValidated', 'mobile', 'mobileValidated']);
    };
    SwissdataUserField.prototype.notify = function () {
        var customEvent = aurelia_pal_1.DOM.createCustomEvent('changed', { bubbles: true });
        this.element.dispatchEvent(customEvent);
    };
    Object.defineProperty(SwissdataUserField.prototype, "mobileNumberExemple", {
        get: function () {
            var _a;
            var countryCode = (_a = this.swissdataApi.state) === null || _a === void 0 ? void 0 : _a.country;
            if (!countryCode) {
                return '';
            }
            return awesome_phonenumber_1.default.getExample(this.swissdataApi.state.country, 'mobile').getNumber('international');
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        aurelia_framework_1.bindable
    ], SwissdataUserField.prototype, "instance", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], SwissdataUserField.prototype, "property", void 0);
    __decorate([
        aurelia_framework_1.computedFrom('swissdataApi.state.country')
    ], SwissdataUserField.prototype, "mobileNumberExemple", null);
    SwissdataUserField = __decorate([
        aurelia_framework_1.inject(swissdata_api_1.SwissdataApi, Element, aurelia_framework_1.NewInstance.of(aurelia_validation_1.ValidationController), aurelia_i18n_1.I18N)
    ], SwissdataUserField);
    return SwissdataUserField;
}());
exports.SwissdataUserField = SwissdataUserField;
function updateUser(state, user, properties) {
    log.debug('updateUser', state, user, properties);
    if (!state.swissdata.user)
        return state;
    var newState = Object.assign({}, state);
    if (typeof properties === 'string')
        properties = [properties];
    for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
        var prop = properties_1[_i];
        newState.swissdata.user[prop] = user[prop];
    }
    return newState;
}
exports.updateUser = updateUser;
