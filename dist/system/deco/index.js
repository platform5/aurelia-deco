System.register(["./components/form/ad-dialog-model", "./dialogs", "./decorators", "./helpers/deco-api", "./helpers/file-upload", "./helpers/ipstack", "./helpers/ensure-model", "./decorators/types", "./interfaces/deco", "./interfaces/file", "./state", "./components/ad-image", "./components/form/deco-field", "./components/ad-images", "./components/ad-images-theme", "aurelia-store"], function (exports_1, context_1) {
    "use strict";
    var types_1;
    var __moduleName = context_1 && context_1.id;
    var exportedNames_1 = {
        "TypeDecorator": true,
        "AdImage": true,
        "DecoField": true,
        "Store": true
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
            function (ad_dialog_model_1_1) {
                exportStar_1(ad_dialog_model_1_1);
            },
            function (dialogs_1_1) {
                exportStar_1(dialogs_1_1);
            },
            function (decorators_1_1) {
                exportStar_1(decorators_1_1);
            },
            function (deco_api_1_1) {
                exportStar_1(deco_api_1_1);
            },
            function (file_upload_1_1) {
                exportStar_1(file_upload_1_1);
            },
            function (ipstack_1_1) {
                exportStar_1(ipstack_1_1);
            },
            function (ensure_model_1_1) {
                exportStar_1(ensure_model_1_1);
            },
            function (types_1_1) {
                types_1 = types_1_1;
            },
            function (deco_1_1) {
                exportStar_1(deco_1_1);
            },
            function (file_1_1) {
                exportStar_1(file_1_1);
            },
            function (state_1_1) {
                exportStar_1(state_1_1);
            },
            function (ad_image_1_1) {
                exports_1({
                    "AdImage": ad_image_1_1["AdImage"]
                });
            },
            function (deco_field_1_1) {
                exports_1({
                    "DecoField": deco_field_1_1["DecoField"]
                });
            },
            function (ad_images_1_1) {
                exportStar_1(ad_images_1_1);
            },
            function (ad_images_theme_1_1) {
                exportStar_1(ad_images_theme_1_1);
            },
            function (aurelia_store_1_1) {
                exports_1({
                    "Store": aurelia_store_1_1["Store"]
                });
            }
        ],
        execute: function () {
            exports_1("TypeDecorator", types_1.TypeDecorator);
        }
    };
});
