System.register(["aurelia-templating", "aurelia-binding", "aurelia-dependency-injection", "@aurelia-ux/core", "aurelia-logging", "../../helpers/file-upload"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var aurelia_templating_1, aurelia_binding_1, aurelia_dependency_injection_1, core_1, aurelia_logging_1, file_upload_1, log, UxFileInput;
    var __moduleName = context_1 && context_1.id;
    function stopEvent(e) {
        e.stopPropagation();
    }
    return {
        setters: [
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            },
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            },
            function (file_upload_1_1) {
                file_upload_1 = file_upload_1_1;
            }
        ],
        execute: function () {
            log = aurelia_logging_1.getLogger('ux-file-input');
            UxFileInput = /** @class */ (function () {
                function UxFileInput(element, styleEngine) {
                    this.element = element;
                    this.styleEngine = styleEngine;
                    this.autofocus = null;
                    this.disabled = false;
                    this.multiple = false;
                    this.readonly = false;
                    this.buttonLabel = 'Select File';
                    this.files = []; // hold files for multiple files input
                    this.previewsFormats = [];
                    this.defaultPreview = '';
                    this.rawValue = '';
                    this.focused = false;
                    this.canEdit = false;
                    this.selectedFiles = [];
                }
                UxFileInput.prototype.bind = function () {
                    var element = this.element;
                    var inputbox = this.inputbox;
                    if (this.autofocus || this.autofocus === '') {
                        this.focused = true;
                    }
                    if (element.hasAttribute('placeholder')) {
                        var attributeValue = element.getAttribute('placeholder');
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
                };
                UxFileInput.prototype.readonlyChanged = function () {
                    this.determineCanEdit();
                };
                UxFileInput.prototype.disabledChanged = function () {
                    this.determineCanEdit();
                };
                UxFileInput.prototype.determineCanEdit = function () {
                    if (this.readonly || this.readonly === '') {
                        this.canEdit = false;
                    }
                    else if (this.disabled || this.disabled === '') {
                        this.canEdit = false;
                    }
                    else {
                        this.canEdit = true;
                    }
                };
                UxFileInput.prototype.attached = function () {
                    this.inputbox.addEventListener('change', stopEvent);
                    this.inputbox.addEventListener('input', stopEvent);
                };
                UxFileInput.prototype.detached = function () {
                    this.inputbox.removeEventListener('change', stopEvent);
                    this.inputbox.removeEventListener('input', stopEvent);
                };
                UxFileInput.prototype.selectFile = function () {
                    this.inputbox.click();
                };
                UxFileInput.prototype.themeChanged = function (newValue) {
                    if (newValue != null && newValue.themeKey == null) {
                        newValue.themeKey = 'input-file';
                    }
                    this.styleEngine.applyTheme(newValue, this.element);
                };
                UxFileInput.prototype.rawValueChanged = function (newValue) {
                    if (this.inputbox && this.inputbox.files)
                        this.addFiles();
                };
                UxFileInput.prototype.addFiles = function () {
                    var _this = this;
                    var newFiles = [];
                    for (var index = 0; index < this.inputbox.files.length; index++) {
                        var file = this.inputbox.files.item(index);
                        newFiles.push(file);
                    }
                    if (!this.multiple)
                        newFiles.slice(0, 1);
                    file_upload_1.FileUpload.generatePreviews(newFiles, this.previewsFormats, this.defaultPreview).then(function () {
                        var form = new FormData();
                        for (var _i = 0, newFiles_1 = newFiles; _i < newFiles_1.length; _i++) {
                            var file = newFiles_1[_i];
                            file.toUpload = true;
                            form.append('image', file, file.name);
                            if (_this.multiple) {
                                if (_this.files === null || _this.files === undefined)
                                    _this.files = [file];
                                else
                                    _this.files.push(file);
                            }
                            else {
                                _this.file = file;
                            }
                        }
                    });
                    this.inputform.reset();
                };
                UxFileInput.prototype.removeFile = function (file) {
                    var _this = this;
                    if (!this.multiple) {
                        this.file = null;
                        return;
                    }
                    var removedFile;
                    if (typeof file === 'number') {
                        removedFile = this.files.splice(file, 1)[0];
                        if (removedFile && removedFile.toUpload !== true) {
                            if (!this.files.removedFiles)
                                this.files.removedFiles = [];
                            this.files.removedFiles.push(removedFile);
                        }
                    }
                    else {
                        var index = this.files.indexOf(file);
                        var tmpFiles_1 = JSON.parse(JSON.stringify(this.files));
                        var tmpRemovedFiles_1 = this.files.removedFiles;
                        removedFile = tmpFiles_1.splice(index, 1)[0];
                        if (removedFile && removedFile.toUpload !== true) {
                            if (!tmpRemovedFiles_1)
                                tmpRemovedFiles_1 = [];
                            tmpRemovedFiles_1.push(removedFile);
                        }
                        setTimeout(function () {
                            var newFiles = [];
                            for (var _i = 0, _a = tmpFiles_1; _i < _a.length; _i++) {
                                var file_1 = _a[_i];
                                newFiles.push(file_1);
                            }
                            _this.files = newFiles;
                            _this.files.removedFiles = tmpRemovedFiles_1;
                        }, 10);
                    }
                };
                __decorate([
                    aurelia_templating_1.bindable
                ], UxFileInput.prototype, "autofocus", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxFileInput.prototype, "disabled", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxFileInput.prototype, "accept", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxFileInput.prototype, "multiple", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxFileInput.prototype, "readonly", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxFileInput.prototype, "theme", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxFileInput.prototype, "buttonLabel", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxFileInput.prototype, "file", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxFileInput.prototype, "files", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxFileInput.prototype, "previewsFormats", void 0);
                __decorate([
                    aurelia_templating_1.bindable
                ], UxFileInput.prototype, "defaultPreview", void 0);
                __decorate([
                    aurelia_binding_1.observable
                ], UxFileInput.prototype, "rawValue", void 0);
                __decorate([
                    aurelia_binding_1.observable
                ], UxFileInput.prototype, "focused", void 0);
                __decorate([
                    aurelia_binding_1.observable
                ], UxFileInput.prototype, "selectedFiles", void 0);
                UxFileInput = __decorate([
                    aurelia_dependency_injection_1.inject(Element, core_1.StyleEngine),
                    aurelia_templating_1.customElement('ux-file-input')
                ], UxFileInput);
                return UxFileInput;
            }());
            exports_1("UxFileInput", UxFileInput);
        }
    };
});
