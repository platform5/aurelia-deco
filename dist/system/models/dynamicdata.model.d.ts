import { Model, Deco } from '../deco';
import { DynamicConfigModel } from './dynamicconfig.model';
export interface DynamicConfigModelWithDeco extends DynamicConfigModel {
    deco: Deco;
}
export declare class DynamicDataModel extends Model {
    modelId: string;
    constructor(slug?: string);
    static models: {
        [key: string]: DynamicConfigModelWithDeco;
    };
    static currentModelSlug: string;
    static clearRegisteredModels(): void;
    static registerModel(model: DynamicConfigModel): void;
    static addDecoToModel(model: DynamicConfigModel): DynamicConfigModelWithDeco;
    static use(slug: string): typeof DynamicDataModel;
    static get deco(): Deco;
    get deco(): Deco;
    private static _originalDeco;
    static get originalDeco(): Deco;
    static instanceFromElement<T extends typeof Model>(this: T, element: any): InstanceType<T>;
    get _label(): any;
}
