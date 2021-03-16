System.register(["./user.model", "./profile.model", "./app.model", "./dico.model", "./dynamicconfig.model", "./dynamicdata.model"], function (exports_1, context_1) {
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
            function (user_model_1_1) {
                exportStar_1(user_model_1_1);
            },
            function (profile_model_1_1) {
                exportStar_1(profile_model_1_1);
            },
            function (app_model_1_1) {
                exportStar_1(app_model_1_1);
            },
            function (dico_model_1_1) {
                exportStar_1(dico_model_1_1);
            },
            function (dynamicconfig_model_1_1) {
                exportStar_1(dynamicconfig_model_1_1);
            },
            function (dynamicdata_model_1_1) {
                exportStar_1(dynamicdata_model_1_1);
            }
        ],
        execute: function () {
        }
    };
});
