import { DecoField, Model, DecoApi } from '../../deco';
export declare class SwissdataField extends DecoField {
    element: HTMLElement;
    instance: Model;
    property: string;
    type: string;
    autohint: boolean;
    variant: string;
    selectOptions: Array<any> | null;
    constructor(element: HTMLElement, decoApi: DecoApi);
    bind(): void;
    instanceChanged(): void;
    propertyChanged(): void;
    initField(): void;
    processType(): void;
    setDynamicModelOption(): void;
}
