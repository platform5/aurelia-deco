import { ConfirmDialog } from 'aurelia-resources';
import { UxModalServiceResult, UxModalService } from '@aurelia-ux/modal';
import { DicoModel } from '../../models';
import { errorify } from 'aurelia-resources';
import { SwissdataGlobal } from './../../helpers/swissdata-global';
import { inject, Container } from 'aurelia-framework';

@inject(Container, UxModalService)
export class DicoDialog {

  public mode: 'create' | 'edit' = 'create';
  public dico: DicoModel;
  public languages: Array<string> = ['fr', 'en', 'de', 'it'];
  public global: SwissdataGlobal;

  constructor(private container: Container, private modalService: UxModalService) {
  }

  public async activate(params: any) {
    this.global = this.container.get('sd-global');
    if (params.dico && params.dico instanceof DicoModel) {
      this.dico = await DicoModel.getOneWithId(params.dico.id, '?locale=all');
      this.mode = 'edit';
    } else {
      this.dico = new DicoModel();
      this.mode = 'create';
    }
    if (!Array.isArray(this.dico.tags)) {
      this.dico.tags = [];
    }
  }

  public async canDeactivate(result: UxModalServiceResult): Promise<any> {
    if (result.wasCancelled) {
      return true;
    }
    if (result.output === 'remove') {
      const confirm = await this.modalService.open({
        viewModel: ConfirmDialog,
        model: {title: 'Are you sure ?', text: `Remove this dico element ?`}
      })
      const confirmResult = await confirm.whenClosed();
      if (!confirmResult.wasCancelled) {
        this.remove();
      }
      return;
    }
    const validationResult = await this.dico.validationController.validate();
    if (!validationResult.valid) {
      for (let vResult of validationResult.results) {
        if (!vResult.valid) {
          errorify(new Error(vResult.message));
        }
      }
      return false;
    }
    try {
      const dico = await this.save();
      result.output = dico;
    } catch (error) {
      errorify(error);
      return false;
    }
  }

  public async save(): Promise<DicoModel> {
    let dico: DicoModel;
    if (this.mode === 'create') {
      dico = await this.dico.save();
    } else {
      dico = await this.dico.updateProperties('?locale=', Object.keys(this.dico));
    }
    return dico;
  }

  public async remove(): Promise<void> {
    if (this.mode === 'edit') {
      await this.dico.remove();
    }
  }
}
