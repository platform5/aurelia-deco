"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array = exports.arrayDecorator = void 0;
var type_decorator_1 = require("./type-decorator");
var basics_1 = require("./basics");
var object_1 = require("./object");
var aurelia_logging_1 = require("aurelia-logging");
var log = aurelia_logging_1.getLogger('decorators:type:array');
exports.arrayDecorator = new type_decorator_1.TypeDecorator('array');
exports.arrayDecorator.validate = function (value, obj, options) {
    if (value === null || value === undefined)
        return true;
    if (!Array.isArray(value))
        return false;
    if (options && options.type) {
        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
            var item = value_1[_i];
            if (options.type === 'string' && !basics_1.validateString(item))
                return false;
            if (options.type === 'integer' && !basics_1.validateInteger(item))
                return false;
            if (options.type === 'float' && !basics_1.validateFloat(item))
                return false;
            if (options.type === 'boolean' && !basics_1.validateBoolean(item))
                return false;
            if (options.type === 'date' && !basics_1.validateDate(item))
                return false;
            if (options.type === 'object' && options.objectOptions && !object_1.validateObject(item, options.objectOptions))
                return false;
        }
    }
    return true;
};
exports.array = exports.arrayDecorator.decorator();
