define(["require", "exports", "./../helpers/swissdata-api", "../deco", "aurelia-framework"], function (require, exports, swissdata_api_1, deco_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.uniqueByApp = void 0;
    var uniqueByApp = function (target, key, descriptor) {
        if (descriptor)
            descriptor.writable = true;
        deco_1.validate.addTargetValidation(target, 'uniqueByApp', key);
        if (descriptor)
            return descriptor;
    };
    exports.uniqueByApp = uniqueByApp;
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
});
