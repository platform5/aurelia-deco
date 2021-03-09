import { GettingStarted } from './getting-started';

export class GettingStartedValidateAccount {
  private gs: GettingStarted;

  bind(bindingContext: any) {
    if (bindingContext instanceof GettingStarted) {
      this.gs = bindingContext;
    }
  }
}