import { GettingStarted } from './getting-started';

export class GettingStartedCreateAccountPart2 {
  private gs: GettingStarted;

  bind(bindingContext: any) {
    if (bindingContext instanceof GettingStarted) {
      this.gs = bindingContext;
    }
  }
}