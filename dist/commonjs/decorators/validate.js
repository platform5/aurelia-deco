"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueByApp = void 0;
var swissdata_api_1 = require("./../helpers/swissdata-api");
var deco_1 = require("../deco");
var aurelia_framework_1 = require("aurelia-framework");
exports.uniqueByApp = function (target, key, descriptor) {
    if (descriptor)
        descriptor.writable = true;
    deco_1.validate.addTargetValidation(target, 'uniqueByApp', key);
    if (descriptor)
        return descriptor;
};
deco_1.validate.ValidationRules.customRule("validate:uniqueByApp", function (value, obj, options) {
    if (value === null || value === undefined)
        return true;
    if (typeof value !== 'string')
        return true;
    if (value === '')
        return true;
    var swissDataApi = aurelia_framework_1.Container.instance.get(swissdata_api_1.SwissdataApi);
    return swissDataApi.get('/user/exists/' + options.key + '/' + value).then(deco_1.jsonify).then(function (result) {
        if (result && typeof result.exists === 'boolean') {
            if (options && options.instance && options.instance.id && result.id === options.instance.id)
                return true;
            return !result.exists;
        }
        throw new Error('Invalid response');
    });
}, "This ${$propertyName} already exists");
