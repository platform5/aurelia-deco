define(["require", "exports", "aurelia-resources"], function (require, exports, aurelia_resources_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FileUpload = void 0;
    var FileUpload = /** @class */ (function () {
        function FileUpload() {
        }
        FileUpload.generatePreviews = function (files, formats, defaultPreviewFormat, quality) {
            if (formats === void 0) { formats = ['320:320']; }
            if (defaultPreviewFormat === void 0) { defaultPreviewFormat = '320:320'; }
            if (quality === void 0) { quality = 0.6; }
            var promises = [];
            promises.push(Promise.resolve());
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                if (!file.previewData) {
                    if (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png') {
                        promises.push(FileUpload.generateImagePreviews(file, formats, defaultPreviewFormat, quality));
                    }
                    else if (file.type.substr(0, 6) === 'audio/') {
                        // tslint:disable-next-line
                        file.previewData = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill='currentColor'><path d='M12 3v9.28a4.39 4.39 0 0 0-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z'></path></svg>";
                    }
                    else {
                        //file.previewData = 'data:image/svg+xml;utf8,<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 3v9.28a4.39 4.39 0 0 0-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"></path></svg>';
                    }
                }
            }
            return Promise.all(promises);
        };
        FileUpload.generateImagePreviews = function (file, formats, defaultPreviewFormat, quality) {
            if (formats === void 0) { formats = ['320:320']; }
            if (defaultPreviewFormat === void 0) { defaultPreviewFormat = '320:320'; }
            if (quality === void 0) { quality = 0.6; }
            if (formats.length === 0)
                return Promise.resolve(file);
            if (!file.previews)
                file.previews = {};
            if (!file.blobs)
                file.blobs = {};
            return aurelia_resources_1.ImageHelpers.exifRotation(file).then(function (exifRotation) {
                var promise = Promise.resolve();
                if (exifRotation > 2) {
                    // we must rotate the original file
                    promise = aurelia_resources_1.ImageHelpers.open(file).then(function (myimage) {
                        var angle = aurelia_resources_1.ImageHelpers.exifRotation2Degrees(exifRotation);
                        myimage.rotate(angle);
                        return myimage.toBlob();
                    }).then(function (blob) {
                        file.fixedOrientationBlob = blob;
                    });
                }
                promise.then(function () {
                    return new Promise(function (resolve, reject) {
                        try {
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                var previewPromises = [];
                                var _loop_1 = function (format) {
                                    var createPreview = function (e) {
                                        return aurelia_resources_1.ImageHelpers.open(e.target.result).then(function (myimage) {
                                            myimage.exportQuality = quality;
                                            if (format.indexOf(':') !== -1) {
                                                myimage.cover(parseInt(format.split(':')[0], 10), parseInt(format.split(':')[1], 10));
                                                file.previews[format] = myimage.toDataUrl();
                                                myimage.toBlob().then(function (blob) {
                                                    file.blobs[format] = blob;
                                                });
                                            }
                                            else {
                                                myimage.resize(parseInt(format, 10), aurelia_resources_1.ImageHelpers.AUTO);
                                                myimage.toBlob().then(function (blob) {
                                                    file.blobs[format] = blob;
                                                });
                                            }
                                        });
                                    };
                                    previewPromises.push(createPreview(e));
                                };
                                for (var _i = 0, formats_1 = formats; _i < formats_1.length; _i++) {
                                    var format = formats_1[_i];
                                    _loop_1(format);
                                }
                                Promise.all(previewPromises).then(function () {
                                    if (file.previews[defaultPreviewFormat]) {
                                        file.previewData = file.previews[defaultPreviewFormat];
                                    }
                                    else {
                                        file.previewData = file.previews[Object.keys(file.previews)[0]];
                                    }
                                    resolve(file);
                                }).catch(reject);
                            };
                            var fileToRead = file.fixedOrientationBlob || file;
                            reader.readAsDataURL(fileToRead);
                        }
                        catch (e) {
                            console.error('catch', e);
                            reject(e);
                        }
                    });
                });
                return promise;
            });
        };
        return FileUpload;
    }());
    exports.FileUpload = FileUpload;
});
