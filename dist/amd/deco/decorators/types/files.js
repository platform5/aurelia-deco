define(["require", "exports", "./type-decorator", "aurelia-logging"], function (require, exports, type_decorator_1, aurelia_logging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.files = exports.filesDecorator = exports.file = exports.fileDecorator = void 0;
    var log = aurelia_logging_1.getLogger('decorators:type:files');
    exports.fileDecorator = new type_decorator_1.TypeDecorator('file');
    exports.fileDecorator.defaultOptions = {
        accepted: ['image/*', 'application/pdf'],
        destination: 'uploads/'
    };
    exports.fileDecorator.validate = function (value, obj, options) {
        if (value === undefined || value === null)
            return true;
        if (!value.name || !value.type || !value.size)
            return false;
        return true;
    };
    exports.file = exports.fileDecorator.decorator();
    exports.filesDecorator = new type_decorator_1.TypeDecorator('files');
    exports.filesDecorator.defaultOptions = {
        accepted: ['image/*', 'application/pdf'],
        destination: 'uploads-files/',
        maxCount: 12
    };
    exports.filesDecorator.validate = function (value, obj, options) {
        if (value === null)
            value = [];
        if (value === undefined || value === [])
            return true;
        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
            var file_1 = value_1[_i];
            if (!file_1.name || !file_1.type || !file_1.size)
                return false;
        }
        return true;
    };
    exports.files = exports.filesDecorator.decorator();
});
