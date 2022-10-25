var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
define(["require", "exports", "./model", "./types", "./types/index", "./validate", "./form", "./io"], function (require, exports, model_1, types_1, types, validates, forms, io) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.io = exports.form = exports.validate = exports.type = exports.TypeDecorator = void 0;
    __exportStar(model_1, exports);
    Object.defineProperty(exports, "TypeDecorator", { enumerable: true, get: function () { return types_1.TypeDecorator; } });
    exports.type = types;
    exports.validate = validates;
    exports.form = forms;
    exports.io = io;
});
