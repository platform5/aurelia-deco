import { TypeDecorator } from './type-decorator';
import * as moment from 'moment';
import { getLogger } from 'aurelia-logging';
import { DateHelper } from 'aurelia-resources';
var log = getLogger('decorators:type:basics');
export var anyDecorator = new TypeDecorator('any');
export var any = anyDecorator.decorator();
export var idDecorator = new TypeDecorator('id');
export var id = idDecorator.decorator();
export var validateString = function (value, options) {
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
export var stringDecorator = new TypeDecorator('string');
stringDecorator.defaultOptions = {
    multilang: false,
    locales: []
};
stringDecorator.validate = function (value, obj, options) {
    return validateString(value, options);
};
export var string = stringDecorator.decorator();
export var selectDecorator = new TypeDecorator('select');
selectDecorator.defaultOptions = {
    options: []
};
selectDecorator.validate = function (value, obj, options) {
    if (value === undefined || value === null)
        return true;
    if (!options.multiple) {
        // validate non-multiple values
        if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean')
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
export var select = selectDecorator.decorator();
export var validateInteger = function (value) { return value === null || value === undefined || (typeof value === 'number' && Math.round(value) === value); };
export var integerDecorator = new TypeDecorator('integer');
integerDecorator.validate = function (value, obj, options) {
    return validateInteger(value);
};
export var integer = integerDecorator.decorator();
export var validateBoolean = function (value) { return value === null || value === undefined || typeof value === 'boolean'; };
export var booleanDecorator = new TypeDecorator('boolean');
booleanDecorator.validate = function (value, obj, options) {
    return validateBoolean(value);
};
export var boolean = booleanDecorator.decorator();
export var fromApiDate = function (value, dateFormat) {
    if (dateFormat === void 0) { dateFormat = 'DD-MM-YYYY'; }
    if (typeof value === 'string') {
        var m = DateHelper.moment(value, dateFormat);
        if (m && m.isValid()) {
            value = m.toDate();
        }
    }
    return value;
};
export var toApiDate = function (value, dateFormat) {
    if (dateFormat === void 0) { dateFormat = 'DD-MM-YYYY'; }
    if (value instanceof Date) {
        value = moment(value).format(dateFormat);
    }
    return value;
};
export var validateDate = function (value) { return value === null || value === undefined || value instanceof Date; };
export var dateDecorator = new TypeDecorator('date');
dateDecorator.defaultOptions = {
    dateFormat: 'DD-MM-YYYY'
};
dateDecorator.fromApi = function (key, value, options, element, target) {
    var dateFormat = options.dateFormat || 'DD-MM-YYYY';
    return Promise.resolve(fromApiDate(value, dateFormat));
};
dateDecorator.toApi = function (key, value, options, element, target) {
    var dateFormat = options.dateFormat || 'DD-MM-YYYY';
    return Promise.resolve(toApiDate(value, dateFormat));
};
dateDecorator.validate = function (value, obj, options) {
    return validateDate(value);
};
export var date = dateDecorator.decorator();
export var validateFloat = function (value) { return value === null || value === undefined || (typeof value === 'number'); };
export var floatDecorator = new TypeDecorator('float');
floatDecorator.validate = function (value, obj, options) {
    return validateFloat(value);
};
export var float = floatDecorator.decorator();
