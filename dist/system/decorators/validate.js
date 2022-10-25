System.register(["./../helpers/swissdata-api", "../deco", "aurelia-framework"], function (exports_1, context_1) {
    "use strict";
    var swissdata_api_1, deco_1, aurelia_framework_1, uniqueByApp;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (swissdata_api_1_1) {
                swissdata_api_1 = swissdata_api_1_1;
            },
            function (deco_1_1) {
                deco_1 = deco_1_1;
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            exports_1("uniqueByApp", uniqueByApp = function (target, key, descriptor) {
                if (descriptor)
                    descriptor.writable = true;
                deco_1.validate.addTargetValidation(target, 'uniqueByApp', key);
                if (descriptor)
                    return descriptor;
            });
            deco_1.validate.ValidationRules.customRule("validate:uniqueByApp", function (value, obj, options) {
                if (value === null || value === undefined)
                    return true;
                if (typeof value !== 'string')
                    return true;
                if (value === '')
                    return true;
                var swissDataApi = aurelia_framework_1.Container.instance.get(swissdata_api_1.SwissdataApi);
                return swissDataApi.get('/user/exists/' + options.key + '/' + value).then(deco_1.jsonify).then(function (result) {
                    if (result && typeof result.exists === 'boolean') {
                        if (options && options.instance && options.instance.id && result.id === options.instance.id)
                            return true;
                        return !result.exists;
                    }
                    throw new Error('Invalid response');
                });
            }, "This ${$propertyName} already exists");
        }
    };
});
