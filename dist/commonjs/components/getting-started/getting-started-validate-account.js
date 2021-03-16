"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GettingStartedValidateAccount = void 0;
var getting_started_1 = require("./getting-started");
var GettingStartedValidateAccount = /** @class */ (function () {
    function GettingStartedValidateAccount() {
    }
    GettingStartedValidateAccount.prototype.bind = function (bindingContext) {
        if (bindingContext instanceof getting_started_1.GettingStarted) {
            this.gs = bindingContext;
        }
    };
    return GettingStartedValidateAccount;
}());
exports.GettingStartedValidateAccount = GettingStartedValidateAccount;
