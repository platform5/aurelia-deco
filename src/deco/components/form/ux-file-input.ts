import { customElement, bindable } from 'aurelia-templating';
import { observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxFileInputTheme } from './ux-file-input-theme';
import { ImageHelpers } from 'aurelia-resources';
import { getLogger, Logger } from 'aurelia-logging';
import { FileUpload, UxFileItem } from '../../helpers/file-upload';


let log: Logger;
log = getLogger('ux-file-input');



export interface UxInputElement extends HTMLElement {
    value: any;
}

export interface UxFileItemArray<T> extends Array<T> {
  removedFiles?: Array<UxFileItem>;
}

@inject(Element, StyleEngine)
@customElement('ux-file-input')
export class UxFileInput implements UxComponent {
    @bindable public autofocus = null;
    @bindable public disabled: any = false;

    @bindable public accept: string;
    @bindable public multiple: any = false;

    @bindable public readonly: any = false;
    @bindable public theme: UxFileInputTheme;

    @bindable public buttonLabel: string = 'Select File';
    @bindable public file: UxFileItem | null; // hold file for single file input
    @bindable public files: UxFileItemArray < UxFileItem > = []; // hold files for multiple files input

    @bindable public previewsFormats: Array<string> = [];
    @bindable public defaultPreview: string = '';

    @observable
    public rawValue: string = '';

    @observable
    public focused: boolean = false;

    //public value: any = undefined;
    public inputbox: HTMLInputElement;
    public inputform: HTMLFormElement;
    public canEdit: boolean = false;

    @observable public selectedFiles: Array < UxFileItem > = [];

    constructor(public element: UxInputElement, public styleEngine: StyleEngine) {
    }
    
    public bind() {
      const element = this.element;
      const inputbox = this.inputbox;

      if (this.autofocus || this.autofocus === '') {
        this.focused = true;
      }

      if (element.hasAttribute('placeholder')) {
        const attributeValue = element.getAttribute('placeholder');

        if (attributeValue) {
          inputbox.setAttribute('placeholder', attributeValue);
          element.removeAttribute('placeholder');
        }
      }

      if (this.accept) {
        inputbox.setAttribute('accept', this.accept.toString());
      }

      this.themeChanged(this.theme);
      this.determineCanEdit();
    }

    public readonlyChanged() {
        this.determineCanEdit();
    }

    public disabledChanged()  {
        this.determineCanEdit();
    }

    private determineCanEdit() {
        if (this.readonly || this.readonly === '') {
            this.canEdit = false;
        } else if (this.disabled || this.disabled === '') {
            this.canEdit = false;
        } else {
            this.canEdit = true;
        }
    }

    public attached() {
        this.inputbox.addEventListener('change', stopEvent);
        this.inputbox.addEventListener('input', stopEvent);
    }

    public detached() {
        this.inputbox.removeEventListener('change', stopEvent);
        this.inputbox.removeEventListener('input', stopEvent);
    }

    public selectFile() {
        this.inputbox.click();
    }

    public themeChanged(newValue: any) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'input-file';
        }

        this.styleEngine.applyTheme(newValue, this.element);
    }

    public rawValueChanged(newValue: any) {
        if (this.inputbox && this.inputbox.files) this.addFiles();
    }

    private addFiles() {
      let newFiles: Array<UxFileItem> = [];
      for (let index = 0; index < this.inputbox.files.length; index++) {
          const file: UxFileItem = this.inputbox.files.item(index);
          newFiles.push(file);
      }
      if (!this.multiple) newFiles.slice(0, 1);
      FileUpload.generatePreviews(newFiles, this.previewsFormats, this.defaultPreview).then(() => {
        let form = new FormData();
        for (let file of newFiles) {
          file.toUpload = true;
          form.append('image', (file as File), file.name);
          if (this.multiple) {
            if (this.files === null || this.files === undefined) this.files = [file];
            else this.files.push(file);
          } else {
            this.file = file;
          }
        }
      })
      this.inputform.reset();
    }

    public removeFile(file: Number |  UxFileItem) {
      if (!this.multiple) {
        this.file = null;
        return;
      }
      let removedFile:  UxFileItem;
      if (typeof file === 'number') {
        removedFile = this.files.splice(file, 1)[0];
        if (removedFile && removedFile.toUpload !== true) {
          if (!this.files.removedFiles) this.files.removedFiles = [];
          this.files.removedFiles.push(removedFile);
        }
      } else {
        let index = this.files.indexOf((file as UxFileItem));
        let tmpFiles = JSON.parse(JSON.stringify(this.files));
        let tmpRemovedFiles = this.files.removedFiles;
        removedFile = tmpFiles.splice(index, 1)[0];
        if (removedFile && removedFile.toUpload !== true) {
          if (!tmpRemovedFiles) tmpRemovedFiles = [];
          tmpRemovedFiles.push(removedFile);
        }
        setTimeout(() => {
          let newFiles: UxFileItemArray<UxFileItem> = [];
          for (let file of (tmpFiles as UxFileItemArray<UxFileItem>)) {
            newFiles.push(file);
          }
          this.files = newFiles;
          this.files.removedFiles = tmpRemovedFiles;
        }, 10);
      }
      
    }

}

function stopEvent(e: Event) {
  e.stopPropagation();
}
