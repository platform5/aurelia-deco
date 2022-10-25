import { GettingStarted } from './getting-started';
var GettingStartedAccountsList = /** @class */ (function () {
    function GettingStartedAccountsList() {
    }
    GettingStartedAccountsList.prototype.bind = function (bindingContext) {
        if (bindingContext instanceof GettingStarted) {
            this.gs = bindingContext;
        }
    };
    return GettingStartedAccountsList;
}());
export { GettingStartedAccountsList };
