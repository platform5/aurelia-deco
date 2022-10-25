System.register(["./model", "./types", "./types/index", "./validate", "./form", "./io"], function (exports_1, context_1) {
    "use strict";
    var types_1, types, validates, forms, io;
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        "TypeDecorator": true,
        "type": true,
        "validate": true,
        "form": true,
        "io": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (model_1_1) {
                exportStar_1(model_1_1);
            },
            function (types_1_1) {
                types_1 = types_1_1;
            },
            function (types_2) {
                types = types_2;
            },
            function (validates_1) {
                validates = validates_1;
            },
            function (forms_1) {
                forms = forms_1;
            },
            function (io_1) {
                io = io_1;
            }
        ],
        execute: function () {
            exports_1("TypeDecorator", types_1.TypeDecorator);
            exports_1("type", types);
            exports_1("validate", validates);
            exports_1("form", forms);
            exports_1("io", io);
        }
    };
});
