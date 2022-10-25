import { Container } from 'aurelia-framework';
import { UserModel } from './../../models/user.model';
export declare class UserItem {
    private container;
    userId: string;
    user?: UserModel;
    constructor(container: Container);
    bind(): void;
    userIdChanged(): Promise<void>;
}
