import { TypeDecorator } from './type-decorator';
import { validateString, validateInteger, validateFloat, validateBoolean, validateDate } from './basics';
import { validateObject } from './object';
import { getLogger } from 'aurelia-logging';
var log = getLogger('decorators:type:array');
export var arrayDecorator = new TypeDecorator('array');
arrayDecorator.validate = function (value, obj, options) {
    if (value === null || value === undefined)
        return true;
    if (!Array.isArray(value))
        return false;
    if (options && options.type) {
        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
            var item = value_1[_i];
            if (options.type === 'string' && !validateString(item))
                return false;
            if (options.type === 'integer' && !validateInteger(item))
                return false;
            if (options.type === 'float' && !validateFloat(item))
                return false;
            if (options.type === 'boolean' && !validateBoolean(item))
                return false;
            if (options.type === 'date' && !validateDate(item))
                return false;
            if (options.type === 'object' && options.objectOptions && !validateObject(item, options.objectOptions))
                return false;
        }
    }
    return true;
};
export var array = arrayDecorator.decorator();
