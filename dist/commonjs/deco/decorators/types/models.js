"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = exports.modelsDecorator = exports.model = exports.modelDecorator = void 0;
var type_decorator_1 = require("./type-decorator");
var model_1 = require("../model");
var aurelia_logging_1 = require("aurelia-logging");
var log = aurelia_logging_1.getLogger('decorators:type:models');
exports.modelDecorator = new type_decorator_1.TypeDecorator('model');
exports.modelDecorator.defaultOptions = {
    model: 'not-set'
};
exports.modelDecorator.optionsHook = function (options, target, key) {
    if (options && options.model === 'self')
        options.model = target.constructor;
    return options;
};
exports.modelDecorator.validate = function (value, obj, options) {
    if (options.model === 'not-set')
        return Promise.reject(new Error('Model not set'));
    if (options.model instanceof model_1.Model)
        return Promise.reject(new Error('options.model must be a Model instance'));
    if (value === undefined || value === null)
        return true;
    if (value.match(/^[a-fA-F0-9]{24}$/))
        return true;
    return false;
};
exports.model = exports.modelDecorator.decorator();
exports.modelsDecorator = new type_decorator_1.TypeDecorator('models');
exports.modelsDecorator.defaultOptions = {
    model: 'not-set'
};
exports.modelsDecorator.optionsHook = function (options, target, key) {
    if (options && options.model === 'self')
        options.model = target.constructor;
    return options;
};
exports.modelsDecorator.validate = function (value, obj, options) {
    if (options.model === 'not-set')
        return Promise.reject(new Error('Model not set'));
    if (options.model instanceof model_1.Model)
        return Promise.reject(new Error('options.model must be a Model instance'));
    if (value === null)
        return false;
    if (value === undefined || value === [])
        return true;
    if (!Array.isArray(value))
        return false;
    for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
        var v = value_1[_i];
        if (!v.match(/^[a-fA-F0-9]{24}$/))
            return false;
    }
    return true;
};
exports.models = exports.modelsDecorator.decorator();
