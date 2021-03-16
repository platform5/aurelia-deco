import { GettingStarted } from './getting-started';
var GettingStartedPassword = /** @class */ (function () {
    function GettingStartedPassword() {
    }
    GettingStartedPassword.prototype.bind = function (bindingContext) {
        if (bindingContext instanceof GettingStarted) {
            this.gs = bindingContext;
        }
    };
    return GettingStartedPassword;
}());
export { GettingStartedPassword };
