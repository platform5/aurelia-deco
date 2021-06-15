export interface UxFileItem {
    name: string;
    filename?: string;
    type: string;
    previewData?: string;
    toUpload?: boolean;
    previews?: {
        [key: string]: any;
    };
    blobs?: {
        [key: string]: any;
    };
}
export declare class FileUpload {
    static generatePreviews(files: Array<UxFileItem>, formats?: string[], defaultPreviewFormat?: string, quality?: number): Promise<any[]>;
    static generateImagePreviews(file: any, formats?: string[], defaultPreviewFormat?: string, quality?: number): Promise<any>;
}
