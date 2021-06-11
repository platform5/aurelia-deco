import { ImageHelpers } from 'aurelia-resources';
import { bindable, inject, observable, computedFrom, BindingEngine, Disposable } from 'aurelia-framework';
import { Model } from '../decorators/model';

@inject(Element, BindingEngine)
export class AdImage {

  @bindable instance: Model;
  @bindable property: string;
  @bindable fileId: string = 'first';
  @bindable w: number = 300;
  @bindable h: number = 300;
  @bindable src: string = '';
  @bindable invisibleBeforeLoading: boolean = true;
  @bindable hardsize: boolean = false;
  @bindable internalResize = true;

  @observable format: string;
  private originalSrc: string = '';

  private observerSubscription: Disposable;
  private observerSubscription2: Disposable;

  constructor(private element: Element, private bindingEngine: BindingEngine) {
    if (element.tagName === 'AD-IMAGE') {
      throw new Error('cannot use <ad-image>. use <img as-element="ad-image">.');
    }
    
    if (element.tagName === 'COMPOSE') {
      throw new Error('cannot use <compose view-model="ad-image">. use <img as-element="compose" view-model="ad-image">.');
    }
  }

  hardsizeChanged() {
    if (!this.hardsize) {
      this.element.removeAttribute('width');
      this.element.removeAttribute('height');
    } else {
      if (this.w) {
        this.element.setAttribute('width', this.w.toString());
      } else {
        this.element.removeAttribute('width');
      }
      if (this.h) {
        this.element.setAttribute('height', this.h.toString());
      } else {
        this.element.removeAttribute('height');
      }
    }
  }

  detached() {
    if (this.observerSubscription) this.observerSubscription.dispose();
    if (this.observerSubscription2) this.observerSubscription2.dispose();
  }

  bind() {
    this.originalSrc = this.src;
    let format = this.format;
    this.setFormat();
    this.hardsizeChanged();
    if (this.format === format) {
      // format has not changed, call this.getSrc manually
      this.getSrc();
    }
    this.observeProperty();
  }
  
  instanceChanged() {
    this.getSrc();
    this.observeProperty();
  }
  
  propertyChanged() {
    this.getSrc();
    this.observeProperty();
  }

  fileIdChanged() {
    this.getSrc();
    this.observeProperty();
  }

  wChanged() {
    if (typeof this.w === 'string') this.w = parseInt(this.w);
    else this.setFormat();
    this.hardsizeChanged();
  }
  
  hChanged() {
    if (typeof this.h === 'string') this.h = parseInt(this.h);
    else this.setFormat();
    this.hardsizeChanged();
  }


  attached() {
    this.element.classList.add('ad-image');
    if (this.invisibleBeforeLoading) {
      this.element.classList.add('animate-opacity');
      this.element.classList.add('invisible');
    } else {
      // this.element.classList.remove('animate-opacity');
    }
  }

  setFormat() {
    let w = this.w ? this.w.toString() : '';
    let h = this.h ? this.h.toString() : '';
    if (w && h) {
      this.format = `${w}:${h}`;
    } else if (w) {
      this.format = w;
    } else if (h) {
      this.format = `:${h}`;
    } else {
      this.format = '';
    }
  }

  formatChanged() {
    this.getSrc();
  }

  _preventMultipleRequests = false;
  _requestedImage: string;
  
  private async getSrc() {
    if (this._preventMultipleRequests) {
      setTimeout(() => {
        this.getSrc();
      }, 100);
      return;
    }
    this._preventMultipleRequests = true;
    await new Promise(r => setTimeout(r, 10));
    if (!this.instance) return this.setOriginal();
    let rightInstance = this.instance instanceof Model;
    if (!rightInstance) return this.setOriginal();
    if (!this.property) return this.setOriginal();
    if (!this.instance[this.property]) return this.setOriginal();
    let propValue = this.instance[this.property];
    let filename: string;
    if (Array.isArray(propValue)) {
      if (propValue.length === 0) return this.setOriginal();
      // we have a multiple files property
      if (this.fileId === 'first') {
        filename = this.instance[this.property][0].filename || '';
      } else {
        filename = this.fileId;
      }
    } else {
      // we have a single file property
      filename = this.instance[this.property].filename || '';
    }
    if (this._requestedImage === this.instance.id + '-' + this.property + '-' + this.format + '-' + filename) {
      // ignore this, we already just previously requested this image
      this.removeInvisible()
      // this.element.classList.remove('animate-opacity');
      this._preventMultipleRequests = false;
      return;
    }
    this._requestedImage = this.instance.id + '-' + this.property + '-' + this.format + '-' + filename;

    try {
      const url = this.internalResize
      ? await this.instance.getFilePreview(this.property, this.format, {fileId: filename}).then((blob) => {
          if (blob.type.substr(0, 6) !== 'image/') throw new Error('Invalid Blob Type:' + blob.type);
          return ImageHelpers.open(blob);
        }).then((image) => {
          console.log('image.mimetype', image.mimetype);
          if (this.w && this.h) {
            image.cover(this.w, this.h);
          } else if (this.w) {
            image.resize(this.w, ImageHelpers.AUTO);
          } else if (this.h) {
            image.resize(ImageHelpers.AUTO, this.h);
          }
          //image.cover(300, 300);
          return image.toDataUrl();
        })
      : await this.instance.getFilePreviewUrl(this.property, this.format, {fileId: filename});

      this.src = url;
      this._preventMultipleRequests = false;
      this.removeInvisible()
      // this.element.classList.remove('animate-opacity');
    } catch (error) {
      console.error(error);
      this.setOriginal();
      this._preventMultipleRequests = false;
    };
  }

  setOriginal() {
    this.src = this.originalSrc;
    this.removeInvisible();
    // this.element.classList.remove('animate-opacity');
    this._requestedImage = '';
    this._preventMultipleRequests = false;
  }
  
  srcChanged() {
    this.element.setAttribute('src', this.src);
  }

  private async removeInvisible() {
    await new Promise(r => setTimeout(r, 10));
    this.element.classList.remove('invisible');
  }

  observeProperty() {
    if (this.observerSubscription) this.observerSubscription.dispose();
    if (this.observerSubscription2) this.observerSubscription2.dispose();
    
    this.observerSubscription = this.bindingEngine.propertyObserver(this.instance, this.property).subscribe(() => {
      this.getSrc();
    });

    if (this.instance[this.property] && typeof this.instance[this.property] === 'object' && this.instance[this.property].filename) {
      // if the value is set with a filename, we also want to observer this property
      this.observerSubscription = this.bindingEngine.propertyObserver(this.instance[this.property], 'filename').subscribe(() => {
        this.getSrc();
      });
    }
    
  }

}
