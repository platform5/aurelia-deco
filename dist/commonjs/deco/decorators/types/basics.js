"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.float = exports.floatDecorator = exports.validateFloat = exports.date = exports.dateDecorator = exports.validateDate = exports.toApiDate = exports.fromApiDate = exports.boolean = exports.booleanDecorator = exports.validateBoolean = exports.integer = exports.integerDecorator = exports.validateInteger = exports.select = exports.selectDecorator = exports.string = exports.stringDecorator = exports.validateString = exports.id = exports.idDecorator = exports.any = exports.anyDecorator = void 0;
var type_decorator_1 = require("./type-decorator");
var moment = require("moment");
var aurelia_logging_1 = require("aurelia-logging");
var log = aurelia_logging_1.getLogger('decorators:type:basics');
exports.anyDecorator = new type_decorator_1.TypeDecorator('any');
exports.any = exports.anyDecorator.decorator();
exports.idDecorator = new type_decorator_1.TypeDecorator('id');
exports.id = exports.idDecorator.decorator();
exports.validateString = function (value, options) {
    if (value === null || value === undefined)
        return true;
    // if value is string we accept its value for multilang or not
    if (typeof value === 'string')
        return true;
    // if not multilang (and not string) then it's wrong !
    if (!options.multilang)
        return false;
    // here we validate multilang strings with object values
    if (typeof value !== 'object')
        return false;
    for (var key in value) {
        if (options.locales.indexOf(key) === -1)
            return false;
    }
    return true;
};
exports.stringDecorator = new type_decorator_1.TypeDecorator('string');
exports.stringDecorator.defaultOptions = {
    multilang: false,
    locales: []
};
exports.stringDecorator.validate = function (value, obj, options) {
    return exports.validateString(value, options);
};
exports.string = exports.stringDecorator.decorator();
exports.selectDecorator = new type_decorator_1.TypeDecorator('select');
exports.selectDecorator.defaultOptions = {
    options: []
};
exports.selectDecorator.validate = function (value, obj, options) {
    if (value === undefined || value === null)
        return true;
    if (!options.multiple) {
        // validate non-multiple values
        if (typeof value !== 'string')
            return false;
        if (options.allowAny)
            return true;
        if (options.options.indexOf(value) === -1)
            return false;
    }
    else if (options.multiple) {
        // validate multiple values
        if (!Array.isArray(value))
            return false;
        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
            var v = value_1[_i];
            if (typeof v !== 'string')
                return false;
            if (!options.allowAny && options.options.indexOf(v) === -1)
                return false;
        }
    }
    return true;
};
exports.select = exports.selectDecorator.decorator();
exports.validateInteger = function (value) { return value === null || value === undefined || (typeof value === 'number' && Math.round(value) === value); };
exports.integerDecorator = new type_decorator_1.TypeDecorator('integer');
exports.integerDecorator.validate = function (value, obj, options) {
    return exports.validateInteger(value);
};
exports.integer = exports.integerDecorator.decorator();
exports.validateBoolean = function (value) { return value === null || value === undefined || typeof value === 'boolean'; };
exports.booleanDecorator = new type_decorator_1.TypeDecorator('boolean');
exports.booleanDecorator.validate = function (value, obj, options) {
    return exports.validateBoolean(value);
};
exports.boolean = exports.booleanDecorator.decorator();
exports.fromApiDate = function (value, dateFormat) {
    if (dateFormat === void 0) { dateFormat = 'DD-MM-YYYY'; }
    if (typeof value === 'string') {
        value = moment(value, dateFormat).toDate();
    }
    return value;
};
exports.toApiDate = function (value, dateFormat) {
    if (dateFormat === void 0) { dateFormat = 'DD-MM-YYYY'; }
    if (value instanceof Date) {
        value = moment(value).format(dateFormat);
    }
    return value;
};
exports.validateDate = function (value) { return value === null || value === undefined || value instanceof Date; };
exports.dateDecorator = new type_decorator_1.TypeDecorator('date');
exports.dateDecorator.defaultOptions = {
    dateFormat: 'DD-MM-YYYY'
};
exports.dateDecorator.fromApi = function (key, value, options, element, target) {
    var dateFormat = options.dateFormat || 'DD-MM-YYYY';
    return Promise.resolve(exports.fromApiDate(value, dateFormat));
};
exports.dateDecorator.toApi = function (key, value, options, element, target) {
    var dateFormat = options.dateFormat || 'DD-MM-YYYY';
    return Promise.resolve(exports.toApiDate(value, dateFormat));
};
exports.dateDecorator.validate = function (value, obj, options) {
    return exports.validateDate(value);
};
exports.date = exports.dateDecorator.decorator();
exports.validateFloat = function (value) { return value === null || value === undefined || (typeof value === 'number'); };
exports.floatDecorator = new type_decorator_1.TypeDecorator('float');
exports.floatDecorator.validate = function (value, obj, options) {
    return exports.validateFloat(value);
};
exports.float = exports.floatDecorator.decorator();
