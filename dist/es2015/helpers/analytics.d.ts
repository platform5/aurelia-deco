import { Analytics as AnalyticsBase } from 'aurelia-resources';
export declare class Analytics extends AnalyticsBase {
    autoSave: boolean;
    setListeners(): void;
    private publishToApi;
}
