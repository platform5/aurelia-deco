"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearProfile = exports.setProfile = exports.setOnline = exports.setCurrentRoute = exports.setAppModels = exports.setSwissdataStateProps = exports.setLoginStep = exports.logout = exports.waitForDoubleAuth = exports.authenticate = exports.setDoubleAuthValidationToken = exports.setAccessToken = exports.setState = exports.setApiHost = exports.initSwissdataState = exports.clearSwissdataState = void 0;
var aurelia_logging_1 = require("aurelia-logging");
var log = aurelia_logging_1.getLogger('swissdata-actions');
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
exports.clearSwissdataState = clearSwissdataState;
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
exports.initSwissdataState = initSwissdataState;
function setApiHost(state, host) {
    var newState = Object.assign({}, state);
    newState.swissdata.h = btoa(host);
    return newState;
}
exports.setApiHost = setApiHost;
function setState(state, swissDataState) {
    var newState = Object.assign({}, state);
    newState.swissdata = swissDataState;
    return newState;
}
exports.setState = setState;
function setAccessToken(state, accessToken) {
    var newState = Object.assign({}, state);
    newState.swissdata.accessToken = accessToken;
    newState.swissdata.requireDoubleAuthValidation = false;
    return newState;
}
exports.setAccessToken = setAccessToken;
function setDoubleAuthValidationToken(state, token) {
    var newState = Object.assign({}, state);
    newState.swissdata.doubleAuthValidationToken = token;
    newState.swissdata.requireDoubleAuthValidation = true;
    return newState;
}
exports.setDoubleAuthValidationToken = setDoubleAuthValidationToken;
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
exports.authenticate = authenticate;
function waitForDoubleAuth(state, doubleAuthValidationToken) {
    var newState = Object.assign({}, state);
    newState.swissdata.authenticated = false;
    newState.swissdata.loginStep = 'double-auth';
    newState.swissdata.requireDoubleAuthValidation = true;
    newState.swissdata.doubleAuthValidationToken = doubleAuthValidationToken;
    newState.swissdata.accessToken = '';
    return newState;
}
exports.waitForDoubleAuth = waitForDoubleAuth;
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
exports.logout = logout;
function setLoginStep(state, step) {
    var newState = Object.assign({}, state);
    newState.swissdata.loginStep = step;
    return newState;
}
exports.setLoginStep = setLoginStep;
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
exports.setSwissdataStateProps = setSwissdataStateProps;
function setAppModels(state, prop, models) {
    var newState = Object.assign({}, state);
    if (!newState[prop] || !Array.isArray(newState[prop]))
        return newState;
    newState[prop] = models;
    return newState;
}
exports.setAppModels = setAppModels;
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
exports.setCurrentRoute = setCurrentRoute;
function setOnline(state, online) {
    var newState = Object.assign({}, state);
    newState.swissdata.online = online;
    return newState;
}
exports.setOnline = setOnline;
function setProfile(state, profile) {
    var newState = Object.assign({}, state);
    newState.swissdata.profile = profile;
    return newState;
}
exports.setProfile = setProfile;
function clearProfile(state) {
    if (!state.profile)
        return state;
    var newState = Object.assign({}, state);
    delete newState.swissdata.profile;
    return newState;
}
exports.clearProfile = clearProfile;
