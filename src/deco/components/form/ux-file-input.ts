import { customElement, bindable } from 'aurelia-templating';
import { observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxFileInputTheme } from './ux-file-input-theme';
import { errorify } from 'aurelia-resources';
import { getLogger, Logger } from 'aurelia-logging';
import { FileUpload, UxFileItem } from '../../helpers/file-upload';
import { DecoApi } from '../../helpers/deco-api';
import { Model } from '../../decorators/model';

let log: Logger;
log = getLogger('ux-file-input');



export interface UxInputElement extends HTMLElement {
    value: any;
}

export interface UxFileItemArray<T> extends Array<T> {
  removedFiles?: Array<UxFileItem>;
  sortFiles?: Array<UxFileItem>;
}

@inject(Element, StyleEngine, DecoApi)
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

    @bindable public imageExportQuality = 0.6;

    @bindable public instance? : Model; // Optionnal
    @bindable public property? : string; // Optionnal

    @observable
    public rawValue: string = '';

    @observable
    public focused: boolean = false;

    //public value: any = undefined;
    public activeSort: boolean = false;
    public inputbox: HTMLInputElement;
    public inputform: HTMLFormElement;
    public canEdit: boolean = false;
    public credits: string = '-1';
    @bindable public canRemoveBg: boolean = false;

    @observable public selectedFiles: Array < UxFileItem > = [];

    constructor(public element: UxInputElement, public styleEngine: StyleEngine, private api: DecoApi) {
    }
    
    public bind() {
      const element = this.element;
      const inputbox = this.inputbox;
      this.activeSort = true;

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

    public disabledChanged()  {
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
       this.activeSort = false;
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
      FileUpload.generatePreviews(newFiles, this.previewsFormats, this.defaultPreview, this.imageExportQuality).then(() => {
        let form = new FormData();
        for (let file of newFiles) {
          file.toUpload = true;
          form.append('image', (file as File), file.name);
          if (this.multiple) {
            if (this.files === null || this.files === undefined) this.files = [file];
            else this.files.push(file);
          } else {
            this.file = file;
          }
        }
      })
      this.inputform.reset();
    }

    public removeFile(file: Number |  UxFileItem) {

      this.activeSort = false; // disable sorting if remove file

      if (!this.multiple) {
        this.file = null;
        return;
      }
      let removedFile:  UxFileItem;
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

    private removingBackground = false;
    public async removebg(index: number): Promise<void> {
      if (this.removingBackground) {
        return;
      }
      this.removingBackground = true;
      const file = this.multiple ? this.files[index] : this.file;
      try {
        // 1. Envoyer l'image original pour que le fond soit remplacé
        const formData = new FormData();
        formData.append('file', file as File, file.name);
        const response = await this.api.post('/remove-bg', formData, {bodyFormat: 'FormData'});
        this.credits = response.headers.get("X-Credits");

        // 2. Set the replaced value
        const replaced = await response.blob();
        file.replaced = replaced;
      
        // 3. Regenerate the previews
        const gFiles = [file];
        file.previewData = '';
        file.previews = {};
        file.blobs = {};
        await FileUpload.generatePreviews(gFiles, this.previewsFormats, this.defaultPreview, this.imageExportQuality);
      } catch (error) {
        errorify(error);
      }
      this.removingBackground = false;
      this.activeSort = false; // disable sorting if remove background
    }

    public async downloadFile(index : number) {
      try {
        let tmpFiles = JSON.parse(JSON.stringify(this.files));
        const file : UxFileItem = tmpFiles[index];
        await this.instance.getUxFileData(this.property, file).then((blob) => {
            return blob;
          }).then((f) => {
            let objectURL: string;
            if (objectURL) {
              window.URL.revokeObjectURL(objectURL);
            }
               this.api.get(file.filename).then((response: Response) => {
              return response.arrayBuffer();
            }).then((buffer) => {
              let fileBuffer = new File([buffer], file.name, {type: file.type});
              objectURL = window.URL.createObjectURL(fileBuffer);
        
              let link = document.createElement('a');
              link.setAttribute('href', objectURL);
              link.setAttribute('download', file.name);
              link.click();
            }).catch(errorify);
            return f
          })
      } catch (error) {
        console.error(error);
      };
    }

    public topList(index : number) {
      for (let i = 0; i < this.files.length; i++) {
        this.files[i].index = i;
      }
      let tmpFiles = JSON.parse(JSON.stringify(this.files)) as UxFileItemArray<UxFileItem>;
      setTimeout(() => {
        let newFiles: UxFileItemArray<UxFileItem> = [];
        let i : number = 0;
        for (let file of (tmpFiles as UxFileItemArray<UxFileItem>)) {
            if (i == index && i != 0){
              file.index = i - 1;
            }
            else if (i == index - 1 && index - 1 >= 0) {
              file.index = i + 1;
            }
            else {
            }
          newFiles.push(file);
          i++;
        }
        newFiles.sort(function (a, b) {
          return a.index - b.index;
        });
        this.files = newFiles;
        this.files.sortFiles = newFiles;
      }, 10);
    }



  }
  
  export class SortValueConverter {
    toView(array, propertyName, direction) {
      console.log('sort',propertyName );

        var factor = direction === 'ascending' ? 1 : -1;
        if (array && array.length != 0){
          return array.slice(0).sort((a, b) => {
              return (a[propertyName] - b[propertyName]) * factor;
          });
        }
        else {
          return array;
        }
    }
} 

function stopEvent(e: Event) {
  e.stopPropagation();
}
