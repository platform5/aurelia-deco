import { inject, bindable } from 'aurelia-framework';
import { getLogger, Logger } from 'aurelia-logging';
import { Model } from './../decorators/model';


@inject(Element)
export class AdImages {    

  private log: Logger;
  @bindable instance: Model;
  @bindable property: string;
  @bindable w: number = 300;
  @bindable h: number = 300;
  @bindable hardsize: boolean = false;
  @bindable src: string = '';
  @bindable invisibleBeforeLoading: boolean = true;
  @bindable clickNavigation: boolean = true;
  @bindable showBullets: boolean = true;
  @bindable showNavigation: boolean = true;
  @bindable internalResize = true;
  
  private activeIndex: number = 0;
  private handleClick: EventListenerOrEventListenerObject;
  private handleTouchStart: EventListenerOrEventListenerObject;
  private handleTouchMove: EventListenerOrEventListenerObject;
  private handleTouchStop: EventListenerOrEventListenerObject;

  private xtouchstart: any;
  private xtouchmove: any;
  private ytouchstart: any;
  private ytouchmove: any;
  private xmove: any;
  private longtouch: any;
  private longtouchTimeout: any;


  constructor(private element: HTMLElement) {
    this.log = getLogger('comp:ad-images');
    this.handleClick = (event: any) => {
      if (!this.clickNavigation) return;
      let clickX = event.offsetX;
      let w = this.element.offsetWidth;
      if (clickX / w < 0.5) {
        // click left
        this.left();
      } else {
        // click right
        this.right();
      }
    };
    this.handleTouchStart = (event: any) => {
      this.xmove = 0;
      this.xtouchstart = event.touches[0].pageX;
      this.ytouchstart = event.touches[0].pageY;
      this.longtouch = false;
      if (this.longtouchTimeout) clearTimeout(this.longtouchTimeout);
      this.longtouchTimeout = setTimeout(() => {
        this.longtouch = true;
        this.longtouchTimeout = null;
      }, 350);
    };
    this.handleTouchMove = (event: any) => {
      this.xtouchmove = event.touches[0].pageX;
      this.ytouchmove = event.touches[0].pageY;
      this.xmove = this.xtouchstart - this.xtouchmove;
    };
    this.handleTouchStop = (event: any) => {
      let ymove = Math.abs(this.ytouchstart - this.ytouchmove);
      let xmove = Math.abs(this.xmove);
      let ratio = xmove / ymove;
      
      if (ratio > 5 && this.xmove > 100 && !this.longtouch) {
        this.right();
      }
      if (ratio > 5 && this.xmove < 100 && !this.longtouch) {
        this.left();
      }
    };
  }

  attached() {
    this.element.addEventListener('click', this.handleClick);
    this.element.addEventListener('touchstart', this.handleTouchStart);
    this.element.addEventListener('touchmove', this.handleTouchMove);
    this.element.addEventListener('touchend', this.handleTouchStop);
  }
  
  detached() {
    this.element.removeEventListener('click', this.handleClick);
    this.element.removeEventListener('touchstart', this.handleTouchStart);
    this.element.removeEventListener('touchmove', this.handleTouchMove);
    this.element.removeEventListener('touchend', this.handleTouchStop);
  }

  makeActive(index: number, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.activeIndex = index;
  }

  right(event?: MouseEvent) {
    console.log('click right');
    if (event) {
      event.stopPropagation();
    }
    if (this.activeIndex < this.instance[this.property].length - 1) this.activeIndex++;
  }

  left(event?: MouseEvent) {
    console.log('click left');
    if (event) {
      event.stopPropagation();
    }
    if (this.activeIndex > 0) this.activeIndex--;
  }



}
