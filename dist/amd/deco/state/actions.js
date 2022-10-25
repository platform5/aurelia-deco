define(["require", "exports", "./interfaces", "aurelia-logging", "aurelia-resources"], function (require, exports, interfaces_1, aurelia_logging_1, aurelia_resources_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setCountries = exports.setCountry = exports.setCountryCode = exports.setRefLanguage = exports.setLanguage = exports.setLanguages = exports.setStateVersion = exports.initDecoState = exports.clearDecoState = void 0;
    var log = aurelia_logging_1.getLogger('deco-actions');
    function clearDecoState(state) {
        var newState = Object.assign({}, state);
        newState.stateVersion = interfaces_1.initState.stateVersion;
        newState.country = 'CH';
        newState.countries = ['CH'];
        newState.language = 'fr';
        newState.languages = ['fr'];
        return newState;
    }
    exports.clearDecoState = clearDecoState;
    function initDecoState(state) {
        var newState = Object.assign({}, state);
        if (!newState.stateVersion)
            newState.stateVersion = interfaces_1.initState.stateVersion;
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
    exports.initDecoState = initDecoState;
    function setStateVersion(state, stateVersion) {
        var newState = Object.assign({}, state);
        newState.stateVersion = stateVersion;
        return newState;
    }
    exports.setStateVersion = setStateVersion;
    function setLanguages(state, languages) {
        var newState = Object.assign({}, state);
        if (languages === null) {
            delete newState.languages;
        }
        else {
            newState.languages = languages;
        }
        return newState;
    }
    exports.setLanguages = setLanguages;
    function setLanguage(state, language) {
        var newState = Object.assign({}, state);
        if (language === null) {
            delete newState.language;
        }
        else {
            newState.language = language;
        }
        return newState;
    }
    exports.setLanguage = setLanguage;
    function setRefLanguage(state, language) {
        var newState = Object.assign({}, state);
        if (language === null) {
            delete newState.refLanguage;
        }
        else {
            newState.refLanguage = language;
        }
        return newState;
    }
    exports.setRefLanguage = setRefLanguage;
    function setCountryCode(state, countryCode) {
        var newState = Object.assign({}, state);
        newState.country = undefined;
        for (var _i = 0, countries_1 = aurelia_resources_1.countries; _i < countries_1.length; _i++) {
            var country = countries_1[_i];
            if (country.countryCode === countryCode || country.countryCode2 === countryCode) {
                newState.country = country.countryCode2;
            }
        }
        return newState;
    }
    exports.setCountryCode = setCountryCode;
    function setCountry(state, countryCode) {
        return setCountryCode(state, countryCode);
    }
    exports.setCountry = setCountry;
    function setCountries(state, countries) {
        var newState = Object.assign({}, state);
        if (countries === null) {
            delete newState.countries;
        }
        else {
            newState.countries = countries;
        }
        return newState;
    }
    exports.setCountries = setCountries;
});
