System.register([], function (exports_1, context_1) {
    "use strict";
    var fromApiOnly;
    var __moduleName = context_1 && context_1.id;
    function addTargetInfo(target, infoName, key) {
        if (!target["_" + infoName])
            target["_" + infoName] = [];
        target["_" + infoName].push(key);
    }
    return {
        setters: [],
        execute: function () {
            exports_1("fromApiOnly", fromApiOnly = function (target, key, descriptor) {
                if (descriptor)
                    descriptor.writable = true;
                addTargetInfo(target, 'fromApiOnly', key);
                if (descriptor)
                    return descriptor;
            });
        }
    };
});
