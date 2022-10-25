"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GettingStartedCreateAccount = void 0;
var getting_started_1 = require("./getting-started");
var GettingStartedCreateAccount = /** @class */ (function () {
    function GettingStartedCreateAccount() {
    }
    GettingStartedCreateAccount.prototype.bind = function (bindingContext) {
        if (bindingContext instanceof getting_started_1.GettingStarted) {
            this.gs = bindingContext;
        }
    };
    return GettingStartedCreateAccount;
}());
exports.GettingStartedCreateAccount = GettingStartedCreateAccount;
