import { getLogger } from 'aurelia-logging';
var log = getLogger('sd-login-actions');
export function reset(state) {
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
export function setUsername(state, username) {
    var newState = Object.assign({}, state);
    if (!newState.sdlogin)
        newState.sdlogin = {};
    newState.sdlogin.username = username;
    return newState;
}
export function passwordStep(state, username) {
    var newState = Object.assign({}, state);
    if (!newState.sdlogin)
        newState.sdlogin = {};
    newState.sdlogin.username = username;
    return newState;
}
export function validateAccountStep(state, token, tokenExpiry) {
    var newState = Object.assign({}, state);
    newState.sdlogin.createAccountValidationToken = token;
    newState.sdlogin.createAccountValidationTokenExpiry = tokenExpiry;
    return newState;
}
export function doubleAuthStep(state, token) {
    var newState = Object.assign({}, state);
    newState.sdlogin.doubleAuthValidationToken = token;
    newState.sdlogin.requireDoubleAuthValidation = true;
    return newState;
}
export function setAccessToken(state, accessToken) {
    var newState = Object.assign({}, state);
    newState.swissdata.accessToken = accessToken;
    newState.swissdata.requireDoubleAuthValidation = false;
    return newState;
}
export function authenticate(state, user, accessToken, profile) {
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
export function setCurrentProfile(state, profile) {
    var newState = Object.assign({}, state);
    newState.swissdata.profile = profile;
    return newState;
}
export function resetPasswordStep(state, token) {
    var newState = Object.assign({}, state);
    newState.sdlogin.resetPasswordToken = token;
    return newState;
}
export function logout(state) {
    var newState = Object.assign({}, state);
    newState.swissdata.authenticated = false;
    newState.swissdata.user = null;
    newState.sdlogin.doubleAuthValidationToken = '';
    newState.swissdata.requireDoubleAuthValidation = false;
    newState.swissdata.accessToken = null;
    newState.swissdata.profile = null;
    return newState;
}
export function registerUserId(state, userId, firstname, lastname, username, profileUrl) {
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
export function updateRegisteredUserId(state, userId, firstname, lastname, username, profileUrl) {
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
export function registerCurrentUserId(state, username) {
    if (!state.swissdata.authenticated || !state.swissdata.user || !state.swissdata.user.id)
        return state;
    var profileUrl = state.swissdata.profile && state.swissdata.profile.id && state.swissdata.profile.picture ?
        "/profile/" + state.swissdata.profile.id + "?download=picture" : undefined;
    return registerUserId(state, state.swissdata.user.id, state.swissdata.user.firstname, state.swissdata.user.lastname, username, profileUrl);
}
export function removeRegisteredUserId(state, userId) {
    var newState = Object.assign({}, state);
    if (!newState.sdlogin.accounts)
        newState.sdlogin.accounts = [];
    var index = newState.sdlogin.accounts.map(function (i) { return i.userId; }).indexOf(userId);
    if (index !== -1) {
        newState.sdlogin.accounts.splice(index, 1);
    }
    return newState;
}
