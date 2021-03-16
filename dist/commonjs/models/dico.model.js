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
exports.DicoModel = void 0;
var deco_1 = require("../deco");
var DicoModel = /** @class */ (function (_super) {
    __extends(DicoModel, _super);
    function DicoModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tags = [];
        return _this;
    }
    __decorate([
        deco_1.type.id
    ], DicoModel.prototype, "id", void 0);
    __decorate([
        deco_1.type.string,
        deco_1.validate.required,
        deco_1.form.label('admin.dico.Key to translate'),
        deco_1.form.hint('admin.dico.Avoid points')
    ], DicoModel.prototype, "key", void 0);
    __decorate([
        deco_1.type.string({ textarea: true, multilang: true }),
        deco_1.validate.required,
        deco_1.form.label('admin.dico.Translation')
    ], DicoModel.prototype, "value", void 0);
    __decorate([
        deco_1.type.array({ type: 'string' })
    ], DicoModel.prototype, "tags", void 0);
    DicoModel = __decorate([
        deco_1.model('/dico')
    ], DicoModel);
    return DicoModel;
}(deco_1.Model));
exports.DicoModel = DicoModel;
