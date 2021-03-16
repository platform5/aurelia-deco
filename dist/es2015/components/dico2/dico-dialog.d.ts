import { UxModalServiceResult, UxModalService } from '@aurelia-ux/modal';
import { DicoModel } from '../../models';
import { SwissdataGlobal } from './../../helpers/swissdata-global';
import { Container } from 'aurelia-framework';
export declare class DicoDialog {
    private container;
    private modalService;
    mode: 'create' | 'edit';
    dico: DicoModel;
    languages: Array<string>;
    global: SwissdataGlobal;
    constructor(container: Container, modalService: UxModalService);
    activate(params: any): Promise<void>;
    canDeactivate(result: UxModalServiceResult): Promise<any>;
    save(): Promise<DicoModel>;
    remove(): Promise<void>;
}
