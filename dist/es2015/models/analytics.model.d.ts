import { Model } from '../deco';
export declare class AnalyticsModel extends Model {
    sessionId: string;
    identity: string;
    type: 'navigation' | 'click' | 'event';
    path: string;
    category: any;
    action: any;
    title: any;
    value: any;
}
