System.register(["./type-decorator", "../model", "aurelia-logging"], function (exports_1, context_1) {
    "use strict";
    var type_decorator_1, model_1, aurelia_logging_1, log, modelDecorator, model, modelsDecorator, models;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (type_decorator_1_1) {
                type_decorator_1 = type_decorator_1_1;
            },
            function (model_1_1) {
                model_1 = model_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            }
        ],
        execute: function () {
            log = aurelia_logging_1.getLogger('decorators:type:models');
            exports_1("modelDecorator", modelDecorator = new type_decorator_1.TypeDecorator('model'));
            modelDecorator.defaultOptions = {
                model: 'not-set'
            };
            modelDecorator.optionsHook = function (options, target, key) {
                if (options && options.model === 'self')
                    options.model = target.constructor;
                return options;
            };
            modelDecorator.validate = function (value, obj, options) {
                if (options.model === 'not-set')
                    return Promise.reject(new Error('Model not set'));
                if (options.model instanceof model_1.Model)
                    return Promise.reject(new Error('options.model must be a Model instance'));
                if (value === undefined || value === null)
                    return true;
                if (value.match(/^[a-fA-F0-9]{24}$/))
                    return true;
                return false;
            };
            exports_1("model", model = modelDecorator.decorator());
            exports_1("modelsDecorator", modelsDecorator = new type_decorator_1.TypeDecorator('models'));
            modelsDecorator.defaultOptions = {
                model: 'not-set'
            };
            modelsDecorator.optionsHook = function (options, target, key) {
                if (options && options.model === 'self')
                    options.model = target.constructor;
                return options;
            };
            modelsDecorator.validate = function (value, obj, options) {
                if (options.model === 'not-set')
                    return Promise.reject(new Error('Model not set'));
                if (options.model instanceof model_1.Model)
                    return Promise.reject(new Error('options.model must be a Model instance'));
                if (value === null)
                    return false;
                if (value === undefined || value === [])
                    return true;
                if (!Array.isArray(value))
                    return false;
                for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                    var v = value_1[_i];
                    if (!v.match(/^[a-fA-F0-9]{24}$/))
                        return false;
                }
                return true;
            };
            exports_1("models", models = modelsDecorator.decorator());
        }
    };
});
