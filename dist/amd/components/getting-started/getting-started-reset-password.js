define(["require", "exports", "./getting-started"], function (require, exports, getting_started_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GettingStartedResetPassword = void 0;
    var GettingStartedResetPassword = /** @class */ (function () {
        function GettingStartedResetPassword() {
        }
        GettingStartedResetPassword.prototype.bind = function (bindingContext) {
            if (bindingContext instanceof getting_started_1.GettingStarted) {
                this.gs = bindingContext;
            }
        };
        return GettingStartedResetPassword;
    }());
    exports.GettingStartedResetPassword = GettingStartedResetPassword;
});
