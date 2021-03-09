import { GettingStarted } from './getting-started';

export class GettingStartedAccountsList {
  private gs: GettingStarted;

  bind(bindingContext: any) {
    if (bindingContext instanceof GettingStarted) {
      this.gs = bindingContext;
    }
  }
}