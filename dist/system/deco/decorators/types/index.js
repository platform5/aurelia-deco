System.register(["./type-decorator", "./basics", "./array", "./object", "./models", "./files", "./metadata"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (type_decorator_1_1) {
                exportStar_1(type_decorator_1_1);
            },
            function (basics_1_1) {
                exportStar_1(basics_1_1);
            },
            function (array_1_1) {
                exportStar_1(array_1_1);
            },
            function (object_1_1) {
                exportStar_1(object_1_1);
            },
            function (models_1_1) {
                exportStar_1(models_1_1);
            },
            function (files_1_1) {
                exportStar_1(files_1_1);
            },
            function (metadata_1_1) {
                exportStar_1(metadata_1_1);
            }
        ],
        execute: function () {
        }
    };
});
