"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdImages = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_logging_1 = require("aurelia-logging");
var AdImages = /** @class */ (function () {
    function AdImages(element) {
        var _this = this;
        this.element = element;
        this.w = 300;
        this.h = 300;
        this.hardsize = false;
        this.src = '';
        this.invisibleBeforeLoading = true;
        this.clickNavigation = true;
        this.showBullets = true;
        this.showNavigation = true;
        this.internalResize = true;
        this.activeIndex = 0;
        this.log = aurelia_logging_1.getLogger('comp:ad-images');
        this.handleClick = function (event) {
            if (!_this.clickNavigation)
                return;
            var clickX = event.offsetX;
            var w = _this.element.offsetWidth;
            if (clickX / w < 0.5) {
                // click left
                _this.left();
            }
            else {
                // click right
                _this.right();
            }
        };
        this.handleTouchStart = function (event) {
            _this.xmove = 0;
            _this.xtouchstart = event.touches[0].pageX;
            _this.ytouchstart = event.touches[0].pageY;
            _this.longtouch = false;
            if (_this.longtouchTimeout)
                clearTimeout(_this.longtouchTimeout);
            _this.longtouchTimeout = setTimeout(function () {
                _this.longtouch = true;
                _this.longtouchTimeout = null;
            }, 350);
        };
        this.handleTouchMove = function (event) {
            _this.xtouchmove = event.touches[0].pageX;
            _this.ytouchmove = event.touches[0].pageY;
            _this.xmove = _this.xtouchstart - _this.xtouchmove;
        };
        this.handleTouchStop = function (event) {
            var ymove = Math.abs(_this.ytouchstart - _this.ytouchmove);
            var xmove = Math.abs(_this.xmove);
            var ratio = xmove / ymove;
            if (ratio > 5 && _this.xmove > 100 && !_this.longtouch) {
                _this.right();
            }
            if (ratio > 5 && _this.xmove < 100 && !_this.longtouch) {
                _this.left();
            }
        };
    }
    AdImages.prototype.attached = function () {
        this.element.addEventListener('click', this.handleClick);
        this.element.addEventListener('touchstart', this.handleTouchStart);
        this.element.addEventListener('touchmove', this.handleTouchMove);
        this.element.addEventListener('touchend', this.handleTouchStop);
    };
    AdImages.prototype.detached = function () {
        this.element.removeEventListener('click', this.handleClick);
        this.element.removeEventListener('touchstart', this.handleTouchStart);
        this.element.removeEventListener('touchmove', this.handleTouchMove);
        this.element.removeEventListener('touchend', this.handleTouchStop);
    };
    AdImages.prototype.makeActive = function (index, event) {
        if (event) {
            event.stopPropagation();
        }
        this.activeIndex = index;
    };
    AdImages.prototype.right = function (event) {
        console.log('click right');
        if (event) {
            event.stopPropagation();
        }
        if (this.activeIndex < this.instance[this.property].length - 1)
            this.activeIndex++;
    };
    AdImages.prototype.left = function (event) {
        console.log('click left');
        if (event) {
            event.stopPropagation();
        }
        if (this.activeIndex > 0)
            this.activeIndex--;
    };
    __decorate([
        aurelia_framework_1.bindable
    ], AdImages.prototype, "instance", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImages.prototype, "property", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImages.prototype, "w", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImages.prototype, "h", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImages.prototype, "hardsize", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImages.prototype, "src", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImages.prototype, "invisibleBeforeLoading", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImages.prototype, "clickNavigation", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImages.prototype, "showBullets", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImages.prototype, "showNavigation", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImages.prototype, "internalResize", void 0);
    AdImages = __decorate([
        aurelia_framework_1.inject(Element)
    ], AdImages);
    return AdImages;
}());
exports.AdImages = AdImages;
