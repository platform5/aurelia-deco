export interface PropertyForm {
    type: string;
    options: any;
}
export declare function addTargetFormDecoration(target: any, type: string, key: string | number | symbol, options?: {}): void;
export declare const hint: (hintText?: string) => <T>(target: T, key: keyof T, descriptor?: PropertyDescriptor) => void | any;
export declare const label: (labelText?: string) => <T>(target: T, key: keyof T, descriptor?: PropertyDescriptor) => void | any;
