import { TypeDecorator } from './type-decorator';
import { getLogger } from 'aurelia-logging';
var log = getLogger('decorators:type:files');
export var fileDecorator = new TypeDecorator('file');
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
export var file = fileDecorator.decorator();
export var filesDecorator = new TypeDecorator('files');
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
export var files = filesDecorator.decorator();
