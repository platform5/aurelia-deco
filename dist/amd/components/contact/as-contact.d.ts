import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { AsContactTheme } from './as-contact-theme';
import { EventAggregator } from 'aurelia-event-aggregator';
import { DynamicDataModel } from '../../models';
export declare class AsContact implements UxComponent {
    private element;
    styleEngine: StyleEngine;
    private eventAggregator;
    theme: AsContactTheme;
    modelSlug: string;
    includeProperties: Array<string>;
    excludeProperties: Array<string>;
    success: string;
    showSuccess: boolean;
    defaultValues: {
        [key: string]: any;
    };
    instance: DynamicDataModel;
    private log;
    sending: boolean;
    constructor(element: HTMLElement, styleEngine: StyleEngine, eventAggregator: EventAggregator);
    bind(): void;
    attached(): void;
    detached(): void;
    sendingChanged(): void;
    themeChanged(newValue: any): void;
    modelSlugChanged(): void;
    send(): void;
    initInstance(): void;
    private hasIncludeProperties;
    private hasExcludeProperties;
    get properties(): Array<string>;
    saved(): void;
    savingError(event: any): void;
}
