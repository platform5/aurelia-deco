import { UxModalService } from '@aurelia-ux/modal';
import { Container } from 'aurelia-framework';
import { EnsureModel } from '../../deco/helpers/ensure-model';
import { UserModel } from '../../models/user.model';
export declare class SelectUserControl {
    private container;
    private modalService;
    ensure: EnsureModel<typeof UserModel>;
    ready: boolean;
    value: string;
    disableIds: Array<string>;
    disabled: boolean;
    constructor(container: Container, modalService: UxModalService);
    bind(): void;
    valueChanged(): void;
    openDialog(): Promise<void>;
    unselect(): void;
}
