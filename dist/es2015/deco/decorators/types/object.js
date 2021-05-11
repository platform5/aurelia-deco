import { TypeDecorator } from './type-decorator';
import { validateString, validateInteger, validateFloat, validateBoolean, validateDate } from './basics';
import { getLogger } from 'aurelia-logging';
var log = getLogger('decorators:type:object');
export var validateObject = function (value, options) {
    if (value === null || value === undefined)
        return true;
    if (typeof value !== 'object')
        return false;
    if (options && options.keys) {
        var allowOtherKeys = (options.allowOtherKeys === true);
        // validate required fields
        for (var _i = 0, _a = Object.keys(options.keys); _i < _a.length; _i++) {
            var key = _a[_i];
            var keySettings = options.keys[key];
            if (keySettings.required === true && !value[key])
                return false;
        }
        for (var _b = 0, _c = Object.keys(value); _b < _c.length; _b++) {
            var key = _c[_b];
            var keySettings = options.keys[key];
            if (!keySettings && !allowOtherKeys)
                return false;
            if (!keySettings)
                continue;
            if (keySettings.type === 'string' && !validateString(value[key]))
                return false;
            if (keySettings.type === 'integer' && !validateInteger(value[key]))
                return false;
            if (keySettings.type === 'float' && !validateFloat(value[key]))
                return false;
            if (keySettings.type === 'boolean' && !validateBoolean(value[key]))
                return false;
            if (keySettings.type === 'date' && !validateDate(value[key]))
                return false;
        }
    }
    return true;
};
export var toApiObject = function (value, options) {
    var allowOtherKeys = (options.allowOtherKeys === true);
    if (!allowOtherKeys) {
        var newValue = {};
        for (var _i = 0, _a = Object.keys(options.keys); _i < _a.length; _i++) {
            var key = _a[_i];
            newValue[key] = value[key];
        }
        value = newValue;
    }
    return value;
};
export var objectDecorator = new TypeDecorator('object');
objectDecorator.toApi = function (key, value, options, element, target) {
    return Promise.resolve(toApiObject(value, options));
};
objectDecorator.validate = function (value, obj, options) {
    return validateObject(value, options);
};
export var object = objectDecorator.decorator();
