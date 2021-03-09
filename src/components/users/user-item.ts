import { SwissdataGlobal } from './../../helpers/swissdata-global';
import { Container } from 'aurelia-framework';
import { UserModel } from './../../models/user.model';
import { inject, bindable } from 'aurelia-framework';

@inject(Container)
export class UserItem {
  @bindable public userId: string;
  @bindable public user?: UserModel;

  constructor(private container: Container) {}

  public bind() {
    delete this.user;
    this.userIdChanged();
  }
  
  public async userIdChanged() {
    const global = this.container.get('sd-global') as SwissdataGlobal;
    if (this.userId) {
      delete this.user;
      const user = await global.ensureUsers.get(this.userId);
      this.user = user as unknown as UserModel;
    }
  }
}