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
define(["require", "exports", "../../deco", "aurelia-framework", "aurelia-logging", "../../models"], function (require, exports, deco_1, aurelia_framework_1, aurelia_logging_1, models_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SwissdataField = void 0;
    var log = aurelia_logging_1.getLogger('components:swissdata-field');
    var SwissdataField = /** @class */ (function (_super) {
        __extends(SwissdataField, _super);
        function SwissdataField(element, decoApi) {
            var _this = _super.call(this, element, decoApi) || this;
            _this.element = element;
            _this.autohint = false;
            _this.variant = '';
            _this.selectOptions = null;
            return _this;
        }
        SwissdataField.prototype.bind = function () {
            this.initField();
        };
        SwissdataField.prototype.instanceChanged = function () {
            this.initField();
        };
        SwissdataField.prototype.propertyChanged = function () {
            this.initField();
        };
        SwissdataField.prototype.initField = function () {
            _super.prototype.processProperty.call(this);
            if (this._type === 'model' && typeof this.options.model === 'string') {
                // this is a dynamic model
                this._type = 'dynamicmodel';
                this.setDynamicModelOption();
            }
            else if (this._type === 'models' && typeof this.options.model === 'string') {
                // this is a dynamic model
                this._type = 'dynamicmodels';
                this.setDynamicModelOption();
            }
            this.processType();
        };
        SwissdataField.prototype.processType = function () {
            var _this = this;
            if (this._type === 'dynamicmodel' || this._type === 'dynamicmodels') {
                if (Array.isArray(this.selectOptions)) {
                    this.selectOptions = this.selectOptions;
                }
                else if (!this.options.dynamicmodel || !this.options.dynamicmodel.slug) {
                    log.warn('Dynamicmodel not set in options for property', this.property);
                }
                else {
                    models_1.DynamicDataModel.use(this.options.dynamicmodel.slug).getAll().then(function (results) {
                        _this.selectOptions = results;
                    });
                }
            }
            else if (this._type === 'address') {
                if (this.instance[this.property] === null || this.instance[this.property] === undefined || typeof this.instance[this.property] !== 'object') {
                    this.instance[this.property] = {};
                }
            }
            else {
                _super.prototype.processType.call(this);
            }
        };
        SwissdataField.prototype.setDynamicModelOption = function () {
            if (this._type !== 'dynamicmodel' && this._type !== 'dynamicmodels')
                return;
            if (this.options.dynamicmodel && this.options.dynamicmodel instanceof models_1.DynamicDataModel)
                return;
            this.options.dynamicmodel = models_1.DynamicDataModel.models[this.options.model];
        };
        __decorate([
            aurelia_framework_1.bindable
        ], SwissdataField.prototype, "instance", void 0);
        __decorate([
            aurelia_framework_1.bindable
        ], SwissdataField.prototype, "property", void 0);
        __decorate([
            aurelia_framework_1.bindable
        ], SwissdataField.prototype, "type", void 0);
        __decorate([
            aurelia_framework_1.bindable
        ], SwissdataField.prototype, "autohint", void 0);
        __decorate([
            aurelia_framework_1.bindable
        ], SwissdataField.prototype, "variant", void 0);
        __decorate([
            aurelia_framework_1.bindable
        ], SwissdataField.prototype, "selectOptions", void 0);
        SwissdataField = __decorate([
            aurelia_framework_1.inject(Element, deco_1.DecoApi)
        ], SwissdataField);
        return SwissdataField;
    }(deco_1.DecoField));
    exports.SwissdataField = SwissdataField;
});
