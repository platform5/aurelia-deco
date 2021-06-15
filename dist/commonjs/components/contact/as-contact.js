"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsContact = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var core_1 = require("@aurelia-ux/core");
var aurelia_logging_1 = require("aurelia-logging");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var aurelia_pal_1 = require("aurelia-pal");
var aurelia_framework_2 = require("aurelia-framework");
var models_1 = require("../../models");
var aurelia_resources_1 = require("aurelia-resources");
var AsContact = /** @class */ (function () {
    function AsContact(element, styleEngine, eventAggregator) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.eventAggregator = eventAggregator;
        this.includeProperties = [];
        this.excludeProperties = [];
        this.success = 'Your message has been sent';
        this.showSuccess = false;
        this.defaultValues = {};
        this.sending = false;
        this.log = aurelia_logging_1.getLogger('as-contact');
    }
    AsContact.prototype.bind = function () {
        var element = this.element;
        this.themeChanged(this.theme);
        this.modelSlugChanged();
    };
    AsContact.prototype.attached = function () {
    };
    AsContact.prototype.detached = function () {
    };
    AsContact.prototype.sendingChanged = function () {
    };
    AsContact.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'as-contact';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    AsContact.prototype.modelSlugChanged = function () {
        if (!this.modelSlug)
            this.instance = null;
        this.instance = new models_1.DynamicDataModel(this.modelSlug);
        for (var key in this.defaultValues) {
            this.instance.set(key, this.defaultValues[key]);
        }
    };
    AsContact.prototype.send = function () {
    };
    AsContact.prototype.initInstance = function () {
        this.instance = new models_1.DynamicDataModel(this.modelSlug);
        for (var key in this.defaultValues) {
            this.instance.set(key, this.defaultValues[key]);
        }
    };
    AsContact.prototype.hasIncludeProperties = function () {
        return Array.isArray(this.includeProperties) && this.includeProperties.length > 0;
    };
    AsContact.prototype.hasExcludeProperties = function () {
        return Array.isArray(this.excludeProperties) && this.excludeProperties.length > 0;
    };
    Object.defineProperty(AsContact.prototype, "properties", {
        get: function () {
            if (!this.instance)
                return [];
            var rightInstance = this.instance instanceof models_1.DynamicDataModel;
            if (!rightInstance) {
                this.log.warn('Invalid instance');
                return [];
            }
            var properties = [];
            for (var property in this.instance.deco.propertyTypes) {
                if (this.hasIncludeProperties() && this.includeProperties.indexOf(property) === -1)
                    continue;
                if (this.hasExcludeProperties() && this.excludeProperties.indexOf(property) !== -1)
                    continue;
                properties.push(property);
            }
            return properties;
        },
        enumerable: false,
        configurable: true
    });
    AsContact.prototype.saved = function () {
        var _this = this;
        this.element.dispatchEvent(aurelia_pal_1.DOM.createCustomEvent('sent', {
            bubbles: true,
            detail: {
                instance: this.instance
            }
        }));
        this.initInstance();
        aurelia_resources_1.notify(this.success, { timeout: 30000 });
        //notifier('main', {lifetime: 30000, hideOnClick: true})('', this.success, 'confirmation')
        this.showSuccess = true;
        setTimeout(function () {
            _this.showSuccess = false;
        }, 30000);
    };
    AsContact.prototype.savingError = function (event) {
        if (event.detail && event.detail.error) {
            aurelia_resources_1.errorify(event.detail.error);
            //errorHandler('main', {hideOnClick: false, clearHandlerWhenIntercepted: true})(event.detail.error);
        }
    };
    __decorate([
        aurelia_framework_1.bindable
    ], AsContact.prototype, "theme", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AsContact.prototype, "modelSlug", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AsContact.prototype, "includeProperties", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AsContact.prototype, "excludeProperties", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AsContact.prototype, "success", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AsContact.prototype, "showSuccess", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AsContact.prototype, "defaultValues", void 0);
    __decorate([
        aurelia_framework_1.observable
    ], AsContact.prototype, "sending", void 0);
    __decorate([
        aurelia_framework_2.computedFrom('instance', 'includeProperties', 'excludeProperties')
    ], AsContact.prototype, "properties", null);
    AsContact = __decorate([
        aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine, aurelia_event_aggregator_1.EventAggregator),
        aurelia_framework_1.customElement('as-contact')
    ], AsContact);
    return AsContact;
}());
exports.AsContact = AsContact;
