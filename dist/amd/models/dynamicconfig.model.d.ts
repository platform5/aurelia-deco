import { Model, PropertyValidation } from '../deco';
export declare class DynamicConfigField {
    name: string;
    type: 'any' | 'string' | 'integer' | 'select' | 'float' | 'boolean' | 'date' | 'array' | 'object' | 'file' | 'files' | 'model' | 'models';
    options: any;
    validation: Array<PropertyValidation>;
    required: boolean;
    filterable: 'no' | 'auto' | 'equal' | 'number' | 'text' | 'categories' | 'tags' | 'date' | 'id' | 'ids' | 'boolean';
    searchable: boolean;
    sortable: boolean;
}
export interface DynamicConfigFieldEditable extends DynamicConfigField {
    onlySlug?: boolean;
    onlyEmail?: boolean;
}
export declare class DynamicConfigModel extends Model {
    id: string;
    relatedToAppId: string;
    name: string;
    slug: string;
    label: string;
    isPublic: boolean;
    readingAccess: string;
    readingRoles: Array<string>;
    writingAccess: string;
    writingRoles: Array<string>;
    fields: Array<DynamicConfigFieldEditable>;
    enableAdminNotification: boolean;
    enableUserNotification: boolean;
    notificationType: 'email';
    notifyWhen: 'create' | 'edit' | 'delete';
    notificationAdminEmail: string;
    notificationAdminSubject: string;
    notificationAdminContentPrefix: string;
    notificationAdminContentSuffix: string;
    notificationAdminTemplate: string;
    notificationUserField: string;
    notificationUserSubject: string;
    notificationUserContentPrefix: string;
    notificationUserContentSuffix: string;
    notificationUserTemplate: string;
    policy: any;
    get _label(): string;
}
