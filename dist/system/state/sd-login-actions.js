System.register(["aurelia-logging"], function (exports_1, context_1) {
    "use strict";
    var aurelia_logging_1, log;
    var __moduleName = context_1 && context_1.id;
    function reset(state) {
        var newState = Object.assign({}, state);
        if (newState.sdlogin && newState.sdlogin.username)
            delete newState.sdlogin.username;
        if (newState.sdlogin && newState.sdlogin.createAccountValidationToken)
            delete newState.sdlogin.createAccountValidationToken;
        if (newState.sdlogin && newState.sdlogin.requireDoubleAuthValidation)
            delete newState.sdlogin.requireDoubleAuthValidation;
        if (newState.sdlogin && newState.sdlogin.doubleAuthValidationToken)
            delete newState.sdlogin.doubleAuthValidationToken;
        return newState;
    }
    exports_1("reset", reset);
    function setUsername(state, username) {
        var newState = Object.assign({}, state);
        if (!newState.sdlogin)
            newState.sdlogin = {};
        newState.sdlogin.username = username;
        return newState;
    }
    exports_1("setUsername", setUsername);
    function passwordStep(state, username) {
        var newState = Object.assign({}, state);
        if (!newState.sdlogin)
            newState.sdlogin = {};
        newState.sdlogin.username = username;
        return newState;
    }
    exports_1("passwordStep", passwordStep);
    function validateAccountStep(state, token, tokenExpiry) {
        var newState = Object.assign({}, state);
        newState.sdlogin.createAccountValidationToken = token;
        newState.sdlogin.createAccountValidationTokenExpiry = tokenExpiry;
        return newState;
    }
    exports_1("validateAccountStep", validateAccountStep);
    function doubleAuthStep(state, token) {
        var newState = Object.assign({}, state);
        newState.sdlogin.doubleAuthValidationToken = token;
        newState.sdlogin.requireDoubleAuthValidation = true;
        return newState;
    }
    exports_1("doubleAuthStep", doubleAuthStep);
    function setAccessToken(state, accessToken) {
        var newState = Object.assign({}, state);
        newState.swissdata.accessToken = accessToken;
        newState.swissdata.requireDoubleAuthValidation = false;
        return newState;
    }
    exports_1("setAccessToken", setAccessToken);
    function authenticate(state, user, accessToken, profile) {
        var newState = Object.assign({}, state);
        newState.swissdata.authenticated = true;
        newState.swissdata.user = user;
        newState.sdlogin.doubleAuthValidationToken = '';
        newState.swissdata.requireDoubleAuthValidation = false;
        if (accessToken)
            newState.swissdata.accessToken = accessToken;
        if (profile)
            newState.swissdata.profile = profile;
        return newState;
    }
    exports_1("authenticate", authenticate);
    function setCurrentProfile(state, profile) {
        var newState = Object.assign({}, state);
        newState.swissdata.profile = profile;
        return newState;
    }
    exports_1("setCurrentProfile", setCurrentProfile);
    function resetPasswordStep(state, token) {
        var newState = Object.assign({}, state);
        newState.sdlogin.resetPasswordToken = token;
        return newState;
    }
    exports_1("resetPasswordStep", resetPasswordStep);
    function logout(state) {
        var newState = Object.assign({}, state);
        newState.swissdata.authenticated = false;
        newState.swissdata.user = null;
        newState.sdlogin.doubleAuthValidationToken = '';
        newState.swissdata.requireDoubleAuthValidation = false;
        newState.swissdata.accessToken = null;
        newState.swissdata.profile = null;
        return newState;
    }
    exports_1("logout", logout);
    function registerUserId(state, userId, firstname, lastname, username, profileUrl) {
        var newState = Object.assign({}, state);
        if (!newState.sdlogin.accounts)
            newState.sdlogin.accounts = [];
        var index = newState.sdlogin.accounts.map(function (i) { return i.userId; }).indexOf(userId);
        if (index !== -1) {
            newState.sdlogin.accounts.splice(index, 1);
        }
        newState.sdlogin.accounts.unshift({
            firstname: firstname,
            lastname: lastname,
            username: username,
            userId: userId,
            profileUrl: profileUrl,
        });
        return newState;
    }
    exports_1("registerUserId", registerUserId);
    function updateRegisteredUserId(state, userId, firstname, lastname, username, profileUrl) {
        var newState = Object.assign({}, state);
        if (newState.sdlogin.accounts)
            return newState;
        var index = newState.sdlogin.accounts.map(function (i) { return i.userId; }).indexOf(userId);
        if (index !== -1) {
            if (firstname !== undefined)
                newState.sdlogin.accounts[index].firstname = firstname;
            if (lastname !== undefined)
                newState.sdlogin.accounts[index].lastname = lastname;
            if (username !== undefined)
                newState.sdlogin.accounts[index].username = username;
            if (profileUrl !== undefined)
                newState.sdlogin.accounts[index].profileUrl = profileUrl;
        }
        return newState;
    }
    exports_1("updateRegisteredUserId", updateRegisteredUserId);
    function registerCurrentUserId(state, username) {
        if (!state.swissdata.authenticated || !state.swissdata.user || !state.swissdata.user.id)
            return state;
        var profileUrl = state.swissdata.profile && state.swissdata.profile.id && state.swissdata.profile.picture ?
            "/profile/" + state.swissdata.profile.id + "?download=picture" : undefined;
        return registerUserId(state, state.swissdata.user.id, state.swissdata.user.firstname, state.swissdata.user.lastname, username, profileUrl);
    }
    exports_1("registerCurrentUserId", registerCurrentUserId);
    function removeRegisteredUserId(state, userId) {
        var newState = Object.assign({}, state);
        if (!newState.sdlogin.accounts)
            newState.sdlogin.accounts = [];
        var index = newState.sdlogin.accounts.map(function (i) { return i.userId; }).indexOf(userId);
        if (index !== -1) {
            newState.sdlogin.accounts.splice(index, 1);
        }
        return newState;
    }
    exports_1("removeRegisteredUserId", removeRegisteredUserId);
    return {
        setters: [
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            }
        ],
        execute: function () {
            log = aurelia_logging_1.getLogger('sd-login-actions');
        }
    };
});
