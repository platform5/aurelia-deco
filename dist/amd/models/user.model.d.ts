import { Model } from '../deco';
export declare class UserModel extends Model {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    emailValidated: boolean;
    mobile: string;
    mobileValidated: boolean;
    requireDoubleAuth: boolean;
    roles: Array<string>;
    hideOnboarding: boolean;
    createAccount(options?: any): Promise<any>;
    validAccountCreationToken(method: 'email' | 'mobile', token: string, code: string): Promise<any>;
    get _label(): string;
}
