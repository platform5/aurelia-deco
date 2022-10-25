var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { I18N } from 'aurelia-i18n';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject, bindable, Container } from 'aurelia-framework';
import { StyleEngine } from '@aurelia-ux/core';
var SwissdataNotification = /** @class */ (function () {
    function SwissdataNotification(element, styleEngine, eventAggregator) {
        var _this = this;
        this.element = element;
        this.styleEngine = styleEngine;
        this.eventAggregator = eventAggregator;
        this.handlerId = 'main';
        this.catchAll = false;
        this.display = 'inline';
        this.currentNotifications = [];
        this.eventAggregator.subscribe(Notification, function (notification) {
            if (notification.intercepted)
                return;
            if (notification.handlerDestination === _this.handlerId)
                return _this.interceptNow(notification);
            if (_this.catchAll)
                return _this.interceptLater(notification);
        });
    }
    SwissdataNotification.prototype.bind = function () {
        this.themeChanged(this.theme);
    };
    SwissdataNotification.prototype.attached = function () {
    };
    SwissdataNotification.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'swissdata-notification';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    SwissdataNotification.prototype.interceptNow = function (notification) {
        var _this = this;
        if (notification.intercepted)
            return;
        notification.intercepted = true;
        if (notification.clearHandlerWhenIntercepted) {
            this.currentNotifications = [];
        }
        this.currentNotifications.push(notification);
        if (notification.lifetime > 0) {
            setTimeout(function () {
                _this.removeNotification(notification);
            }, notification.lifetime);
        }
    };
    SwissdataNotification.prototype.interceptLater = function (notification) {
        var _this = this;
        setTimeout(function () {
            _this.interceptNow(notification);
        }, 100);
    };
    SwissdataNotification.prototype.removeNotification = function (notification) {
        // copy array
        var tmpArray = [];
        for (var _i = 0, _a = this.currentNotifications; _i < _a.length; _i++) {
            var n = _a[_i];
            tmpArray.push(n);
        }
        // splice tmp array
        var index = tmpArray.indexOf(notification);
        if (index === -1)
            return;
        tmpArray.splice(index, 1);
        // copy tmp in current notif
        this.currentNotifications = tmpArray;
    };
    SwissdataNotification.prototype.clickOnNotification = function (notification) {
        if (notification.hideOnClick)
            this.removeNotification(notification);
    };
    __decorate([
        bindable
    ], SwissdataNotification.prototype, "theme", void 0);
    __decorate([
        bindable
    ], SwissdataNotification.prototype, "handlerId", void 0);
    __decorate([
        bindable
    ], SwissdataNotification.prototype, "catchAll", void 0);
    __decorate([
        bindable
    ], SwissdataNotification.prototype, "display", void 0);
    SwissdataNotification = __decorate([
        inject(Element, StyleEngine, EventAggregator)
    ], SwissdataNotification);
    return SwissdataNotification;
}());
export { SwissdataNotification };
export function notifier(handlerId, options) {
    if (handlerId === void 0) { handlerId = 'main'; }
    return function (title, message, type) {
        if (type === void 0) { type = 'info'; }
        var i18n = Container.instance.get(I18N);
        var notification = new Notification(type, handlerId);
        if (!options || (options && options.enableTranslation !== false)) {
            title = i18n.tr(type + "." + title);
            message = i18n.tr(type + "." + message);
        }
        notification.title = title;
        notification.message = message;
        if (options && options.lifetime !== undefined)
            notification.lifetime = options.lifetime;
        if (options && options.hideOnClick !== undefined)
            notification.hideOnClick = options.hideOnClick;
        if (options && options.clearHandlerWhenIntercepted !== undefined)
            notification.clearHandlerWhenIntercepted = options.clearHandlerWhenIntercepted;
        var eventAggregator = Container.instance.get(EventAggregator);
        eventAggregator.publish(notification);
    };
}
export function errorHandler(handlerId, options) {
    if (handlerId === void 0) { handlerId = 'main'; }
    return function (error) {
        var i18n = Container.instance.get(I18N);
        var notification = new Notification('error', handlerId);
        var message = error.message;
        if (!options || (options && options.enableTranslation !== false)) {
            message = i18n.tr("error." + message);
        }
        notification.message = message;
        //notification.message = error.message;
        if (options && options.lifetime !== undefined)
            notification.lifetime = options.lifetime;
        if (options && options.hideOnClick !== undefined)
            notification.hideOnClick = options.hideOnClick;
        if (options && options.clearHandlerWhenIntercepted !== undefined)
            notification.clearHandlerWhenIntercepted = options.clearHandlerWhenIntercepted;
        var eventAggregator = Container.instance.get(EventAggregator);
        eventAggregator.publish(notification);
    };
}
var Notification = /** @class */ (function () {
    function Notification(type, handlerDesination) {
        this.handlerDestination = 'main';
        this.lifetime = 4 * 1000;
        this.hideOnClick = true;
        this.intercepted = false;
        this.clearHandlerWhenIntercepted = false;
        this.type = type;
        if (handlerDesination)
            this.handlerDestination = handlerDesination;
    }
    return Notification;
}());
export { Notification };
