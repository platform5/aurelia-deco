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
import { model, Model, type, validate, form } from '../deco';
import { AppModel } from './app.model';
var DynamicConfigField = /** @class */ (function () {
    function DynamicConfigField() {
        this.name = 'New Field';
        this.type = 'any';
        this.options = {};
        this.required = false;
        this.filterable = 'auto';
        this.searchable = true;
        this.sortable = true;
    }
    return DynamicConfigField;
}());
export { DynamicConfigField };
var DynamicConfigModel = /** @class */ (function (_super) {
    __extends(DynamicConfigModel, _super);
    function DynamicConfigModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = '';
        _this.slug = '';
        _this.label = '';
        _this.isPublic = false;
        _this.readingAccess = 'all';
        _this.readingRoles = [];
        _this.writingAccess = 'all';
        _this.writingRoles = [];
        _this.fields = [];
        _this.enableAdminNotification = false;
        _this.enableUserNotification = false;
        _this.notificationType = 'email';
        _this.notifyWhen = 'create';
        _this.policy = {};
        return _this;
    }
    Object.defineProperty(DynamicConfigModel.prototype, "_label", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        type.id
    ], DynamicConfigModel.prototype, "id", void 0);
    __decorate([
        type.model({ model: AppModel }),
        validate.required,
        form.label('App')
    ], DynamicConfigModel.prototype, "relatedToAppId", void 0);
    __decorate([
        type.string,
        form.label('Name'),
        validate.required
    ], DynamicConfigModel.prototype, "name", void 0);
    __decorate([
        type.string,
        form.label('Slug'),
        form.hint('The slug is a name made only of alphanumerical caracters'),
        validate.slug
    ], DynamicConfigModel.prototype, "slug", void 0);
    __decorate([
        type.string,
        form.label('Label'),
        form.hint('Use ${propertyName} expressions to build this model label')
    ], DynamicConfigModel.prototype, "label", void 0);
    __decorate([
        type.boolean,
        form.label('Is this model public ?'),
        form.hint('If yes, anyone can access its data Otherwise, only logged in users can')
    ], DynamicConfigModel.prototype, "isPublic", void 0);
    __decorate([
        type.select({ options: ['all', 'creator', 'users', 'usersWithRoles'] }),
        form.label('Reading Access')
    ], DynamicConfigModel.prototype, "readingAccess", void 0);
    __decorate([
        type.array({ type: 'string' }),
        form.label('Reading Roles')
    ], DynamicConfigModel.prototype, "readingRoles", void 0);
    __decorate([
        type.select({ options: ['all', 'creator', 'users', 'usersWithRoles'] }),
        form.label('Writing Access')
    ], DynamicConfigModel.prototype, "writingAccess", void 0);
    __decorate([
        type.array({ type: 'string' }),
        form.label('Writing Roles')
    ], DynamicConfigModel.prototype, "writingRoles", void 0);
    __decorate([
        type.array({ type: 'object', options: {
                keys: {
                    name: { type: 'string' },
                    type: { type: 'string' },
                    options: { type: 'any' },
                    validation: { type: 'array' },
                    required: { type: 'boolean' }
                }
            } }),
        form.label('Fields')
    ], DynamicConfigModel.prototype, "fields", void 0);
    __decorate([
        type.boolean,
        form.label('Enable Admin Notifications')
    ], DynamicConfigModel.prototype, "enableAdminNotification", void 0);
    __decorate([
        type.boolean,
        form.label('Enable User Notifications')
    ], DynamicConfigModel.prototype, "enableUserNotification", void 0);
    __decorate([
        type.select({ options: ['email'], multiple: true }),
        form.label('Notification Type')
    ], DynamicConfigModel.prototype, "notificationType", void 0);
    __decorate([
        type.select({ options: ['create', 'edit', 'delete'], multiple: true }),
        form.label('Notify When')
    ], DynamicConfigModel.prototype, "notifyWhen", void 0);
    __decorate([
        type.string,
        form.label('Admin Notification Email')
    ], DynamicConfigModel.prototype, "notificationAdminEmail", void 0);
    __decorate([
        type.string,
        form.label('Admin Notification Subject')
    ], DynamicConfigModel.prototype, "notificationAdminSubject", void 0);
    __decorate([
        type.string({ textarea: true }),
        form.label('Admin Notification Content Prefix')
    ], DynamicConfigModel.prototype, "notificationAdminContentPrefix", void 0);
    __decorate([
        type.string({ textarea: true }),
        form.label('Admin Notification Content Suffix')
    ], DynamicConfigModel.prototype, "notificationAdminContentSuffix", void 0);
    __decorate([
        type.string({ textarea: true }),
        form.label('Admin Notification Template')
    ], DynamicConfigModel.prototype, "notificationAdminTemplate", void 0);
    __decorate([
        type.string,
        form.label('Fieldname of the model containing the email of the user')
    ], DynamicConfigModel.prototype, "notificationUserField", void 0);
    __decorate([
        type.string,
        form.label('User Notification Subject')
    ], DynamicConfigModel.prototype, "notificationUserSubject", void 0);
    __decorate([
        type.string({ textarea: true }),
        form.label('User Notification Content Prefix')
    ], DynamicConfigModel.prototype, "notificationUserContentPrefix", void 0);
    __decorate([
        type.string({ textarea: true }),
        form.label('User Notification Content Suffix')
    ], DynamicConfigModel.prototype, "notificationUserContentSuffix", void 0);
    __decorate([
        type.string({ textarea: true }),
        form.label('User Notification Template')
    ], DynamicConfigModel.prototype, "notificationUserTemplate", void 0);
    __decorate([
        type.any,
        form.label('Policy')
    ], DynamicConfigModel.prototype, "policy", void 0);
    DynamicConfigModel = __decorate([
        model('/dynamicconfig')
    ], DynamicConfigModel);
    return DynamicConfigModel;
}(Model));
export { DynamicConfigModel };
