import {inject, containerless} from 'aurelia-framework';
import { getLogger, Logger } from 'aurelia-logging';
//import { DOM } from 'aurelia-pal';

@inject(Element)
export class TourStep {    

  private log: Logger;

  constructor(public element: Element) {
    this.log = getLogger('comp:tour-step');
  }

  attached() {
    
  }

  //clickExemple(event) {
  //  event.stopPropagation();
  //  let event = DOM.createCustomEvent('click-item', {detail: this.element});
  //  this.element.dispatchEvent(event);
  //}
}
