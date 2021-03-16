import { Model } from '../../decorators';
import { DecoApi } from '../../helpers/deco-api';
export declare class DecoSave {
    element: HTMLElement;
    decoApi: DecoApi;
    instance: Model;
    suffix: string;
    autoaddLocaleSuffix: boolean;
    processing: boolean;
    route: string;
    constructor(element: HTMLElement, decoApi: DecoApi);
    save(): void;
}
