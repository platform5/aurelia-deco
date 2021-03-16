import { TypeDecorator } from './type-decorator';
import { getLogger } from 'aurelia-logging';
var log = getLogger('decorators:type:metadata');
// TODO: convert null to undefined somewhere ??
export var validateMetadata = function (value, options) {
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
};
export var metadataDecorator = new TypeDecorator('metadata');
metadataDecorator.validate = function (value, obj, options) {
    return validateMetadata(value, options);
};
metadataDecorator.toApi = function (key, value, options, element, target) {
    if (value === null)
        value = undefined;
    return Promise.resolve(value);
};
export var metadata = metadataDecorator.decorator();
