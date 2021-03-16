System.register(["./type-decorator", "aurelia-logging"], function (exports_1, context_1) {
    "use strict";
    var type_decorator_1, aurelia_logging_1, log, validateMetadata, metadataDecorator, metadata;
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
            log = aurelia_logging_1.getLogger('decorators:type:metadata');
            // TODO: convert null to undefined somewhere ??
            exports_1("validateMetadata", validateMetadata = function (value, options) {
                if (value === null)
                    return true; // this is true only because before sending the data to api it will be converted to undefined (see .toApi);
                if (value === undefined)
                    return true;
                if (!Array.isArray(value))
                    return false;
                var allowedKeys = ['key', 'value', 'type'];
                for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                    var data = value_1[_i];
                    if (typeof data !== 'object')
                        return false;
                    var keys = Object.keys(data);
                    for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
                        var key = keys_1[_a];
                        if (allowedKeys.indexOf(key) === -1)
                            return false;
                    }
                    if (data.key === undefined)
                        return false;
                    if (data.value === undefined)
                        return false;
                }
                return true;
            });
            exports_1("metadataDecorator", metadataDecorator = new type_decorator_1.TypeDecorator('metadata'));
            metadataDecorator.validate = function (value, obj, options) {
                return validateMetadata(value, options);
            };
            metadataDecorator.toApi = function (key, value, options, element, target) {
                if (value === null)
                    value = undefined;
                return Promise.resolve(value);
            };
            exports_1("metadata", metadata = metadataDecorator.decorator());
        }
    };
});
