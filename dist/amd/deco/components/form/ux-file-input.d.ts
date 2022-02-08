import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxFileInputTheme } from './ux-file-input-theme';
import { UxFileItem } from '../../helpers/file-upload';
import { DecoApi } from '../../helpers/deco-api';
import { Model } from '../../decorators/model';
export interface UxInputElement extends HTMLElement {
    value: any;
}
export interface UxFileItemArray<T> extends Array<T> {
    removedFiles?: Array<UxFileItem>;
    sortFiles?: Array<UxFileItem>;
}
export declare class UxFileInput implements UxComponent {
    element: UxInputElement;
    styleEngine: StyleEngine;
    private api;
    autofocus: any;
    disabled: any;
    accept: string;
    multiple: any;
    readonly: any;
    theme: UxFileInputTheme;
    buttonLabel: string;
    file: UxFileItem | null;
    files: UxFileItemArray<UxFileItem>;
    previewsFormats: Array<string>;
    defaultPreview: string;
    imageExportQuality: number;
    instance?: Model;
    property?: string;
    rawValue: string;
    focused: boolean;
    activeSort: boolean;
    inputbox: HTMLInputElement;
    inputform: HTMLFormElement;
    canEdit: boolean;
    canRemoveBg: boolean;
    selectedFiles: Array<UxFileItem>;
    constructor(element: UxInputElement, styleEngine: StyleEngine, api: DecoApi);
    bind(): void;
    readonlyChanged(): void;
    disabledChanged(): void;
    private determineCanEdit;
    attached(): void;
    detached(): void;
    selectFile(): void;
    themeChanged(newValue: any): void;
    rawValueChanged(newValue: any): void;
    private addFiles;
    removeFile(file: Number | UxFileItem): void;
    private removingBackground;
    removebg(index: number): Promise<void>;
    downloadFile(index: number): Promise<void>;
    topList(index: number): void;
}
export declare class SortValueConverter {
    toView(array: any, propertyName: any, direction: any): any;
}
