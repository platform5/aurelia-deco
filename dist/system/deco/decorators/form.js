System.register(["aurelia-logging"], function (exports_1, context_1) {
    "use strict";
    var aurelia_logging_1, log, hint, label;
    var __moduleName = context_1 && context_1.id;
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
    exports_1("addTargetFormDecoration", addTargetFormDecoration);
    return {
        setters: [
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            }
        ],
        execute: function () {
            log = aurelia_logging_1.getLogger('decorators:form');
            exports_1("hint", hint = function (hintText) {
                if (hintText === void 0) { hintText = ''; }
                return function (target, key, descriptor) {
                    if (descriptor)
                        descriptor.writable = true;
                    addTargetFormDecoration(target, 'hint', key, { text: hintText });
                    if (descriptor)
                        return descriptor;
                };
            });
            exports_1("label", label = function (labelText) {
                if (labelText === void 0) { labelText = ''; }
                return function (target, key, descriptor) {
                    if (descriptor)
                        descriptor.writable = true;
                    addTargetFormDecoration(target, 'label', key, { text: labelText });
                    if (descriptor)
                        return descriptor;
                };
            });
        }
    };
});
