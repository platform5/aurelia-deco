import { StyleEngine, UxInputComponent } from '@aurelia-ux/core';
import { AdSelectorTheme } from './ad-selector-theme';
import { DialogService } from 'aurelia-dialog';
import { DecoApi } from '../helpers/deco-api';
import '@aurelia-ux/core/components/ux-input-component.css';
import '@aurelia-ux/core/components/ux-input-component--outline.css';
import { TaskQueue } from 'aurelia-framework';
export interface UxSelectorElement extends HTMLElement {
    value: any;
}
export declare class AdLangSelector implements UxInputComponent {
    private element;
    styleEngine: StyleEngine;
    private dialogService;
    private deco;
    private taskQueue;
    disabled: any;
    readonly: any;
    theme: AdSelectorTheme;
    label: string;
    placeholder: string;
    variant: 'filled' | 'outline';
    dense: any;
    languages: Array<string>;
    prefix: string;
    bindToState: boolean;
    focused: boolean;
    value: string;
    constructor(element: UxSelectorElement, styleEngine: StyleEngine, dialogService: DialogService, deco: DecoApi, taskQueue: TaskQueue);
    bind(): void;
    get languagesList(): string[];
    attached(): void;
    detached(): void;
    getValue(): string;
    get displayValue(): string;
    setValue(value: any): Promise<void>;
    themeChanged(newValue: any): void;
    focusedChanged(focused: boolean): void;
    focus(): void;
    openDialog(): void;
    variantChanged(newValue: string): void;
    get placeholderMode(): boolean;
}
