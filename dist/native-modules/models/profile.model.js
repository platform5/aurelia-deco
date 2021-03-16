var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
import { model, Model, type } from '../deco';
import { UserModel } from './user.model';
var ProfileModel = /** @class */ (function (_super) {
    __extends(ProfileModel, _super);
    function ProfileModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.street = '';
        _this.zip = '';
        _this.city = '';
        _this.country = '';
        return _this;
    }
    __decorate([
        type.model({ model: UserModel })
    ], ProfileModel.prototype, "userId", void 0);
    __decorate([
        type.file({ accepted: ['image/*'] })
    ], ProfileModel.prototype, "picture", void 0);
    __decorate([
        type.string
    ], ProfileModel.prototype, "street", void 0);
    __decorate([
        type.string
    ], ProfileModel.prototype, "zip", void 0);
    __decorate([
        type.string
    ], ProfileModel.prototype, "city", void 0);
    __decorate([
        type.string
    ], ProfileModel.prototype, "country", void 0);
    ProfileModel = __decorate([
        model('/profile')
    ], ProfileModel);
    return ProfileModel;
}(Model));
export { ProfileModel };
