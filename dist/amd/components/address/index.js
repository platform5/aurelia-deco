var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
define(["require", "exports", "./address-control", "./address-dialog", "./address-item", "./select-address-control", "./select-address-dialog"], function (require, exports, address_control_1, address_dialog_1, address_item_1, select_address_control_1, select_address_dialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(address_control_1, exports);
    __exportStar(address_dialog_1, exports);
    __exportStar(address_item_1, exports);
    __exportStar(select_address_control_1, exports);
    __exportStar(select_address_dialog_1, exports);
});
