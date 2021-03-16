"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileHelper = void 0;
var swissdata_api_1 = require("./swissdata-api");
var profile_model_1 = require("../models/profile.model");
var aurelia_framework_1 = require("aurelia-framework");
var actions_1 = require("../state/actions");
var deco_1 = require("../deco");
var user_model_1 = require("../models/user.model");
var ProfileHelper = /** @class */ (function () {
    function ProfileHelper(swissdataApi) {
        this.swissdataApi = swissdataApi;
    }
    ProfileHelper_1 = ProfileHelper;
    Object.defineProperty(ProfileHelper, "swissdataApi", {
        get: function () {
            if (!ProfileHelper_1._swissdataApi) {
                ProfileHelper_1._swissdataApi = aurelia_framework_1.Container.instance.get(swissdata_api_1.SwissdataApi);
            }
            return ProfileHelper_1._swissdataApi;
        },
        enumerable: false,
        configurable: true
    });
    ProfileHelper.registerActions = function () {
        this.swissdataApi.store.registerAction('setProfile', actions_1.setProfile);
        this.swissdataApi.store.registerAction('clearProfile', actions_1.clearProfile);
    };
    ProfileHelper.getCurrentProfile = function () {
        var _this = this;
        return this.swissdataApi.get("/profile/current").then(deco_1.jsonify).then(function (response) {
            var instance = new profile_model_1.ProfileModel;
            instance.id = response.id;
            instance.updateInstanceFromElement(response);
            _this.profileInstance = instance;
            return _this.swissdataApi.store.dispatch(actions_1.setProfile, response);
        });
    };
    ProfileHelper.getEditingInstance = function () {
        var instance = new profile_model_1.ProfileModel;
        instance.id = this.swissdataApi.state.swissdata.profile.id;
        instance.updateInstanceFromElement(this.swissdataApi.state.swissdata.profile);
        return instance;
    };
    ProfileHelper.getEditingUserInstance = function () {
        var instance = new user_model_1.UserModel;
        instance.id = this.swissdataApi.state.swissdata.user.id;
        instance.updateInstanceFromElement(this.swissdataApi.state.swissdata.user);
        return instance;
    };
    ProfileHelper.clearProfile = function () {
        return this.swissdataApi.store.dispatch(actions_1.clearProfile);
    };
    var ProfileHelper_1;
    ProfileHelper = ProfileHelper_1 = __decorate([
        aurelia_framework_1.inject(swissdata_api_1.SwissdataApi)
    ], ProfileHelper);
    return ProfileHelper;
}());
exports.ProfileHelper = ProfileHelper;
