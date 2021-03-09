import { Aurelia } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
export interface i18NSetupOptions {
    aurelia?: Aurelia;
    host: string;
    apiKey: string;
    translationMemoryApiKey: string;
    translationMemoryHost?: string;
    defaultLanguage: string;
    debug?: boolean;
    saveMissing?: boolean;
    skipTranslationOnMissingKey?: boolean;
}
export declare function getI18NSetupOptions(): i18NSetupOptions;
export declare let i18nSetup: (options: i18NSetupOptions) => (instance: I18N) => Promise<any>;
