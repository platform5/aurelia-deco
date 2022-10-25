System.register(["./getting-started"], function (exports_1, context_1) {
    "use strict";
    var getting_started_1, GettingStartedCreateAccountPart2;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (getting_started_1_1) {
                getting_started_1 = getting_started_1_1;
            }
        ],
        execute: function () {
            GettingStartedCreateAccountPart2 = /** @class */ (function () {
                function GettingStartedCreateAccountPart2() {
                }
                GettingStartedCreateAccountPart2.prototype.bind = function (bindingContext) {
                    if (bindingContext instanceof getting_started_1.GettingStarted) {
                        this.gs = bindingContext;
                    }
                };
                return GettingStartedCreateAccountPart2;
            }());
            exports_1("GettingStartedCreateAccountPart2", GettingStartedCreateAccountPart2);
        }
    };
});
