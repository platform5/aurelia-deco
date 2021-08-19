import { TypeDecorator } from '../deco';
import { getLogger } from 'aurelia-logging';
var log = getLogger('decorators:address');
export var inputAddress = function (value) {
    if (value === null || value === undefined) {
        value = undefined;
    }
    return value;
};
export var validateAddress = function (value, options) {
    if (value === undefined)
        return true;
    if (typeof value !== 'object')
        return false;
    var allowedKeys = ['label', 'street', 'city', 'zip', 'country', 'description'];
    for (var key in value) {
        if (allowedKeys.indexOf(key) === -1)
            return false;
        if (typeof value !== 'string')
            return false;
    }
    return true;
};
export var addressDecorator = new TypeDecorator('address');
addressDecorator.validate = function (value, obj, options) {
    return validateAddress(value, options);
};
export var address = addressDecorator.decorator();
export var inputAddressArray = function (value) {
    if (value === null || value === undefined) {
        value = [];
    }
    return value;
};
export var validateAddressArray = function (value, options) {
    if (!Array.isArray(value))
        return false;
    for (var index in value) {
        var v = value[index];
        if (!validateAddress(v))
            return false;
    }
    return true;
};
export var addressArrayDecorator = new TypeDecorator('addressArray');
addressArrayDecorator.input = function (key, value, options, element, target) {
    return Promise.resolve(inputAddressArray(value));
};
addressArrayDecorator.output = function (key, value, options, element, target) {
    return Promise.resolve(value);
};
addressArrayDecorator.validate = function (value, obj, options) {
    return validateAddressArray(value, options);
};
export var addressArray = addressArrayDecorator.decorator();
export function isSameAddress(a, b) {
    if (a === null || b === null)
        return false;
    if (a === undefined || b === undefined)
        return false;
    var same = (a.label === b.label && a.street === b.street && a.zip === b.zip && a.city === b.city && a.country === b.country && a.description === b.description);
    return same;
}
