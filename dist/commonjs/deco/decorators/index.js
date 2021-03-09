"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.form = exports.validate = exports.type = exports.TypeDecorator = void 0;
__exportStar(require("./model"), exports);
var types_1 = require("./types");
Object.defineProperty(exports, "TypeDecorator", { enumerable: true, get: function () { return types_1.TypeDecorator; } });
var types = require("./types/index");
exports.type = types;
var validates = require("./validate");
exports.validate = validates;
var forms = require("./form");
exports.form = forms;
var io = require("./io");
exports.io = io;
