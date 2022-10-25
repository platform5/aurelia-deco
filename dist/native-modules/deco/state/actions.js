import { initState } from './interfaces';
import { getLogger } from 'aurelia-logging';
import { countries } from 'aurelia-resources';
var log = getLogger('deco-actions');
export function clearDecoState(state) {
    var newState = Object.assign({}, state);
    newState.stateVersion = initState.stateVersion;
    newState.country = 'CH';
    newState.countries = ['CH'];
    newState.language = 'fr';
    newState.languages = ['fr'];
    return newState;
}
export function initDecoState(state) {
    var newState = Object.assign({}, state);
    if (!newState.stateVersion)
        newState.stateVersion = initState.stateVersion;
    if (!newState.country)
        newState.country = 'CH';
    if (!newState.countries)
        newState.countries = ['CH'];
    if (!newState.language)
        newState.language = 'fr';
    if (!newState.languages)
        newState.languages = ['fr'];
    return newState;
}
export function setStateVersion(state, stateVersion) {
    var newState = Object.assign({}, state);
    newState.stateVersion = stateVersion;
    return newState;
}
export function setLanguages(state, languages) {
    var newState = Object.assign({}, state);
    if (languages === null) {
        delete newState.languages;
    }
    else {
        newState.languages = languages;
    }
    return newState;
}
export function setLanguage(state, language) {
    var newState = Object.assign({}, state);
    if (language === null) {
        delete newState.language;
    }
    else {
        newState.language = language;
    }
    return newState;
}
export function setRefLanguage(state, language) {
    var newState = Object.assign({}, state);
    if (language === null) {
        delete newState.refLanguage;
    }
    else {
        newState.refLanguage = language;
    }
    return newState;
}
export function setCountryCode(state, countryCode) {
    var newState = Object.assign({}, state);
    newState.country = undefined;
    for (var _i = 0, countries_1 = countries; _i < countries_1.length; _i++) {
        var country = countries_1[_i];
        if (country.countryCode === countryCode || country.countryCode2 === countryCode) {
            newState.country = country.countryCode2;
        }
    }
    return newState;
}
export function setCountry(state, countryCode) {
    return setCountryCode(state, countryCode);
}
export function setCountries(state, countries) {
    var newState = Object.assign({}, state);
    if (countries === null) {
        delete newState.countries;
    }
    else {
        newState.countries = countries;
    }
    return newState;
}
