"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GettingStartedPassword = void 0;
var getting_started_1 = require("./getting-started");
var GettingStartedPassword = /** @class */ (function () {
    function GettingStartedPassword() {
    }
    GettingStartedPassword.prototype.bind = function (bindingContext) {
        if (bindingContext instanceof getting_started_1.GettingStarted) {
            this.gs = bindingContext;
        }
    };
    return GettingStartedPassword;
}());
exports.GettingStartedPassword = GettingStartedPassword;
