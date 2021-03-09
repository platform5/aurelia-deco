define(["require", "exports", "./getting-started"], function (require, exports, getting_started_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GettingStartedAccountsList = void 0;
    var GettingStartedAccountsList = /** @class */ (function () {
        function GettingStartedAccountsList() {
        }
        GettingStartedAccountsList.prototype.bind = function (bindingContext) {
            if (bindingContext instanceof getting_started_1.GettingStarted) {
                this.gs = bindingContext;
            }
        };
        return GettingStartedAccountsList;
    }());
    exports.GettingStartedAccountsList = GettingStartedAccountsList;
});
