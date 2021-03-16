System.register(["./getting-started"], function (exports_1, context_1) {
    "use strict";
    var getting_started_1, GettingStartedForgotPassword;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (getting_started_1_1) {
                getting_started_1 = getting_started_1_1;
            }
        ],
        execute: function () {
            GettingStartedForgotPassword = /** @class */ (function () {
                function GettingStartedForgotPassword() {
                }
                GettingStartedForgotPassword.prototype.bind = function (bindingContext) {
                    if (bindingContext instanceof getting_started_1.GettingStarted) {
                        this.gs = bindingContext;
                    }
                };
                return GettingStartedForgotPassword;
            }());
            exports_1("GettingStartedForgotPassword", GettingStartedForgotPassword);
        }
    };
});
