define(["require", "exports", "./type-decorator", "./basics", "aurelia-logging"], function (require, exports, type_decorator_1, basics_1, aurelia_logging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.object = exports.objectDecorator = exports.toApiObject = exports.validateObject = void 0;
    var log = aurelia_logging_1.getLogger('decorators:type:object');
    var validateObject = function (value, options) {
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
    };
    exports.validateObject = validateObject;
    var toApiObject = function (value, options) {
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
    exports.toApiObject = toApiObject;
    exports.objectDecorator = new type_decorator_1.TypeDecorator('object');
    exports.objectDecorator.toApi = function (key, value, options, element, target) {
        return Promise.resolve(exports.toApiObject(value, options));
    };
    exports.objectDecorator.validate = function (value, obj, options) {
        return exports.validateObject(value, options);
    };
    exports.object = exports.objectDecorator.decorator();
});
