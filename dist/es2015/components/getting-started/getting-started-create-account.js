import { GettingStarted } from './getting-started';
var GettingStartedCreateAccount = /** @class */ (function () {
    function GettingStartedCreateAccount() {
    }
    GettingStartedCreateAccount.prototype.bind = function (bindingContext) {
        if (bindingContext instanceof GettingStarted) {
            this.gs = bindingContext;
        }
    };
    return GettingStartedCreateAccount;
}());
export { GettingStartedCreateAccount };
