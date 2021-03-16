import { getLogger } from 'aurelia-logging';
var log = getLogger('decorators:form');
export function addTargetFormDecoration(target, type, key, options) {
    if (options === void 0) { options = {}; }
    if (!target._forms)
        target._forms = {};
    if (!target._forms[key])
        target._forms[key] = [];
    var form = {
        type: type,
        options: options
    };
    target._forms[key].push(form);
}
export var hint = function (hintText) {
    if (hintText === void 0) { hintText = ''; }
    return function (target, key, descriptor) {
        if (descriptor)
            descriptor.writable = true;
        addTargetFormDecoration(target, 'hint', key, { text: hintText });
        if (descriptor)
            return descriptor;
    };
};
export var label = function (labelText) {
    if (labelText === void 0) { labelText = ''; }
    return function (target, key, descriptor) {
        if (descriptor)
            descriptor.writable = true;
        addTargetFormDecoration(target, 'label', key, { text: labelText });
        if (descriptor)
            return descriptor;
    };
};
