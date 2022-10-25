import { DecoApi } from '../helpers/deco-api';
export declare class DecoeditCustomAttribute {
    decoApi: DecoApi;
    instance: any;
    property: string;
    trigger: string;
    unescapeContent: boolean;
    suffix: string;
    autoaddLocaleSuffix: boolean;
    element: HTMLElement;
    private currentValue;
    private edited;
    private processing;
    private error;
    constructor(element: any, decoApi: DecoApi);
    bind(): void;
    makeEditable(): void;
    initValue(): void;
    setCurrentValue(): void;
    setHandleChange(): void;
    handleEdit(e: any): void;
    handleUpdate(e: any): void;
    updateValue(): void;
    editedChanged(): void;
    processingChanged(): void;
    errorChanged(): void;
}
