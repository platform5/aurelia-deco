define(["require", "exports", "aurelia-logging"], function (require, exports, aurelia_logging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.label = exports.hint = exports.addTargetFormDecoration = void 0;
    var log = aurelia_logging_1.getLogger('decorators:form');
    function addTargetFormDecoration(target, type, key, options) {
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
    exports.addTargetFormDecoration = addTargetFormDecoration;
    exports.hint = function (hintText) {
        if (hintText === void 0) { hintText = ''; }
        return function (target, key, descriptor) {
            if (descriptor)
                descriptor.writable = true;
            addTargetFormDecoration(target, 'hint', key, { text: hintText });
            if (descriptor)
                return descriptor;
        };
    };
    exports.label = function (labelText) {
        if (labelText === void 0) { labelText = ''; }
        return function (target, key, descriptor) {
            if (descriptor)
                descriptor.writable = true;
            addTargetFormDecoration(target, 'label', key, { text: labelText });
            if (descriptor)
                return descriptor;
        };
    };
});
