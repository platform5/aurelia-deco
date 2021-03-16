"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameAddress = exports.addressArray = exports.addressArrayDecorator = exports.validateAddressArray = exports.inputAddressArray = exports.address = exports.addressDecorator = exports.validateAddress = exports.inputAddress = void 0;
var deco_1 = require("../deco");
var aurelia_logging_1 = require("aurelia-logging");
var log = aurelia_logging_1.getLogger('decorators:address');
var inputAddress = function (value) {
    if (value === null || value === undefined) {
        value = undefined;
    }
    return value;
};
exports.inputAddress = inputAddress;
var validateAddress = function (value, options) {
    if (value === undefined)
        return true;
    if (typeof value !== 'object')
        return false;
    var allowedKeys = ['label', 'street', 'city', 'zip', 'country'];
    for (var key in value) {
        if (allowedKeys.indexOf(key) === -1)
            return false;
        if (typeof value !== 'string')
            return false;
    }
    return true;
};
exports.validateAddress = validateAddress;
exports.addressDecorator = new deco_1.TypeDecorator('address');
exports.addressDecorator.validate = function (value, obj, options) {
    return exports.validateAddress(value, options);
};
exports.address = exports.addressDecorator.decorator();
var inputAddressArray = function (value) {
    if (value === null || value === undefined) {
        value = [];
    }
    return value;
};
exports.inputAddressArray = inputAddressArray;
var validateAddressArray = function (value, options) {
    if (!Array.isArray(value))
        return false;
    for (var index in value) {
        var v = value[index];
        if (!exports.validateAddress(v))
            return false;
    }
    return true;
};
exports.validateAddressArray = validateAddressArray;
exports.addressArrayDecorator = new deco_1.TypeDecorator('addressArray');
exports.addressArrayDecorator.input = function (key, value, options, element, target) {
    return Promise.resolve(exports.inputAddressArray(value));
};
exports.addressArrayDecorator.output = function (key, value, options, element, target) {
    return Promise.resolve(value);
};
exports.addressArrayDecorator.validate = function (value, obj, options) {
    return exports.validateAddressArray(value, options);
};
exports.addressArray = exports.addressArrayDecorator.decorator();
function isSameAddress(a, b) {
    if (a === null || b === null)
        return false;
    if (a === undefined || b === undefined)
        return false;
    var same = (a.label === b.label && a.street === b.street && a.zip === b.zip && a.city === b.city && a.country === b.country);
    return same;
}
exports.isSameAddress = isSameAddress;
