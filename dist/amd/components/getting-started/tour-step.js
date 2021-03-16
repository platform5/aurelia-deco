var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-framework", "aurelia-logging"], function (require, exports, aurelia_framework_1, aurelia_logging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TourStep = void 0;
    //import { DOM } from 'aurelia-pal';
    var TourStep = /** @class */ (function () {
        function TourStep(element) {
            this.element = element;
            this.log = aurelia_logging_1.getLogger('comp:tour-step');
        }
        TourStep.prototype.attached = function () {
        };
        TourStep = __decorate([
            aurelia_framework_1.inject(Element)
        ], TourStep);
        return TourStep;
    }());
    exports.TourStep = TourStep;
});
