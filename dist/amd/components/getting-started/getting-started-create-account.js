define(["require", "exports", "./getting-started"], function (require, exports, getting_started_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GettingStartedCreateAccount = void 0;
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
});
