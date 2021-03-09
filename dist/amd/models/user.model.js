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
define(["require", "exports", "../deco", "../decorators/validate"], function (require, exports, deco_1, validate_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UserModel = void 0;
    var UserModel = /** @class */ (function (_super) {
        __extends(UserModel, _super);
        function UserModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.firstname = '';
            _this.lastname = '';
            _this.email = '';
            _this.emailValidated = false;
            //@validate.internationalPhoneNumber(['ch'])
            _this.mobile = '';
            _this.mobileValidated = false;
            _this.requireDoubleAuth = false;
            _this.roles = [];
            _this.hideOnboarding = false;
            return _this;
        }
        UserModel_1 = UserModel;
        UserModel.prototype.createAccount = function (options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            var body = options.body || {};
            var toApiPromises = [];
            var _loop_1 = function (property) {
                var type_1 = this_1.deco.propertyTypes[property];
                var options_1 = this_1.deco.propertyTypesOptions[property];
                toApiPromises.push(type_1.toApi(property, this_1[property], options_1, this_1, this_1.deco.target).then(function (value) {
                    body[property] = value;
                }));
            };
            var this_1 = this;
            for (var _i = 0, _a = Object.keys(this.deco.propertyTypes); _i < _a.length; _i++) {
                var property = _a[_i];
                _loop_1(property);
            }
            return Promise.all(toApiPromises).then(function () {
                return _this.api.post(UserModel_1.baseroute + '/create-account', body, options);
            }).then(deco_1.jsonify).then(function (element) {
                if (element.token) {
                    return element;
                }
                else {
                    return _this.deco.target.instanceFromApi(element);
                }
            });
        };
        UserModel.prototype.validAccountCreationToken = function (method, token, code) {
            var _this = this;
            var body = {
                token: token
            };
            if (method === 'email')
                body.emailCode = code;
            if (method === 'mobile')
                body.mobileCode = code;
            return this.api.post(UserModel_1.baseroute + '/create-account', body).then(deco_1.jsonify).then(function (element) {
                if (element.token) {
                    return element;
                }
                else {
                    return _this.deco.target.instanceFromApi(element);
                }
            });
        };
        Object.defineProperty(UserModel.prototype, "_label", {
            get: function () {
                return this.firstname + ' ' + this.lastname;
            },
            enumerable: false,
            configurable: true
        });
        var UserModel_1;
        __decorate([
            deco_1.type.id
        ], UserModel.prototype, "id", void 0);
        __decorate([
            deco_1.type.string,
            deco_1.validate.required,
            deco_1.form.label('user.Firstname')
        ], UserModel.prototype, "firstname", void 0);
        __decorate([
            deco_1.type.string,
            deco_1.validate.required,
            deco_1.form.label('user.Lastname')
        ], UserModel.prototype, "lastname", void 0);
        __decorate([
            deco_1.type.string,
            deco_1.validate.required,
            deco_1.validate.email,
            deco_1.form.label('user.Email'),
            validate_1.uniqueByApp
        ], UserModel.prototype, "email", void 0);
        __decorate([
            deco_1.type.boolean,
            deco_1.validate.required
        ], UserModel.prototype, "emailValidated", void 0);
        __decorate([
            deco_1.type.string,
            deco_1.validate.required,
            deco_1.form.label('user.Mobile'),
            validate_1.uniqueByApp
        ], UserModel.prototype, "mobile", void 0);
        __decorate([
            deco_1.type.boolean,
            deco_1.validate.required
        ], UserModel.prototype, "mobileValidated", void 0);
        __decorate([
            deco_1.type.boolean,
            deco_1.validate.required,
            deco_1.form.label('user.Enable double authentication')
        ], UserModel.prototype, "requireDoubleAuth", void 0);
        __decorate([
            deco_1.type.array({ type: 'string' }),
            deco_1.form.label('user.Roles')
        ], UserModel.prototype, "roles", void 0);
        __decorate([
            deco_1.type.boolean
        ], UserModel.prototype, "hideOnboarding", void 0);
        UserModel = UserModel_1 = __decorate([
            deco_1.model('/user')
        ], UserModel);
        return UserModel;
    }(deco_1.Model));
    exports.UserModel = UserModel;
});
