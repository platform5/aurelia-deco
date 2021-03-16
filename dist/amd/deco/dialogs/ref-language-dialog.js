var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "../helpers/deco-api", "aurelia-framework"], function (require, exports, deco_api_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RefLanguageDialog = void 0;
    var RefLanguageDialog = /** @class */ (function () {
        function RefLanguageDialog(deco) {
            this.deco = deco;
        }
        RefLanguageDialog.prototype.toggleRefLanguage = function (language) {
            if (this.deco.state.languages.indexOf(language) !== -1) {
                if (this.deco.state.refLanguage === language) {
                    this.deco.store.dispatch('setRefLanguage', '');
                }
                else {
                    this.deco.store.dispatch('setRefLanguage', language);
                }
            }
        };
        RefLanguageDialog = __decorate([
            aurelia_framework_1.inject(deco_api_1.DecoApi)
        ], RefLanguageDialog);
        return RefLanguageDialog;
    }());
    exports.RefLanguageDialog = RefLanguageDialog;
});
