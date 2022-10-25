System.register(["./getting-started"], function (exports_1, context_1) {
    "use strict";
    var getting_started_1, GettingStartedAccountsList;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (getting_started_1_1) {
                getting_started_1 = getting_started_1_1;
            }
        ],
        execute: function () {
            GettingStartedAccountsList = /** @class */ (function () {
                function GettingStartedAccountsList() {
                }
                GettingStartedAccountsList.prototype.bind = function (bindingContext) {
                    if (bindingContext instanceof getting_started_1.GettingStarted) {
                        this.gs = bindingContext;
                    }
                };
                return GettingStartedAccountsList;
            }());
            exports_1("GettingStartedAccountsList", GettingStartedAccountsList);
        }
    };
});
