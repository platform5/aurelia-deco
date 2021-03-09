import { I18N } from 'aurelia-i18n';
import { DicoModel } from '../../models/dico.model';
import { BindingEngine } from 'aurelia-framework';
import { SwissdataApi } from '../../helpers/swissdata-api';
import { StringTMap } from 'aurelia-resources';
import { ValidationController } from 'aurelia-validation';
export interface TranslationItem {
    key: string;
    iteration: number;
    locales: StringTMap<DicoModel>;
}
export declare class Dico {
    private i18n;
    private api;
    validationController: ValidationController;
    bindingEngine: BindingEngine;
    defaultLanguage: string;
    languages: Array<string>;
    newDicoElement: DicoModel;
    allDicoItemsByLocale: Array<TranslationItem>;
    showedKeys: Array<string>;
    showedLanguages: Array<string>;
    updateItems: number;
    private viewAddElement;
    private subscription;
    private subscription2;
    private processing;
    constructor(i18n: I18N, api: SwissdataApi, validationController: ValidationController, bindingEngine: BindingEngine);
    deactivate(): void;
    get keys(): string[];
    setLanguage(language: any): void;
    activate(): void;
    getDico(): Promise<void>;
    addItemToDico(key: any, locale: any, item: DicoModel): void;
    showViewAddElement(): void;
    newDicoSaved(): void;
    dicoRemoved(event: any): void;
}
export declare class ContextValueConverter {
    toView(value: any): any;
}
export declare class KeyValueConverter {
    toView(value: any): any;
}
export declare class FilterContextValueConverter {
    toView(items: any, keys: any, updateItems: any): any;
    sort(items: any): any;
}
