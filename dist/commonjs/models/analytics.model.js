"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsModel = void 0;
var deco_1 = require("../deco");
var AnalyticsModel = /** @class */ (function (_super) {
    __extends(AnalyticsModel, _super);
    function AnalyticsModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sessionId = '';
        _this.type = 'navigation';
        return _this;
    }
    __decorate([
        deco_1.type.string,
        deco_1.validate.required
    ], AnalyticsModel.prototype, "sessionId", void 0);
    __decorate([
        deco_1.type.string
    ], AnalyticsModel.prototype, "identity", void 0);
    __decorate([
        deco_1.type.string,
        deco_1.validate.required
    ], AnalyticsModel.prototype, "type", void 0);
    __decorate([
        deco_1.type.string,
        deco_1.validate.required
    ], AnalyticsModel.prototype, "path", void 0);
    __decorate([
        deco_1.type.string
    ], AnalyticsModel.prototype, "category", void 0);
    __decorate([
        deco_1.type.string
    ], AnalyticsModel.prototype, "action", void 0);
    __decorate([
        deco_1.type.string
    ], AnalyticsModel.prototype, "title", void 0);
    __decorate([
        deco_1.type.string
    ], AnalyticsModel.prototype, "value", void 0);
    AnalyticsModel = __decorate([
        deco_1.model('/analytics')
    ], AnalyticsModel);
    return AnalyticsModel;
}(deco_1.Model));
exports.AnalyticsModel = AnalyticsModel;
