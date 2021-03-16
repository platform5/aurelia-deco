define(["require", "exports", "aurelia-validation", "aurelia-logging", "aurelia-polyfills"], function (require, exports, aurelia_validation_1, aurelia_logging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TypeDecorator = void 0;
    var log = aurelia_logging_1.getLogger('decorators:type-decorator');
    var TypeDecorator = /** @class */ (function () {
        function TypeDecorator(name) {
            this.defaultOptions = {};
            this.customValidationRuleReady = false;
            this.name = name;
            this.fromApi = function (key, value, options, element, target) {
                return Promise.resolve(value);
            };
            this.toApi = function (key, value, options, element, target) {
                return Promise.resolve(value);
            };
            this.input = function (key, value, options, element, target) {
                return Promise.resolve(value);
            };
            this.output = function (key, value, options, element, target) {
                return Promise.resolve(value);
            };
            this.validate = function (value, obj, options) {
                return true;
            };
        }
        TypeDecorator.prototype.decorator = function () {
            var _this = this;
            if (!this.customValidationRuleReady) {
                this.createCustomValidationRule();
                this.customValidationRuleReady = true;
            }
            return function (optionsOrTarget, key, descriptor) {
                var options = {};
                if (key) {
                    // used without parameters
                    options = Object.assign(options, _this.defaultOptions);
                }
                else {
                    options = Object.assign(options, _this.defaultOptions, optionsOrTarget);
                }
                var deco = function (target, key, descriptor) {
                    if (descriptor)
                        descriptor.writable = true;
                    if (!target._types)
                        target._types = {};
                    if (!target._typesOptions)
                        target._typesOptions = {};
                    target._types[key] = _this;
                    target._typesOptions[key] = _this.optionsHook(options, target, key);
                    if (descriptor)
                        return descriptor;
                };
                if (key) {
                    return deco(optionsOrTarget, key, descriptor);
                }
                else {
                    return deco;
                }
            };
        };
        TypeDecorator.prototype.optionsHook = function (options, target, key) {
            return options;
        };
        TypeDecorator.prototype.createCustomValidationRule = function () {
            aurelia_validation_1.ValidationRules.customRule("type:" + this.name, this.validate, "The ${$propertyName} property is not valid (" + this.name + ").");
        };
        return TypeDecorator;
    }());
    exports.TypeDecorator = TypeDecorator;
});
