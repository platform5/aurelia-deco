import { ValidationRules } from 'aurelia-validation';
import { getLogger } from 'aurelia-logging';
var log = getLogger('decorators:validate');
export { ValidationRules };
export function addTargetValidation(target, type, key, options) {
    if (options === void 0) { options = {}; }
    if (!target._validations)
        target._validations = {};
    if (!target._validations[key])
        target._validations[key] = [];
    var validation = {
        type: type,
        options: options
    };
    target._validations[key].push(validation);
}
export var required = function (target, key, descriptor) {
    if (descriptor)
        descriptor.writable = true;
    addTargetValidation(target, 'required', key);
    if (descriptor)
        return descriptor;
};
export var minLength = function (minLength) {
    if (minLength === void 0) { minLength = 0; }
    return function (target, key, descriptor) {
        if (descriptor)
            descriptor.writable = true;
        addTargetValidation(target, 'minLength', key, { minLength: minLength });
        if (descriptor)
            return descriptor;
    };
};
export var maxLength = function (maxLength) {
    if (maxLength === void 0) { maxLength = 0; }
    return function (target, key, descriptor) {
        if (descriptor)
            descriptor.writable = true;
        addTargetValidation(target, 'maxLength', key, { maxLength: maxLength });
        if (descriptor)
            return descriptor;
    };
};
export var email = function (target, key, descriptor) {
    if (descriptor)
        descriptor.writable = true;
    addTargetValidation(target, 'email', key);
    if (descriptor)
        return descriptor;
};
export var internationalPhoneNumber = function (acceptedCountryList) {
    if (acceptedCountryList === void 0) { acceptedCountryList = []; }
    return function (target, key, descriptor) {
        if (descriptor)
            descriptor.writable = true;
        addTargetValidation(target, 'internationalPhoneNumber', key, { acceptedCountryList: acceptedCountryList });
        if (descriptor)
            return descriptor;
    };
};
export var slug = function (target, key, descriptor) {
    if (descriptor)
        descriptor.writable = true;
    addTargetValidation(target, 'slug', key);
    if (descriptor)
        return descriptor;
};
ValidationRules.customRule("validate:internationalPhoneNumber", function (value, obj, options) {
    var validatedPhoneNumber = validatePhoneNumber(value);
    if (validatedPhoneNumber === false)
        return false;
    return true;
}, "${$propertyName} is not a valid phone number.");
var validatePhoneNumber = function (phoneNumber) {
    if (typeof phoneNumber !== 'string')
        return false;
    if (phoneNumber[0] !== '+')
        return false;
    phoneNumber = phoneNumber.substr(1); // remove the original +
    // remove all non-numeric chars
    phoneNumber = phoneNumber.replace(/([^0-9]*)/g, "");
    if (phoneNumber.substr(0, 2) === '41') {
        // swiss phone number
        var part1 = phoneNumber.substr(0, 2);
        var part2 = phoneNumber.substr(2);
        if (part2[0] === '0') {
            part2 = part2.substr(1); // remove the first 0 if present
        }
        if (part2.length === 9) {
            return "+" + part1 + part2;
        }
    }
    return false;
};
