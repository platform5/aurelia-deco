"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModel = void 0;
var deco_1 = require("../deco");
var AppModel = /** @class */ (function (_super) {
    __extends(AppModel, _super);
    function AppModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'My New App';
        _this.description = '';
        _this.image = null;
        _this.primaryColor = '';
        _this.primaryForegroundColor = '';
        _this.primaryLightColor = '';
        _this.primaryLightForegroundColor = '';
        _this.primaryDarkColor = '';
        _this.primaryDarkForegroundColor = '';
        _this.accentColor = '';
        _this.accentForegroundColor = '';
        _this.accentLightColor = '';
        _this.accentLightForegroundColor = '';
        _this.accentDarkColor = '';
        _this.accentDarkForegroundColor = '';
        _this.publicKeys = [];
        _this.privateKeys = [];
        _this.openUserRegistration = false;
        _this.createAccountValidation = 'emailOrMobile';
        _this.requireDoubleAuth = true;
        _this.doubleAuthMethod = 'auto';
        _this.availableRoles = ['admin', 'user', 'shop'];
        _this.adminUserRoles = ['admin', 'user'];
        _this.enableShop = false;
        _this.enableMultipleShops = false;
        _this.adminShopRoles = ['admin', 'shop'];
        _this.enableThree = false;
        _this.adminThreeRoles = ['admin', 'three'];
        _this.locales = ['fr', 'en'];
        _this.defaultLocale = 'fr';
        _this.smtpConfigHost = '';
        _this.smtpConfigPort = 587;
        _this.smtpConfigUser = '';
        _this.smtpConfigPassword = '';
        _this.smtpConfigSecure = false;
        _this.smtpConfigFromName = '';
        _this.smtpConfigFromEmail = '';
        _this.pushEnabled = false;
        _this.pushGmId = '';
        _this.pushApnCert = '';
        _this.pushApnKey = '';
        _this.pushApnPass = '';
        _this.pushApnProduction = false;
        _this.pushTopic = '';
        return _this;
    }
    Object.defineProperty(AppModel.prototype, "_label", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        deco_1.type.id
    ], AppModel.prototype, "id", void 0);
    __decorate([
        deco_1.type.string,
        deco_1.validate.required,
        deco_1.form.label('app.form.App Name')
    ], AppModel.prototype, "name", void 0);
    __decorate([
        deco_1.type.string({ textarea: true })
    ], AppModel.prototype, "description", void 0);
    __decorate([
        deco_1.type.file({ accepted: ['image/*', 'application/pdf'], previewsFormats: ['160', '320', '320:320'], defaultPreview: '320:320' })
    ], AppModel.prototype, "image", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "primaryColor", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "primaryForegroundColor", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "primaryLightColor", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "primaryLightForegroundColor", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "primaryDarkColor", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "primaryDarkForegroundColor", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "accentColor", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "accentForegroundColor", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "accentLightColor", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "accentLightForegroundColor", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "accentDarkColor", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "accentDarkForegroundColor", void 0);
    __decorate([
        deco_1.type.array({ type: 'object', objectOptions: {
                keys: {
                    key: { type: 'string' },
                    last4: { type: 'string' },
                    name: { type: 'string' },
                    expires: { type: 'date', dateFormat: 'DD-MM-YYYY' },
                    active: { type: 'boolean' }
                }
            } })
    ], AppModel.prototype, "publicKeys", void 0);
    __decorate([
        deco_1.type.array({ type: 'object', objectOptions: {
                keys: {
                    key: { type: 'string' },
                    last4: { type: 'string' },
                    name: { type: 'string' },
                    expires: { type: 'date', dateFormat: 'DD-MM-YYYY' },
                    active: { type: 'boolean' }
                }
            } })
    ], AppModel.prototype, "privateKeys", void 0);
    __decorate([
        deco_1.type.boolean,
        deco_1.validate.required,
        deco_1.form.label('app.form.Open Registration'),
        deco_1.form.hint('Any visitor is allowed to create an account for this app')
    ], AppModel.prototype, "openUserRegistration", void 0);
    __decorate([
        deco_1.type.select({ options: ['emailOrMobile', 'emailAndMobile', 'emailOnly', 'mobileOnly', 'none'] }),
        deco_1.validate.required,
        deco_1.form.label('app.form.Validation Method'),
        deco_1.form.hint('When a visitor creates an account, by which method should we require validation ?')
    ], AppModel.prototype, "createAccountValidation", void 0);
    __decorate([
        deco_1.type.boolean,
        deco_1.form.label('app.form.Enable Double Authentication')
    ], AppModel.prototype, "requireDoubleAuth", void 0);
    __decorate([
        deco_1.type.select({ options: ['auto', 'email', 'sms'] }),
        deco_1.form.label('app.form.What is the prefered method for Double Authentication ?')
    ], AppModel.prototype, "doubleAuthMethod", void 0);
    __decorate([
        deco_1.type.array({ type: 'string' }),
        deco_1.form.label('app.form.Roles available for the app users')
    ], AppModel.prototype, "availableRoles", void 0);
    __decorate([
        deco_1.type.array({ type: 'string' }),
        deco_1.form.label('app.form.Roles that allow user management')
    ], AppModel.prototype, "adminUserRoles", void 0);
    __decorate([
        deco_1.type.boolean,
        deco_1.form.label('app.form.Active Shop in the App ?')
    ], AppModel.prototype, "enableShop", void 0);
    __decorate([
        deco_1.type.boolean,
        deco_1.form.label('app.form.Allow creation of several shops per App ?')
    ], AppModel.prototype, "enableMultipleShops", void 0);
    __decorate([
        deco_1.type.array({ type: 'string' }),
        deco_1.form.label('app.form.Roles that allow shop management')
    ], AppModel.prototype, "adminShopRoles", void 0);
    __decorate([
        deco_1.type.boolean,
        deco_1.form.label('app.form.Active Three Data in the App ?')
    ], AppModel.prototype, "enableThree", void 0);
    __decorate([
        deco_1.type.array({ type: 'string' }),
        deco_1.form.label('app.form.Roles that allow three data management')
    ], AppModel.prototype, "adminThreeRoles", void 0);
    __decorate([
        deco_1.type.array({ type: 'string' }),
        deco_1.form.label('app.form.Locales')
    ], AppModel.prototype, "locales", void 0);
    __decorate([
        deco_1.type.string,
        deco_1.form.label('app.form.Default Locale')
    ], AppModel.prototype, "defaultLocale", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "smtpConfigHost", void 0);
    __decorate([
        deco_1.type.integer
    ], AppModel.prototype, "smtpConfigPort", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "smtpConfigUser", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "smtpConfigPassword", void 0);
    __decorate([
        deco_1.type.boolean
    ], AppModel.prototype, "smtpConfigSecure", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "smtpConfigFromName", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "smtpConfigFromEmail", void 0);
    __decorate([
        deco_1.type.boolean
    ], AppModel.prototype, "pushEnabled", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "pushGmId", void 0);
    __decorate([
        deco_1.type.string({ textarea: true })
    ], AppModel.prototype, "pushApnCert", void 0);
    __decorate([
        deco_1.type.string({ textarea: true })
    ], AppModel.prototype, "pushApnKey", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "pushApnPass", void 0);
    __decorate([
        deco_1.type.boolean
    ], AppModel.prototype, "pushApnProduction", void 0);
    __decorate([
        deco_1.type.string
    ], AppModel.prototype, "pushTopic", void 0);
    AppModel = __decorate([
        deco_1.model('/app')
    ], AppModel);
    return AppModel;
}(deco_1.Model));
exports.AppModel = AppModel;
