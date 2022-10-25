export function cloneDeco(originalDeco) {
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
