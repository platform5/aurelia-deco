define(["require", "exports", "./getting-started"], function (require, exports, getting_started_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GettingStartedLogin = void 0;
    var GettingStartedLogin = /** @class */ (function () {
        function GettingStartedLogin() {
            this.hideEvery10min = true;
        }
        GettingStartedLogin.prototype.bind = function (bindingContext) {
            if (bindingContext instanceof getting_started_1.GettingStarted) {
                this.gs = bindingContext;
            }
        };
        GettingStartedLogin.prototype.attached = function () {
            // this.hideEvery10min = true;
            // this.hideTimeout = setInterval(() => {
            //   this.hideEvery10min = false;
            //   setTimeout(() => {
            //     this.hideEvery10min = true;
            //     clearInterval(this.hideTimeout);
            //   }, 1000);
            //   const element = document.createElement('input');
            //   element.
            // }, 5000);
        };
        GettingStartedLogin.prototype.detached = function () {
            clearInterval(this.hideTimeout);
        };
        return GettingStartedLogin;
    }());
    exports.GettingStartedLogin = GettingStartedLogin;
});
