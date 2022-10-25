import { GettingStarted } from './getting-started';
var GettingStartedValidateAccount = /** @class */ (function () {
    function GettingStartedValidateAccount() {
    }
    GettingStartedValidateAccount.prototype.bind = function (bindingContext) {
        if (bindingContext instanceof GettingStarted) {
            this.gs = bindingContext;
        }
    };
    return GettingStartedValidateAccount;
}());
export { GettingStartedValidateAccount };
