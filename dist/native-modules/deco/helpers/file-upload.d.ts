import { StringAnyMap } from 'aurelia-resources';
export interface UxFileItem {
    name: string;
    filename?: string;
    type: string;
    previewData?: string;
    toUpload?: boolean;
    previews?: StringAnyMap;
    blobs?: StringAnyMap;
}
export declare class FileUpload {
    static generatePreviews(files: Array<UxFileItem>, formats?: string[], defaultPreviewFormat?: string, quality?: number): Promise<any[]>;
    static generateImagePreviews(file: any, formats?: string[], defaultPreviewFormat?: string, quality?: number): Promise<any>;
}
