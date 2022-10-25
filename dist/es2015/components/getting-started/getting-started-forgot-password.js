import { GettingStarted } from './getting-started';
var GettingStartedForgotPassword = /** @class */ (function () {
    function GettingStartedForgotPassword() {
    }
    GettingStartedForgotPassword.prototype.bind = function (bindingContext) {
        if (bindingContext instanceof GettingStarted) {
            this.gs = bindingContext;
        }
    };
    return GettingStartedForgotPassword;
}());
export { GettingStartedForgotPassword };
