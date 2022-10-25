System.register(["./getting-started"], function (exports_1, context_1) {
    "use strict";
    var getting_started_1, GettingStartedLogin;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (getting_started_1_1) {
                getting_started_1 = getting_started_1_1;
            }
        ],
        execute: function () {
            GettingStartedLogin = /** @class */ (function () {
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
            exports_1("GettingStartedLogin", GettingStartedLogin);
        }
    };
});
