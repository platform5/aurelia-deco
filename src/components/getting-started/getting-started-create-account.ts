import { GettingStarted } from './getting-started';

export class GettingStartedCreateAccount {
  private gs: GettingStarted;

  bind(bindingContext: any) {
    if (bindingContext instanceof GettingStarted) {
      this.gs = bindingContext;
    }
  }
}