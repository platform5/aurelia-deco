import { SwissdataApi } from './../helpers/swissdata-api';
import { validate, jsonify } from '../deco';
import { Container } from 'aurelia-framework';
export var uniqueByApp = function (target, key, descriptor) {
    if (descriptor)
        descriptor.writable = true;
    validate.addTargetValidation(target, 'uniqueByApp', key);
    if (descriptor)
        return descriptor;
};
validate.ValidationRules.customRule("validate:uniqueByApp", function (value, obj, options) {
    if (value === null || value === undefined)
        return true;
    if (typeof value !== 'string')
        return true;
    if (value === '')
        return true;
    var swissDataApi = Container.instance.get(SwissdataApi);
    return swissDataApi.get('/user/exists/' + options.key + '/' + value).then(jsonify).then(function (result) {
        if (result && typeof result.exists === 'boolean') {
            if (options && options.instance && options.instance.id && result.id === options.instance.id)
                return true;
            return !result.exists;
        }
        throw new Error('Invalid response');
    });
}, "This ${$propertyName} already exists");
