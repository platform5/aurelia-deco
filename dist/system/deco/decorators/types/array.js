System.register(["./type-decorator", "./basics", "./object", "aurelia-logging"], function (exports_1, context_1) {
    "use strict";
    var type_decorator_1, basics_1, object_1, aurelia_logging_1, log, arrayDecorator, array;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (type_decorator_1_1) {
                type_decorator_1 = type_decorator_1_1;
            },
            function (basics_1_1) {
                basics_1 = basics_1_1;
            },
            function (object_1_1) {
                object_1 = object_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            }
        ],
        execute: function () {
            log = aurelia_logging_1.getLogger('decorators:type:array');
            exports_1("arrayDecorator", arrayDecorator = new type_decorator_1.TypeDecorator('array'));
            arrayDecorator.validate = function (value, obj, options) {
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
            exports_1("array", array = arrayDecorator.decorator());
        }
    };
});
