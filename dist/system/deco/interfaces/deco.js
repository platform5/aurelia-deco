System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function cloneDeco(originalDeco) {
        var newDeco = {
            baseroute: originalDeco.baseroute,
            target: originalDeco.target,
            options: originalDeco.options,
            propertyTypes: originalDeco.propertyTypes,
            propertyTypesOptions: originalDeco.propertyTypesOptions,
            propertyFromApiOnly: originalDeco.propertyFromApiOnly,
            propertyForms: originalDeco.propertyForms,
            propertyValidations: originalDeco.propertyValidations,
            propertySearchables: originalDeco.propertySearchables,
            propertySortables: originalDeco.propertySortables,
            propertyFilterables: originalDeco.propertyFilterables,
            propertyFilterablesOptions: originalDeco.propertyFilterablesOptions
        };
        return newDeco;
    }
    exports_1("cloneDeco", cloneDeco);
    return {
        setters: [],
        execute: function () {
        }
    };
});
