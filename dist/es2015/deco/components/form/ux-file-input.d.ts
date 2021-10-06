import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxFileInputTheme } from './ux-file-input-theme';
import { UxFileItem } from '../../helpers/file-upload';
export interface UxInputElement extends HTMLElement {
    value: any;
}
export interface UxFileItemArray<T> extends Array<T> {
    removedFiles?: Array<UxFileItem>;
}
export declare class UxFileInput implements UxComponent {
    element: UxInputElement;
    styleEngine: StyleEngine;
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
    rawValue: string;
    focused: boolean;
    inputbox: HTMLInputElement;
    inputform: HTMLFormElement;
    canEdit: boolean;
    canRemoveBg: boolean;
    selectedFiles: Array<UxFileItem>;
    constructor(element: UxInputElement, styleEngine: StyleEngine);
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
    static removeBG: (files: UxFileItemArray<UxFileItem>, index: number) => Promise<void>;
    removebg(index: number): Promise<void>;
}
