import { bindingMode } from 'aurelia-binding';
import { UxModalService } from '@aurelia-ux/modal';
import { inject, bindable, Container } from 'aurelia-framework';
import { EnsureModel } from '../../deco/helpers/ensure-model';
import { UserModel } from '../../models/user.model';
import { SwissdataGlobal } from '../../helpers/swissdata-global';
import { SelectUser } from './select-user';

@inject(Container, UxModalService)
export class SelectUserControl{

  public ensure: EnsureModel<typeof UserModel>;
  public ready: boolean = false;
  @bindable({defaultBindingMode: bindingMode.twoWay}) public value: string;
  @bindable public disableIds: Array<string> = [];
  @bindable public disabled: boolean = false;

  constructor(private container: Container, private modalService: UxModalService) {
  }

  public bind() {
    const global = this.container.get('sd-global') as SwissdataGlobal;
    this.ensure = global.ensureUsers;
    this.valueChanged();
  }

  public valueChanged() {
    this.ready = false;
    if (this.value) {
      this.ensure.get(this.value).then(() => {
        this.ready = true;
      });
    }
  }

  public async openDialog() {
    if (this.disabled) {
      return;
    }
    const modal = await this.modalService.open({
      viewModel: SelectUser,
      model: {value: this.value, disableIds: this.disableIds},
      position: 'bottom'
    });
    modal.whenClosed().then((result) => {
      if (!result.wasCancelled && result.output) {
        this.value = result.output;
      }
    });
  }

  public unselect() {
    if (this.disabled) {
      return;
    }
    this.value = '';
  }
}
