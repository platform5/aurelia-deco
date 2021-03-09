var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-framework", "aurelia-resources"], function (require, exports, aurelia_framework_1, aurelia_resources_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.adDialogModel = exports.AdDialogModel = void 0;
    var AdDialogModel = /** @class */ (function () {
        function AdDialogModel() {
            this.properties = [];
            this.data = {};
            this.displayRefLocale = false;
            this.refLocale = '';
        }
        AdDialogModel.prototype.activate = function (params) {
            this.params = params;
            this.processParams();
        };
        AdDialogModel.prototype.processParams = function () {
            this.instance = this.params.instance;
            this.properties = this.params.properties;
            this.data = this.params.data;
            if (typeof this.params.displayRefLocale === 'boolean')
                this.displayRefLocale = this.params.displayRefLocale;
            else
                this.params.displayRefLocale = false;
            if (typeof this.params.refLocale === 'string')
                this.refLocale = this.params.refLocale;
            else
                this.params.refLocale = '';
        };
        AdDialogModel.prototype.getViewStrategy = function () {
            if (this.params.viewPath)
                return this.params.viewPath;
            return './ad-dialog-model.html';
        };
        AdDialogModel = __decorate([
            aurelia_framework_1.inject(Element)
        ], AdDialogModel);
        return AdDialogModel;
    }());
    exports.AdDialogModel = AdDialogModel;
    var adDialogModel = function (instance, options, properties) {
        if (properties === void 0) { properties = []; }
        var dialogOptions = {
            title: options.title,
            type: options.type ? options.type : 'edition',
            bindingContext: options.bindingContext,
            content: options.content,
            contentViewModelPath: options.contentViewModelPath,
            editionViewModelPath: options.editionViewModelPath ? options.editionViewModelPath : 'aurelia-deco/components/form/ad-dialog-model',
        };
        dialogOptions.editionModel = {
            instance: instance,
            properties: properties
        };
        if (options.editionViewPath) {
            dialogOptions.editionModel.viewPath = options.editionViewPath;
        }
        if (options.editionCallback) {
            dialogOptions.editionCallback = options.editionCallback;
        }
        else {
            dialogOptions.editionCallback = function () {
                if (instance.id) {
                    var prop = Array.isArray(properties) ? properties : Object.keys(instance);
                    return instance.updateProperties(options.editionCallbackSuffix, prop);
                }
                else {
                    return instance.save(options.editionCallbackSuffix);
                }
            };
        }
        if (options.data)
            dialogOptions.editionModel.data = options.data;
        var dialog = aurelia_resources_1.arDialog(dialogOptions);
        return dialog;
    };
    exports.adDialogModel = adDialogModel;
});
