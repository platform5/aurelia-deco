"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdImage = void 0;
var aurelia_resources_1 = require("aurelia-resources");
var aurelia_framework_1 = require("aurelia-framework");
var model_1 = require("../decorators/model");
var AdImage = /** @class */ (function () {
    function AdImage(element, bindingEngine) {
        this.element = element;
        this.bindingEngine = bindingEngine;
        this.fileId = 'first';
        this.w = 300;
        this.h = 300;
        this.src = '';
        this.invisibleBeforeLoading = true;
        this.hardsize = false;
        this.originalSrc = '';
        this._preventMultipleRequests = false;
        if (element.tagName === 'AD-IMAGE') {
            throw new Error('cannot use <ad-image>. use <img as-element="ad-image">.');
        }
        if (element.tagName === 'COMPOSE') {
            throw new Error('cannot use <compose view-model="ad-image">. use <img as-element="compose" view-model="ad-image">.');
        }
    }
    AdImage.prototype.hardsizeChanged = function () {
        if (!this.hardsize) {
            this.element.removeAttribute('width');
            this.element.removeAttribute('height');
        }
        else {
            if (this.w) {
                this.element.setAttribute('width', this.w.toString());
            }
            else {
                this.element.removeAttribute('width');
            }
            if (this.h) {
                this.element.setAttribute('height', this.h.toString());
            }
            else {
                this.element.removeAttribute('height');
            }
        }
    };
    AdImage.prototype.detached = function () {
        if (this.observerSubscription)
            this.observerSubscription.dispose();
        if (this.observerSubscription2)
            this.observerSubscription2.dispose();
    };
    AdImage.prototype.bind = function () {
        this.originalSrc = this.src;
        var format = this.format;
        this.setFormat();
        this.hardsizeChanged();
        if (this.format === format) {
            // format has not changed, call this.getSrc manually
            this.getSrc();
        }
        this.observeProperty();
    };
    AdImage.prototype.instanceChanged = function () {
        this.getSrc();
        this.observeProperty();
    };
    AdImage.prototype.propertyChanged = function () {
        this.getSrc();
        this.observeProperty();
    };
    AdImage.prototype.fileIdChanged = function () {
        this.getSrc();
        this.observeProperty();
    };
    AdImage.prototype.wChanged = function () {
        if (typeof this.w === 'string')
            this.w = parseInt(this.w);
        else
            this.setFormat();
        this.hardsizeChanged();
    };
    AdImage.prototype.hChanged = function () {
        if (typeof this.h === 'string')
            this.h = parseInt(this.h);
        else
            this.setFormat();
        this.hardsizeChanged();
    };
    AdImage.prototype.attached = function () {
        if (this.invisibleBeforeLoading) {
            this.element.classList.add('ad-image');
            this.element.classList.add('invisible');
        }
        else {
            this.element.classList.remove('animate-opacity');
        }
    };
    AdImage.prototype.setFormat = function () {
        var w = this.w ? this.w.toString() : '';
        var h = this.h ? this.h.toString() : '';
        if (w && h) {
            this.format = w + ":" + h;
        }
        else if (w) {
            this.format = w;
        }
        else if (h) {
            this.format = ":" + h;
        }
        else {
            this.format = '';
        }
    };
    AdImage.prototype.formatChanged = function () {
        this.getSrc();
    };
    AdImage.prototype.getSrc = function () {
        var _this = this;
        if (this._preventMultipleRequests) {
            setTimeout(function () {
                _this.getSrc();
            }, 100);
            return;
        }
        clearTimeout(this._timeout);
        this._timeout = setTimeout(function () {
            if (!_this.instance)
                return _this.setOriginal();
            var rightInstance = _this.instance instanceof model_1.Model;
            if (!rightInstance)
                return _this.setOriginal();
            if (!_this.property)
                return _this.setOriginal();
            if (!_this.instance[_this.property])
                return _this.setOriginal();
            var propValue = _this.instance[_this.property];
            var filename;
            if (Array.isArray(propValue)) {
                if (propValue.length === 0)
                    return _this.setOriginal();
                // we have a multiple files property
                if (_this.fileId === 'first') {
                    filename = _this.instance[_this.property][0].filename || '';
                }
                else {
                    filename = _this.fileId;
                }
            }
            else {
                // we have a single file property
                filename = _this.instance[_this.property].filename || '';
            }
            if (_this._requestedImage === _this.instance.id + '-' + _this.property + '-' + _this.format + '-' + filename) {
                // ignore this, we already just previously requested this image
                _this.element.classList.remove('invisible');
                _this.element.classList.remove('animate-opacity');
                return;
            }
            _this._preventMultipleRequests = true;
            _this._requestedImage = _this.instance.id + '-' + _this.property + '-' + _this.format + '-' + filename;
            _this.instance.getFilePreview(_this.property, _this.format, { fileId: filename }).then(function (blob) {
                if (blob.type.substr(0, 6) !== 'image/')
                    throw new Error('Invalid Blob Type:' + blob.type);
                return aurelia_resources_1.ImageHelpers.open(blob);
            }).then(function (image) {
                // TODO: check the mimetype here
                // it's all PNG, but should also be JPEG for some preview
                console.log('image.mimetype', image.mimetype);
                if (_this.w && _this.h) {
                    image.cover(_this.w, _this.h);
                }
                else if (_this.w) {
                    image.resize(_this.w, aurelia_resources_1.ImageHelpers.AUTO);
                }
                else if (_this.h) {
                    image.resize(aurelia_resources_1.ImageHelpers.AUTO, _this.h);
                }
                //image.cover(300, 300);
                return image.toDataUrl();
            }).then(function (url) {
                _this.src = url;
                _this._preventMultipleRequests = false;
                _this.element.classList.remove('invisible');
                _this.element.classList.remove('animate-opacity');
            }).catch(function (error) {
                console.error(error);
                _this.setOriginal();
                _this._preventMultipleRequests = false;
            });
        }, 10);
    };
    AdImage.prototype.setOriginal = function () {
        this.src = this.originalSrc;
        this.element.classList.remove('invisible');
        this.element.classList.remove('animate-opacity');
        this._requestedImage = '';
    };
    AdImage.prototype.srcChanged = function () {
        this.element.setAttribute('src', this.src);
    };
    AdImage.prototype.observeProperty = function () {
        var _this = this;
        if (this.observerSubscription)
            this.observerSubscription.dispose();
        if (this.observerSubscription2)
            this.observerSubscription2.dispose();
        this.observerSubscription = this.bindingEngine.propertyObserver(this.instance, this.property).subscribe(function () {
            _this.getSrc();
        });
        if (this.instance[this.property] && typeof this.instance[this.property] === 'object' && this.instance[this.property].filename) {
            // if the value is set with a filename, we also want to observer this property
            this.observerSubscription = this.bindingEngine.propertyObserver(this.instance[this.property], 'filename').subscribe(function () {
                _this.getSrc();
            });
        }
    };
    __decorate([
        aurelia_framework_1.bindable
    ], AdImage.prototype, "instance", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImage.prototype, "property", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImage.prototype, "fileId", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImage.prototype, "w", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImage.prototype, "h", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImage.prototype, "src", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImage.prototype, "invisibleBeforeLoading", void 0);
    __decorate([
        aurelia_framework_1.bindable
    ], AdImage.prototype, "hardsize", void 0);
    __decorate([
        aurelia_framework_1.observable
    ], AdImage.prototype, "format", void 0);
    AdImage = __decorate([
        aurelia_framework_1.inject(Element, aurelia_framework_1.BindingEngine)
    ], AdImage);
    return AdImage;
}());
exports.AdImage = AdImage;
