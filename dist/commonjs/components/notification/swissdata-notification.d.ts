import { EventAggregator } from 'aurelia-event-aggregator';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { SwissdataNotificationTheme } from './swissdata-notification-theme';
export declare class SwissdataNotification implements UxComponent {
    element: HTMLElement;
    private styleEngine;
    private eventAggregator;
    theme: SwissdataNotificationTheme;
    handlerId: string;
    catchAll: boolean;
    display: 'popup' | 'inline';
    currentNotifications: Array<Notification>;
    constructor(element: HTMLElement, styleEngine: StyleEngine, eventAggregator: EventAggregator);
    bind(): void;
    attached(): void;
    themeChanged(newValue: any): void;
    interceptNow(notification: Notification): void;
    interceptLater(notification: Notification): void;
    removeNotification(notification: Notification): void;
    clickOnNotification(notification: Notification): void;
}
export interface ErrorHandlerOptions {
    lifetime?: number;
    hideOnClick?: boolean;
    clearHandlerWhenIntercepted?: boolean;
    enableTranslation?: boolean;
}
export declare function notifier(handlerId?: string, options?: ErrorHandlerOptions): (title: string, message: string, type?: 'info' | 'confirmation' | 'error' | 'warning') => void;
export declare function errorHandler(handlerId?: string, options?: ErrorHandlerOptions): (error: Error) => void;
export declare class Notification {
    type: 'error' | 'warning' | 'info' | 'confirmation';
    handlerDestination: string;
    title: string;
    message: string;
    lifetime: number;
    hideOnClick: boolean;
    intercepted: boolean;
    clearHandlerWhenIntercepted: boolean;
    constructor(type: 'error' | 'warning' | 'info' | 'confirmation', handlerDesination?: string);
}
