System.register(["./type-decorator", "aurelia-logging"], function (exports_1, context_1) {
    "use strict";
    var type_decorator_1, aurelia_logging_1, log, fileDecorator, file, filesDecorator, files;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (type_decorator_1_1) {
                type_decorator_1 = type_decorator_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            }
        ],
        execute: function () {
            log = aurelia_logging_1.getLogger('decorators:type:files');
            exports_1("fileDecorator", fileDecorator = new type_decorator_1.TypeDecorator('file'));
            fileDecorator.defaultOptions = {
                accepted: ['image/*', 'application/pdf'],
                destination: 'uploads/'
            };
            fileDecorator.validate = function (value, obj, options) {
                if (value === undefined || value === null)
                    return true;
                if (!value.name || !value.type || !value.size)
                    return false;
                return true;
            };
            exports_1("file", file = fileDecorator.decorator());
            exports_1("filesDecorator", filesDecorator = new type_decorator_1.TypeDecorator('files'));
            filesDecorator.defaultOptions = {
                accepted: ['image/*', 'application/pdf'],
                destination: 'uploads-files/',
                maxCount: 12
            };
            filesDecorator.validate = function (value, obj, options) {
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
            exports_1("files", files = filesDecorator.decorator());
        }
    };
});
