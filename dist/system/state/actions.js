System.register(["aurelia-logging"], function (exports_1, context_1) {
    "use strict";
    var aurelia_logging_1, log;
    var __moduleName = context_1 && context_1.id;
    function clearSwissdataState(state) {
        var newState = Object.assign({}, state);
        newState.swissdata = {
            publicKey: '',
            authenticated: false,
            loginStep: 'login',
            h: ''
        };
        newState.swissdata.publicKey = '';
        newState.swissdata.authenticated = false;
        return newState;
    }
    exports_1("clearSwissdataState", clearSwissdataState);
    function initSwissdataState(state) {
        var newState = Object.assign({}, state);
        if (!newState.swissdata)
            newState.swissdata = {
                publicKey: '',
                authenticated: false,
                loginStep: 'login',
                h: ''
            };
        if (!newState.swissdata.publicKey || typeof newState.swissdata.publicKey !== 'string')
            newState.swissdata.publicKey = '';
        if (newState.swissdata.authenticated === undefined || typeof newState.swissdata.authenticated !== 'boolean')
            newState.swissdata.authenticated = false;
        return newState;
    }
    exports_1("initSwissdataState", initSwissdataState);
    function setApiHost(state, host) {
        var newState = Object.assign({}, state);
        newState.swissdata.h = btoa(host);
        return newState;
    }
    exports_1("setApiHost", setApiHost);
    function setState(state, swissDataState) {
        var newState = Object.assign({}, state);
        newState.swissdata = swissDataState;
        return newState;
    }
    exports_1("setState", setState);
    function setAccessToken(state, accessToken) {
        var newState = Object.assign({}, state);
        newState.swissdata.accessToken = accessToken;
        newState.swissdata.requireDoubleAuthValidation = false;
        return newState;
    }
    exports_1("setAccessToken", setAccessToken);
    function setDoubleAuthValidationToken(state, token) {
        var newState = Object.assign({}, state);
        newState.swissdata.doubleAuthValidationToken = token;
        newState.swissdata.requireDoubleAuthValidation = true;
        return newState;
    }
    exports_1("setDoubleAuthValidationToken", setDoubleAuthValidationToken);
    function authenticate(state, user, accessToken, profile) {
        var newState = Object.assign({}, state);
        newState.swissdata.authenticated = true;
        newState.swissdata.user = user;
        newState.swissdata.loginStep = 'login';
        newState.swissdata.doubleAuthValidationToken = '';
        if (accessToken)
            newState.swissdata.accessToken = accessToken;
        if (profile)
            newState.swissdata.profile = profile;
        return newState;
    }
    exports_1("authenticate", authenticate);
    function waitForDoubleAuth(state, doubleAuthValidationToken) {
        var newState = Object.assign({}, state);
        newState.swissdata.authenticated = false;
        newState.swissdata.loginStep = 'double-auth';
        newState.swissdata.requireDoubleAuthValidation = true;
        newState.swissdata.doubleAuthValidationToken = doubleAuthValidationToken;
        newState.swissdata.accessToken = '';
        return newState;
    }
    exports_1("waitForDoubleAuth", waitForDoubleAuth);
    function logout(state) {
        var newState = Object.assign({}, state);
        newState.swissdata.authenticated = false;
        newState.swissdata.user = undefined;
        newState.swissdata.accessToken = '';
        newState.swissdata.loginStep = 'login';
        newState.swissdata.requireDoubleAuthValidation = false;
        newState.swissdata.doubleAuthValidationToken = '';
        newState.swissdata.profile = undefined;
        return newState;
    }
    exports_1("logout", logout);
    function setLoginStep(state, step) {
        var newState = Object.assign({}, state);
        newState.swissdata.loginStep = step;
        return newState;
    }
    exports_1("setLoginStep", setLoginStep);
    function setSwissdataStateProps(state, keyValues) {
        if (keyValues.newAccountInstance) {
            keyValues.newAccountInstance = {
                firstname: keyValues.newAccountInstance.firstname,
                lastname: keyValues.newAccountInstance.lastname,
                email: keyValues.newAccountInstance.email,
                mobile: keyValues.newAccountInstance.mobile,
            };
        }
        var newState = Object.assign({}, state);
        try {
            for (var key in keyValues) {
                newState.swissdata[key] = keyValues[key];
            }
        }
        catch (error) {
            this.log.warn('Error when setting swissdata stat prop');
            this.log.error(error);
        }
        return newState;
    }
    exports_1("setSwissdataStateProps", setSwissdataStateProps);
    function setAppModels(state, prop, models) {
        var newState = Object.assign({}, state);
        if (!newState[prop] || !Array.isArray(newState[prop]))
            return newState;
        newState[prop] = models;
        return newState;
    }
    exports_1("setAppModels", setAppModels);
    function setCurrentRoute(state, instruction) {
        var newState = Object.assign({}, state);
        if (instruction.config && instruction.config.name) {
            newState.currentRoute.name = instruction.config.name;
        }
        if (instruction.params) {
            newState.currentRoute.params = instruction.params;
        }
        else {
            delete newState.currentRoute.params;
        }
        return newState;
    }
    exports_1("setCurrentRoute", setCurrentRoute);
    function setOnline(state, online) {
        var newState = Object.assign({}, state);
        newState.swissdata.online = online;
        return newState;
    }
    exports_1("setOnline", setOnline);
    function setProfile(state, profile) {
        var newState = Object.assign({}, state);
        newState.swissdata.profile = profile;
        return newState;
    }
    exports_1("setProfile", setProfile);
    function clearProfile(state) {
        if (!state.profile)
            return state;
        var newState = Object.assign({}, state);
        delete newState.swissdata.profile;
        return newState;
    }
    exports_1("clearProfile", clearProfile);
    return {
        setters: [
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            }
        ],
        execute: function () {
            log = aurelia_logging_1.getLogger('swissdata-actions');
        }
    };
});
