import { GettingStarted } from './getting-started';

export class GettingStartedForgotPassword {
  private gs: GettingStarted;

  bind(bindingContext: any) {
    if (bindingContext instanceof GettingStarted) {
      this.gs = bindingContext;
    }
  }
}