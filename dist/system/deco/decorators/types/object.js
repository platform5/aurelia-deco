System.register(["./type-decorator", "./basics", "aurelia-logging"], function (exports_1, context_1) {
    "use strict";
    var type_decorator_1, basics_1, aurelia_logging_1, log, validateObject, toApiObject, objectDecorator, object;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (type_decorator_1_1) {
                type_decorator_1 = type_decorator_1_1;
            },
            function (basics_1_1) {
                basics_1 = basics_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            }
        ],
        execute: function () {
            log = aurelia_logging_1.getLogger('decorators:type:object');
            exports_1("validateObject", validateObject = function (value, options) {
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
                        if (keySettings.type === 'string' && !basics_1.validateString(value[key]))
                            return false;
                        if (keySettings.type === 'integer' && !basics_1.validateInteger(value[key]))
                            return false;
                        if (keySettings.type === 'float' && !basics_1.validateFloat(value[key]))
                            return false;
                        if (keySettings.type === 'boolean' && !basics_1.validateBoolean(value[key]))
                            return false;
                        if (keySettings.type === 'date' && !basics_1.validateDate(value[key]))
                            return false;
                    }
                }
                return true;
            });
            exports_1("toApiObject", toApiObject = function (value, options) {
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
            });
            exports_1("objectDecorator", objectDecorator = new type_decorator_1.TypeDecorator('object'));
            objectDecorator.toApi = function (key, value, options, element, target) {
                return Promise.resolve(toApiObject(value, options));
            };
            objectDecorator.validate = function (value, obj, options) {
                return validateObject(value, options);
            };
            exports_1("object", object = objectDecorator.decorator());
        }
    };
});
