var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, bindable, observable } from 'aurelia-framework';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '@aurelia-ux/core';
import { getLogger } from 'aurelia-logging';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DOM } from 'aurelia-pal';
import { computedFrom } from 'aurelia-framework';
import { DynamicDataModel } from '../../models';
import { errorify, notify } from 'aurelia-resources';
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
        this.log = getLogger('as-contact');
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
        this.instance = new DynamicDataModel(this.modelSlug);
        for (var key in this.defaultValues) {
            this.instance.set(key, this.defaultValues[key]);
        }
    };
    AsContact.prototype.send = function () {
    };
    AsContact.prototype.initInstance = function () {
        this.instance = new DynamicDataModel(this.modelSlug);
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
            var rightInstance = this.instance instanceof DynamicDataModel;
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
        this.element.dispatchEvent(DOM.createCustomEvent('sent', {
            bubbles: true,
            detail: {
                instance: this.instance
            }
        }));
        this.initInstance();
        notify(this.success, { timeout: 30000 });
        //notifier('main', {lifetime: 30000, hideOnClick: true})('', this.success, 'confirmation')
        this.showSuccess = true;
        setTimeout(function () {
            _this.showSuccess = false;
        }, 30000);
    };
    AsContact.prototype.savingError = function (event) {
        if (event.detail && event.detail.error) {
            errorify(event.detail.error);
            //errorHandler('main', {hideOnClick: false, clearHandlerWhenIntercepted: true})(event.detail.error);
        }
    };
    __decorate([
        bindable
    ], AsContact.prototype, "theme", void 0);
    __decorate([
        bindable
    ], AsContact.prototype, "modelSlug", void 0);
    __decorate([
        bindable
    ], AsContact.prototype, "includeProperties", void 0);
    __decorate([
        bindable
    ], AsContact.prototype, "excludeProperties", void 0);
    __decorate([
        bindable
    ], AsContact.prototype, "success", void 0);
    __decorate([
        bindable
    ], AsContact.prototype, "showSuccess", void 0);
    __decorate([
        bindable
    ], AsContact.prototype, "defaultValues", void 0);
    __decorate([
        observable
    ], AsContact.prototype, "sending", void 0);
    __decorate([
        computedFrom('instance', 'includeProperties', 'excludeProperties')
    ], AsContact.prototype, "properties", null);
    AsContact = __decorate([
        inject(Element, StyleEngine, EventAggregator),
        customElement('as-contact')
    ], AsContact);
    return AsContact;
}());
export { AsContact };
