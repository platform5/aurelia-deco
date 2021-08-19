System.register(["../deco", "aurelia-logging"], function (exports_1, context_1) {
    "use strict";
    var deco_1, aurelia_logging_1, log, inputAddress, validateAddress, addressDecorator, address, inputAddressArray, validateAddressArray, addressArrayDecorator, addressArray;
    var __moduleName = context_1 && context_1.id;
    function isSameAddress(a, b) {
        if (a === null || b === null)
            return false;
        if (a === undefined || b === undefined)
            return false;
        var same = (a.label === b.label && a.street === b.street && a.zip === b.zip && a.city === b.city && a.country === b.country && a.description === b.description);
        return same;
    }
    exports_1("isSameAddress", isSameAddress);
    return {
        setters: [
            function (deco_1_1) {
                deco_1 = deco_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            }
        ],
        execute: function () {
            log = aurelia_logging_1.getLogger('decorators:address');
            exports_1("inputAddress", inputAddress = function (value) {
                if (value === null || value === undefined) {
                    value = undefined;
                }
                return value;
            });
            exports_1("validateAddress", validateAddress = function (value, options) {
                if (value === undefined)
                    return true;
                if (typeof value !== 'object')
                    return false;
                var allowedKeys = ['label', 'street', 'city', 'zip', 'country', 'description'];
                for (var key in value) {
                    if (allowedKeys.indexOf(key) === -1)
                        return false;
                    if (typeof value !== 'string')
                        return false;
                }
                return true;
            });
            exports_1("addressDecorator", addressDecorator = new deco_1.TypeDecorator('address'));
            addressDecorator.validate = function (value, obj, options) {
                return validateAddress(value, options);
            };
            exports_1("address", address = addressDecorator.decorator());
            exports_1("inputAddressArray", inputAddressArray = function (value) {
                if (value === null || value === undefined) {
                    value = [];
                }
                return value;
            });
            exports_1("validateAddressArray", validateAddressArray = function (value, options) {
                if (!Array.isArray(value))
                    return false;
                for (var index in value) {
                    var v = value[index];
                    if (!validateAddress(v))
                        return false;
                }
                return true;
            });
            exports_1("addressArrayDecorator", addressArrayDecorator = new deco_1.TypeDecorator('addressArray'));
            addressArrayDecorator.input = function (key, value, options, element, target) {
                return Promise.resolve(inputAddressArray(value));
            };
            addressArrayDecorator.output = function (key, value, options, element, target) {
                return Promise.resolve(value);
            };
            addressArrayDecorator.validate = function (value, obj, options) {
                return validateAddressArray(value, options);
            };
            exports_1("addressArray", addressArray = addressArrayDecorator.decorator());
        }
    };
});
