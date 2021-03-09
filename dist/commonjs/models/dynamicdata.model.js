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
exports.DynamicDataModel = void 0;
var deco_1 = require("../deco");
var DynamicDataModel = /** @class */ (function (_super) {
    __extends(DynamicDataModel, _super);
    function DynamicDataModel(slug) {
        var _this = _super.call(this) || this;
        if (slug) {
            Object.getPrototypeOf(_this)._deco = DynamicDataModel_1.use(slug).deco;
            _this.modelId = DynamicDataModel_1.models[slug].id;
        }
        return _this;
    }
    DynamicDataModel_1 = DynamicDataModel;
    DynamicDataModel.clearRegisteredModels = function () {
        DynamicDataModel_1.models = {};
        DynamicDataModel_1.currentModelSlug = '';
    };
    DynamicDataModel.registerModel = function (model) {
        DynamicDataModel_1.models[model.slug] = DynamicDataModel_1.addDecoToModel(model);
        DynamicDataModel_1.models[model.id] = DynamicDataModel_1.models[model.slug];
    };
    DynamicDataModel.addDecoToModel = function (model) {
        var deco = {
            baseroute: DynamicDataModel_1.originalDeco.baseroute + '/' + model.slug,
            target: DynamicDataModel_1.originalDeco.target,
            options: DynamicDataModel_1.originalDeco.options,
            propertyTypes: {},
            propertyTypesOptions: {},
            propertyFromApiOnly: [],
            propertyForms: {},
            propertyValidations: {},
            propertySearchables: [],
            propertySortables: [],
            propertyFilterables: [],
            propertyFilterablesOptions: {}
        };
        deco.propertyTypes.id = deco_1.type.anyDecorator;
        for (var _i = 0, _a = model.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            if (field.type === 'string' && field.options.multilang) {
                //field.options.locales = modelApp.locales;
            }
            var typeDecoratorKey = field.type + "Decorator";
            deco.propertyTypes[field.name] = deco_1.type[typeDecoratorKey] || deco_1.type.anyDecorator;
            deco.propertyTypesOptions[field.name] = field.options;
            deco.propertyValidations[field.name] = (Array.isArray(field.validation)) ? field.validation : [];
            if (field.required) {
                deco.propertyValidations[field.name].push({ type: 'required', options: {} });
            }
        }
        var newModelConfig = Object.assign({}, model, { deco: deco });
        return newModelConfig;
    };
    DynamicDataModel.use = function (slug) {
        DynamicDataModel_1.currentModelSlug = slug;
        return DynamicDataModel_1;
    };
    Object.defineProperty(DynamicDataModel, "deco", {
        get: function () {
            return DynamicDataModel_1.models[DynamicDataModel_1.currentModelSlug].deco;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DynamicDataModel.prototype, "deco", {
        get: function () {
            var modelId = this.modelId;
            var dynamicDataModel = DynamicDataModel_1.models[modelId];
            return dynamicDataModel.deco;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DynamicDataModel, "originalDeco", {
        get: function () {
            if (DynamicDataModel_1._originalDeco)
                return DynamicDataModel_1._originalDeco;
            if (this.prototype._deco) {
                DynamicDataModel_1._originalDeco = deco_1.cloneDeco(this.prototype._deco);
            }
            return DynamicDataModel_1._originalDeco;
        },
        enumerable: false,
        configurable: true
    });
    DynamicDataModel.instanceFromElement = function (element) {
        var modelId = element.modelId;
        var dynamicDataModel = DynamicDataModel_1.models[modelId];
        var instance = new dynamicDataModel.deco.target;
        instance.modelId = modelId;
        Object.getPrototypeOf(instance)._deco = dynamicDataModel.deco;
        return instance;
    };
    Object.defineProperty(DynamicDataModel.prototype, "_label", {
        get: function () {
            var modelId = this.modelId;
            var model = this.deco.target.models[modelId];
            var labelConfig = model.label;
            if (!labelConfig) {
                return this.id;
            }
            var lits = [];
            var regex = /(?:.*?)\$\{([^$]*)\}(?:.*?)/g;
            var match;
            while (match = regex.exec(labelConfig)) {
                lits.push(match[1]);
            }
            var result = labelConfig;
            for (var _i = 0, lits_1 = lits; _i < lits_1.length; _i++) {
                var lit = lits_1[_i];
                if (this[lit]) {
                    result = result.replace('${' + lit + '}', this[lit]);
                }
                else {
                    result = result.replace('${' + lit + '}', '[---]');
                }
            }
            return result;
        },
        enumerable: false,
        configurable: true
    });
    var DynamicDataModel_1;
    DynamicDataModel.models = {};
    __decorate([
        deco_1.type.id
    ], DynamicDataModel.prototype, "modelId", void 0);
    DynamicDataModel = DynamicDataModel_1 = __decorate([
        deco_1.model('/dynamicdata')
    ], DynamicDataModel);
    return DynamicDataModel;
}(deco_1.Model));
exports.DynamicDataModel = DynamicDataModel;
