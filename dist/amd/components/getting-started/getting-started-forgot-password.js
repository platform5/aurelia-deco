define(["require", "exports", "./getting-started"], function (require, exports, getting_started_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GettingStartedForgotPassword = void 0;
    var GettingStartedForgotPassword = /** @class */ (function () {
        function GettingStartedForgotPassword() {
        }
        GettingStartedForgotPassword.prototype.bind = function (bindingContext) {
            if (bindingContext instanceof getting_started_1.GettingStarted) {
                this.gs = bindingContext;
            }
        };
        return GettingStartedForgotPassword;
    }());
    exports.GettingStartedForgotPassword = GettingStartedForgotPassword;
});
