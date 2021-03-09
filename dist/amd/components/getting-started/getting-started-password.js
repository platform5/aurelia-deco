define(["require", "exports", "./getting-started"], function (require, exports, getting_started_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GettingStartedPassword = void 0;
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
});
