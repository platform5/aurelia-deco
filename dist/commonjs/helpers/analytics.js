"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Analytics = void 0;
var analytics_model_1 = require("./../models/analytics.model");
var aurelia_resources_1 = require("aurelia-resources");
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_logging_1 = require("aurelia-logging");
var log = aurelia_logging_1.getLogger('swissdata:analytics');
var Analytics = /** @class */ (function (_super) {
    __extends(Analytics, _super);
    function Analytics() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autoSave = false;
        return _this;
    }
    Analytics.prototype.setListeners = function () {
        var _this = this;
        _super.prototype.setListeners.call(this);
        var ea = aurelia_framework_1.Container.instance.get(aurelia_event_aggregator_1.EventAggregator);
        ea.subscribe('analytics:save', function (data) {
            if (!_this.autoSave)
                return;
            _this.publishToApi(data);
        });
    };
    Analytics.prototype.publishToApi = function (data) {
        var _loop_1 = function (row) {
            var entry = new analytics_model_1.AnalyticsModel();
            entry.updateInstanceFromElement(row).then(function () {
                entry.save();
            });
        };
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var row = data_1[_i];
            _loop_1(row);
        }
    };
    return Analytics;
}(aurelia_resources_1.Analytics));
exports.Analytics = Analytics;
