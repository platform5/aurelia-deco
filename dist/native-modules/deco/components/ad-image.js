var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { ImageHelpers } from 'aurelia-resources';
import { bindable, inject, observable, BindingEngine } from 'aurelia-framework';
import { Model } from '../decorators/model';
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
        this.internalResize = true;
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
        this.element.classList.add('ad-image');
        if (this.invisibleBeforeLoading) {
            this.element.classList.add('animate-opacity');
            this.element.classList.add('invisible');
        }
        else {
            // this.element.classList.remove('animate-opacity');
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
        return __awaiter(this, void 0, void 0, function () {
            var rightInstance, propValue, filename, url, _a, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this._preventMultipleRequests) {
                            setTimeout(function () {
                                _this.getSrc();
                            }, 100);
                            return [2 /*return*/];
                        }
                        this._preventMultipleRequests = true;
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 10); })];
                    case 1:
                        _b.sent();
                        if (!this.instance)
                            return [2 /*return*/, this.setOriginal()];
                        rightInstance = this.instance instanceof Model;
                        if (!rightInstance)
                            return [2 /*return*/, this.setOriginal()];
                        if (!this.property)
                            return [2 /*return*/, this.setOriginal()];
                        if (!this.instance[this.property])
                            return [2 /*return*/, this.setOriginal()];
                        propValue = this.instance[this.property];
                        if (Array.isArray(propValue)) {
                            if (propValue.length === 0)
                                return [2 /*return*/, this.setOriginal()];
                            // we have a multiple files property
                            if (this.fileId === 'first') {
                                filename = this.instance[this.property][0].filename || '';
                            }
                            else {
                                filename = this.fileId;
                            }
                        }
                        else {
                            // we have a single file property
                            filename = this.instance[this.property].filename || '';
                        }
                        if (this._requestedImage === this.instance.id + '-' + this.property + '-' + this.format + '-' + filename) {
                            // ignore this, we already just previously requested this image
                            this.removeInvisible();
                            // this.element.classList.remove('animate-opacity');
                            this._preventMultipleRequests = false;
                            return [2 /*return*/];
                        }
                        this._requestedImage = this.instance.id + '-' + this.property + '-' + this.format + '-' + filename;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, , 8]);
                        if (!this.internalResize) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.instance.getFilePreview(this.property, this.format, { fileId: filename }).then(function (blob) {
                                if (blob.type.substr(0, 6) !== 'image/')
                                    throw new Error('Invalid Blob Type:' + blob.type);
                                return ImageHelpers.open(blob);
                            }).then(function (image) {
                                console.log('image.mimetype', image.mimetype);
                                if (_this.w && _this.h) {
                                    image.cover(_this.w, _this.h);
                                }
                                else if (_this.w) {
                                    image.resize(_this.w, ImageHelpers.AUTO);
                                }
                                else if (_this.h) {
                                    image.resize(ImageHelpers.AUTO, _this.h);
                                }
                                //image.cover(300, 300);
                                return image.toDataUrl();
                            })];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.instance.getFilePreviewUrl(this.property, this.format, { fileId: filename })];
                    case 5:
                        _a = _b.sent();
                        _b.label = 6;
                    case 6:
                        url = _a;
                        this.src = url;
                        this._preventMultipleRequests = false;
                        this.removeInvisible();
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _b.sent();
                        console.error(error_1);
                        this.setOriginal();
                        this._preventMultipleRequests = false;
                        return [3 /*break*/, 8];
                    case 8:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    AdImage.prototype.setOriginal = function () {
        this.src = this.originalSrc;
        this.removeInvisible();
        // this.element.classList.remove('animate-opacity');
        this._requestedImage = '';
        this._preventMultipleRequests = false;
    };
    AdImage.prototype.srcChanged = function () {
        this.element.setAttribute('src', this.src);
    };
    AdImage.prototype.removeInvisible = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 10); })];
                    case 1:
                        _a.sent();
                        this.element.classList.remove('invisible');
                        return [2 /*return*/];
                }
            });
        });
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
        bindable
    ], AdImage.prototype, "instance", void 0);
    __decorate([
        bindable
    ], AdImage.prototype, "property", void 0);
    __decorate([
        bindable
    ], AdImage.prototype, "fileId", void 0);
    __decorate([
        bindable
    ], AdImage.prototype, "w", void 0);
    __decorate([
        bindable
    ], AdImage.prototype, "h", void 0);
    __decorate([
        bindable
    ], AdImage.prototype, "src", void 0);
    __decorate([
        bindable
    ], AdImage.prototype, "invisibleBeforeLoading", void 0);
    __decorate([
        bindable
    ], AdImage.prototype, "hardsize", void 0);
    __decorate([
        bindable
    ], AdImage.prototype, "internalResize", void 0);
    __decorate([
        observable
    ], AdImage.prototype, "format", void 0);
    AdImage = __decorate([
        inject(Element, BindingEngine)
    ], AdImage);
    return AdImage;
}());
export { AdImage };
