import { GettingStarted } from './getting-started';

export class GettingStartedLogin {
  private gs: GettingStarted;

  private hideEvery10min: boolean = true;
  private hideTimeout: any;

  public bind(bindingContext: any) {
    if (bindingContext instanceof GettingStarted) {
      this.gs = bindingContext;
    }
  }

  public attached() {
    // this.hideEvery10min = true;
    // this.hideTimeout = setInterval(() => {
    //   this.hideEvery10min = false;
    //   setTimeout(() => {
    //     this.hideEvery10min = true;
    //     clearInterval(this.hideTimeout);
    //   }, 1000);
    //   const element = document.createElement('input');
    //   element.
    // }, 5000);
  }

  public detached() {
    clearInterval(this.hideTimeout);
  }
}