var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SwissdataApi } from './swissdata-api';
import { ProfileModel } from '../models/profile.model';
import { inject, Container } from 'aurelia-framework';
import { setProfile, clearProfile } from '../state/actions';
import { jsonify } from '../deco';
import { UserModel } from '../models/user.model';
var ProfileHelper = /** @class */ (function () {
    function ProfileHelper(swissdataApi) {
        this.swissdataApi = swissdataApi;
    }
    ProfileHelper_1 = ProfileHelper;
    Object.defineProperty(ProfileHelper, "swissdataApi", {
        get: function () {
            if (!ProfileHelper_1._swissdataApi) {
                ProfileHelper_1._swissdataApi = Container.instance.get(SwissdataApi);
            }
            return ProfileHelper_1._swissdataApi;
        },
        enumerable: false,
        configurable: true
    });
    ProfileHelper.registerActions = function () {
        this.swissdataApi.store.registerAction('setProfile', setProfile);
        this.swissdataApi.store.registerAction('clearProfile', clearProfile);
    };
    ProfileHelper.getCurrentProfile = function () {
        var _this = this;
        return this.swissdataApi.get("/profile/current").then(jsonify).then(function (response) {
            var instance = new ProfileModel;
            instance.id = response.id;
            instance.updateInstanceFromElement(response);
            _this.profileInstance = instance;
            return _this.swissdataApi.store.dispatch(setProfile, response);
        });
    };
    ProfileHelper.getEditingInstance = function () {
        var instance = new ProfileModel;
        instance.id = this.swissdataApi.state.swissdata.profile.id;
        instance.updateInstanceFromElement(this.swissdataApi.state.swissdata.profile);
        return instance;
    };
    ProfileHelper.getEditingUserInstance = function () {
        var instance = new UserModel;
        instance.id = this.swissdataApi.state.swissdata.user.id;
        instance.updateInstanceFromElement(this.swissdataApi.state.swissdata.user);
        return instance;
    };
    ProfileHelper.clearProfile = function () {
        return this.swissdataApi.store.dispatch(clearProfile);
    };
    var ProfileHelper_1;
    ProfileHelper = ProfileHelper_1 = __decorate([
        inject(SwissdataApi)
    ], ProfileHelper);
    return ProfileHelper;
}());
export { ProfileHelper };
