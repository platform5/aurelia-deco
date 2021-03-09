System.register(["./type-decorator", "moment", "aurelia-logging"], function (exports_1, context_1) {
    "use strict";
    var type_decorator_1, moment, aurelia_logging_1, log, anyDecorator, any, idDecorator, id, validateString, stringDecorator, string, selectDecorator, select, validateInteger, integerDecorator, integer, validateBoolean, booleanDecorator, boolean, fromApiDate, toApiDate, validateDate, dateDecorator, date, validateFloat, floatDecorator, float;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (type_decorator_1_1) {
                type_decorator_1 = type_decorator_1_1;
            },
            function (moment_1) {
                moment = moment_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            }
        ],
        execute: function () {
            log = aurelia_logging_1.getLogger('decorators:type:basics');
            exports_1("anyDecorator", anyDecorator = new type_decorator_1.TypeDecorator('any'));
            exports_1("any", any = anyDecorator.decorator());
            exports_1("idDecorator", idDecorator = new type_decorator_1.TypeDecorator('id'));
            exports_1("id", id = idDecorator.decorator());
            exports_1("validateString", validateString = function (value, options) {
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
            });
            exports_1("stringDecorator", stringDecorator = new type_decorator_1.TypeDecorator('string'));
            stringDecorator.defaultOptions = {
                multilang: false,
                locales: []
            };
            stringDecorator.validate = function (value, obj, options) {
                return validateString(value, options);
            };
            exports_1("string", string = stringDecorator.decorator());
            exports_1("selectDecorator", selectDecorator = new type_decorator_1.TypeDecorator('select'));
            selectDecorator.defaultOptions = {
                options: []
            };
            selectDecorator.validate = function (value, obj, options) {
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
            exports_1("select", select = selectDecorator.decorator());
            exports_1("validateInteger", validateInteger = function (value) { return value === null || value === undefined || (typeof value === 'number' && Math.round(value) === value); });
            exports_1("integerDecorator", integerDecorator = new type_decorator_1.TypeDecorator('integer'));
            integerDecorator.validate = function (value, obj, options) {
                return validateInteger(value);
            };
            exports_1("integer", integer = integerDecorator.decorator());
            exports_1("validateBoolean", validateBoolean = function (value) { return value === null || value === undefined || typeof value === 'boolean'; });
            exports_1("booleanDecorator", booleanDecorator = new type_decorator_1.TypeDecorator('boolean'));
            booleanDecorator.validate = function (value, obj, options) {
                return validateBoolean(value);
            };
            exports_1("boolean", boolean = booleanDecorator.decorator());
            exports_1("fromApiDate", fromApiDate = function (value, dateFormat) {
                if (dateFormat === void 0) { dateFormat = 'DD-MM-YYYY'; }
                if (typeof value === 'string') {
                    value = moment(value, dateFormat).toDate();
                }
                return value;
            });
            exports_1("toApiDate", toApiDate = function (value, dateFormat) {
                if (dateFormat === void 0) { dateFormat = 'DD-MM-YYYY'; }
                if (value instanceof Date) {
                    value = moment(value).format(dateFormat);
                }
                return value;
            });
            exports_1("validateDate", validateDate = function (value) { return value === null || value === undefined || value instanceof Date; });
            exports_1("dateDecorator", dateDecorator = new type_decorator_1.TypeDecorator('date'));
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
            exports_1("date", date = dateDecorator.decorator());
            exports_1("validateFloat", validateFloat = function (value) { return value === null || value === undefined || (typeof value === 'number'); });
            exports_1("floatDecorator", floatDecorator = new type_decorator_1.TypeDecorator('float'));
            floatDecorator.validate = function (value, obj, options) {
                return validateFloat(value);
            };
            exports_1("float", float = floatDecorator.decorator());
        }
    };
});
