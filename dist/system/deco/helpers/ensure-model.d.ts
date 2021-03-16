import { Model } from '../decorators/model';
import { EventAggregator } from 'aurelia-event-aggregator';
export declare class EnsureModel<T extends typeof Model> {
    private eventAggregator;
    private model;
    private suffix;
    private getAllOptions;
    instances: {
        [key: string]: InstanceType<T> | null;
    };
    private language;
    private idsToFetch;
    private fetching;
    constructor(eventAggregator: EventAggregator);
    init(model: T, suffix?: string, getAllOptions?: any, language?: string): void;
    get(id: string): Promise<InstanceType<T> | null>;
    reload(id: string): Promise<InstanceType<T> | null>;
    reloadAll(): void;
    ensureIds(ids: string[]): Promise<InstanceType<T>[]>;
    private fetchNextItems;
    get isFetching(): boolean;
}
