import { TypeDecorator } from './type-decorator';
import { Model } from '../model';
import { getLogger } from 'aurelia-logging';
var log = getLogger('decorators:type:models');
export var modelDecorator = new TypeDecorator('model');
modelDecorator.defaultOptions = {
    model: 'not-set'
};
modelDecorator.optionsHook = function (options, target, key) {
    if (options && options.model === 'self')
        options.model = target.constructor;
    return options;
};
modelDecorator.validate = function (value, obj, options) {
    if (options.model === 'not-set')
        return Promise.reject(new Error('Model not set'));
    if (options.model instanceof Model)
        return Promise.reject(new Error('options.model must be a Model instance'));
    if (value === undefined || value === null)
        return true;
    if (value.match(/^[a-fA-F0-9]{24}$/))
        return true;
    return false;
};
export var model = modelDecorator.decorator();
export var modelsDecorator = new TypeDecorator('models');
modelsDecorator.defaultOptions = {
    model: 'not-set'
};
modelsDecorator.optionsHook = function (options, target, key) {
    if (options && options.model === 'self')
        options.model = target.constructor;
    return options;
};
modelsDecorator.validate = function (value, obj, options) {
    if (options.model === 'not-set')
        return Promise.reject(new Error('Model not set'));
    if (options.model instanceof Model)
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
export var models = modelsDecorator.decorator();
