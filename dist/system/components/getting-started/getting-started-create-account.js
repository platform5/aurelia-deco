System.register(["./getting-started"], function (exports_1, context_1) {
    "use strict";
    var getting_started_1, GettingStartedCreateAccount;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (getting_started_1_1) {
                getting_started_1 = getting_started_1_1;
            }
        ],
        execute: function () {
            GettingStartedCreateAccount = /** @class */ (function () {
                function GettingStartedCreateAccount() {
                }
                GettingStartedCreateAccount.prototype.bind = function (bindingContext) {
                    if (bindingContext instanceof getting_started_1.GettingStarted) {
                        this.gs = bindingContext;
                    }
                };
                return GettingStartedCreateAccount;
            }());
            exports_1("GettingStartedCreateAccount", GettingStartedCreateAccount);
        }
    };
});
