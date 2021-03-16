import { DicoModel } from '../../models/dico.model';
import { BindingEngine } from 'aurelia-framework';
import { TranslationItem } from './dico';
export declare class DicoTranslateKeyLocale {
    private bindingEngine;
    iteration: number;
    key: string;
    locale: string;
    allDicoItemsByLocale: Array<TranslationItem>;
    visible: boolean;
    instance: DicoModel | null;
    subscription: any;
    constructor(bindingEngine: BindingEngine);
    bind(): void;
    iterationChanged(): void;
    localeChanged(): void;
    allDicoItemsByLocaleChanged(): void;
    attached(): void;
    detached(): void;
    setInstance(): void;
    suffixFromLocale(locale: any): string;
    valueChanged(): void;
}
