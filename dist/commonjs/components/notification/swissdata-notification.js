"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = exports.errorHandler = exports.notifier = exports.SwissdataNotification = void 0;
var aurelia_i18n_1 = require("aurelia-i18n");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var aurelia_framework_1 = require("aurelia-framework");
var core_1 = require("@aurelia-ux/core");
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
        aurelia_framework_1.bindable
    ], SwissdataNotification.prototype, "theme", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], SwissdataNotification.prototype, "handlerId", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], SwissdataNotification.prototype, "catchAll", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], SwissdataNotification.prototype, "display", void 0);
    SwissdataNotification = __decorate([
        aurelia_framework_1.inject(Element, core_1.StyleEngine, aurelia_event_aggregator_1.EventAggregator)
    ], SwissdataNotification);
    return SwissdataNotification;
}());
exports.SwissdataNotification = SwissdataNotification;
function notifier(handlerId, options) {
    if (handlerId === void 0) { handlerId = 'main'; }
    return function (title, message, type) {
        if (type === void 0) { type = 'info'; }
        var i18n = aurelia_framework_1.Container.instance.get(aurelia_i18n_1.I18N);
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
        var eventAggregator = aurelia_framework_1.Container.instance.get(aurelia_event_aggregator_1.EventAggregator);
        eventAggregator.publish(notification);
    };
}
exports.notifier = notifier;
function errorHandler(handlerId, options) {
    if (handlerId === void 0) { handlerId = 'main'; }
    return function (error) {
        var i18n = aurelia_framework_1.Container.instance.get(aurelia_i18n_1.I18N);
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
        var eventAggregator = aurelia_framework_1.Container.instance.get(aurelia_event_aggregator_1.EventAggregator);
        eventAggregator.publish(notification);
    };
}
exports.errorHandler = errorHandler;
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
exports.Notification = Notification;
