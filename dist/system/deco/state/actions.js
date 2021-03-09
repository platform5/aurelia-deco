System.register(["./interfaces", "aurelia-logging", "aurelia-resources"], function (exports_1, context_1) {
    "use strict";
    var interfaces_1, aurelia_logging_1, aurelia_resources_1, log;
    var __moduleName = context_1 && context_1.id;
    function clearDecoState(state) {
        var newState = Object.assign({}, state);
        newState.stateVersion = interfaces_1.initState.stateVersion;
        newState.country = 'CH';
        newState.countries = ['CH'];
        newState.language = 'fr';
        newState.languages = ['fr'];
        return newState;
    }
    exports_1("clearDecoState", clearDecoState);
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
    exports_1("initDecoState", initDecoState);
    function setStateVersion(state, stateVersion) {
        var newState = Object.assign({}, state);
        newState.stateVersion = stateVersion;
        return newState;
    }
    exports_1("setStateVersion", setStateVersion);
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
    exports_1("setLanguages", setLanguages);
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
    exports_1("setLanguage", setLanguage);
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
    exports_1("setRefLanguage", setRefLanguage);
    function setCountryCode(state, countryCode) {
        var newState = Object.assign({}, state);
        newState.countryCode = undefined;
        for (var _i = 0, countries_1 = aurelia_resources_1.countries; _i < countries_1.length; _i++) {
            var country = countries_1[_i];
            if (country.countryCode === countryCode || country.countryCode2 === countryCode) {
                newState.countryCode = country.countryCode2;
            }
        }
        return newState;
    }
    exports_1("setCountryCode", setCountryCode);
    function setCountry(state, countryCode) {
        return setCountryCode(state, countryCode);
    }
    exports_1("setCountry", setCountry);
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
    exports_1("setCountries", setCountries);
    return {
        setters: [
            function (interfaces_1_1) {
                interfaces_1 = interfaces_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            },
            function (aurelia_resources_1_1) {
                aurelia_resources_1 = aurelia_resources_1_1;
            }
        ],
        execute: function () {
            log = aurelia_logging_1.getLogger('deco-actions');
        }
    };
});
