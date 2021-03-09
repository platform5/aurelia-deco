System.register(["./address-control", "./address-dialog", "./address-item", "./select-address-control", "./select-address-dialog"], function (exports_1, context_1) {
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
            function (address_control_1_1) {
                exportStar_1(address_control_1_1);
            },
            function (address_dialog_1_1) {
                exportStar_1(address_dialog_1_1);
            },
            function (address_item_1_1) {
                exportStar_1(address_item_1_1);
            },
            function (select_address_control_1_1) {
                exportStar_1(select_address_control_1_1);
            },
            function (select_address_dialog_1_1) {
                exportStar_1(select_address_dialog_1_1);
            }
        ],
        execute: function () {
        }
    };
});
