define(["require", "exports", "aurelia-framework", "../helpers/deco-api", "aurelia-validation", "aurelia-resources", "aurelia-logging", "moment"], function (require, exports, aurelia_framework_1, deco_api_1, aurelia_validation_1, aurelia_resources_1, aurelia_logging_1, moment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = exports.model = void 0;
    var log = aurelia_logging_1.getLogger('decorators:model');
    var defaultModelOptions = {
        enableStory: false
    };
    var model = function (baseroute, options) {
        if (options === void 0) { options = {}; }
        options = Object.assign({}, defaultModelOptions, options);
        return function (target) {
            var deco = {
                baseroute: baseroute,
                target: target,
                options: options,
                propertyTypes: target.prototype._types || {},
                propertyTypesOptions: target.prototype._typesOptions || {},
                propertyFromApiOnly: target.prototype._fromApiOnly || [],
                propertyForms: target.prototype._forms || {},
                //propertyOutputs: target.prototype._outputs || [],
                //propertyToDocuments: target.prototype._toDocuments || [],
                propertyValidations: target.prototype._validations || {},
                propertySearchables: target.prototype._searchables || [],
                propertySortables: target.prototype._sortables || [],
                propertyFilterables: target.prototype._filterables || [],
                propertyFilterablesOptions: target.prototype._filterablesOptions || {}
            };
            target.prototype._deco = deco;
        };
    };
    exports.model = model;
    var Model = /** @class */ (function () {
        function Model() {
        }
        Object.defineProperty(Model, "deco", {
            get: function () {
                return this.prototype._deco;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Model.prototype, "deco", {
            get: function () {
                return Object.getPrototypeOf(this)._deco;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Model, "api", {
            get: function () {
                return aurelia_framework_1.Container.instance.get(deco_api_1.DecoApi);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Model.prototype, "api", {
            get: function () {
                return aurelia_framework_1.Container.instance.get(deco_api_1.DecoApi);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Model, "isMultilang", {
            get: function () {
                for (var key in this.deco.propertyTypes) {
                    if (this.deco.propertyTypes[key].name === 'string') {
                        if (this.deco.propertyTypesOptions[key].multilang)
                            return true;
                    }
                }
                return false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Model.prototype, "isMultilang", {
            get: function () {
                for (var key in this.deco.propertyTypes) {
                    if (this.deco.propertyTypes[key].name === 'string') {
                        if (this.deco.propertyTypesOptions[key].multilang)
                            return true;
                    }
                }
                return false;
            },
            enumerable: false,
            configurable: true
        });
        Model.request = function (method, uri, body, options) {
            var _this = this;
            if (uri === void 0) { uri = ''; }
            if (body === void 0) { body = {}; }
            if (options === void 0) { options = {}; }
            var promise;
            if (method === 'get') {
                promise = this.api.get(uri, options);
            }
            else if (method === 'post') {
                promise = this.api.post(uri, body, options);
            }
            else if (method === 'put') {
                promise = this.api.put(uri, body, options);
            }
            else if (method === 'delete') {
                promise = this.api.delete(uri, body, options);
            }
            return promise
                .then(deco_api_1.jsonify)
                .then(function (elements) {
                if (elements.length === 0)
                    return Promise.resolve([]);
                var instancesPromises = [];
                for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                    var element = elements_1[_i];
                    instancesPromises.push(_this.instanceFromApi(element));
                }
                return Promise.all(instancesPromises);
            });
        };
        Model.addLocaleInSuffixIfNecessary = function (suffix, options) {
            if (options === void 0) { options = {}; }
            if (this.isMultilang && suffix.indexOf('locale=') === -1) {
                if (suffix.indexOf('?') === -1) {
                    suffix += '?locale=';
                }
                else {
                    suffix += '&locale=';
                }
                suffix += this.api.state.language;
                if (options.getRefLocale) {
                    suffix += '&reflocale=' + this.api.state.refLanguage;
                }
            }
            return suffix;
        };
        Model.prototype.addLocaleInSuffixIfNecessary = function (suffix, options) {
            if (options === void 0) { options = {}; }
            if (this.isMultilang && suffix.indexOf('locale=') === -1) {
                if (suffix.indexOf('?') === -1) {
                    suffix += '?locale=';
                }
                else {
                    suffix += '&locale=';
                }
                suffix += this.api.state.language;
            }
            return suffix;
        };
        Model.getAll = function (suffix, options) {
            var _this = this;
            if (suffix === void 0) { suffix = ''; }
            if (options === void 0) { options = {}; }
            suffix = this.addLocaleInSuffixIfNecessary(suffix, options);
            var route = options.route || this.deco.target.getAllRoute();
            var response;
            return this.api.get(route + suffix, options)
                .then(deco_api_1.jsonify)
                .then(function (elements) {
                response = JSON.parse(JSON.stringify(elements));
                if (elements.length === 0)
                    return Promise.resolve([]);
                var instancesPromises = [];
                for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
                    var element = elements_2[_i];
                    instancesPromises.push(_this.instanceFromApi(element /*, trackedData*/));
                }
                return Promise.all(instancesPromises);
            }).then(function (elements) {
                if (options.includeResponse === undefined || options.includeResponse === true) {
                    elements._response = response;
                }
                return elements;
            });
        };
        Model.getOneWithId = function (id, suffix, options) {
            var _this = this;
            if (suffix === void 0) { suffix = ''; }
            if (options === void 0) { options = {}; }
            suffix = this.addLocaleInSuffixIfNecessary(suffix, options);
            var route = options.route || this.deco.target.getOneRoute(id);
            var response;
            return this.api.get(route + suffix, options)
                .then(deco_api_1.jsonify)
                .then(function (element) {
                response = Object.assign({}, element);
                if (!element)
                    return element;
                return _this.instanceFromApi(element);
            }).then(function (element) {
                if (options.includeResponse === undefined || options.includeResponse === true) {
                    element._response = response;
                    return element;
                }
            });
        };
        Model.getOneWithQuery = function () {
            // TODO: getOneWithQuery
            throw new Error('Not implemented yet');
        };
        Model.instanceFromElement = function (element) {
            return new this.deco.target;
        };
        Model.instanceFromApi = function (element) {
            var instance = this.instanceFromElement(element);
            if (element.id)
                instance.id = element.id;
            if (element._createdAt)
                instance._createdAt = moment(element._createdAt).toDate();
            if (element._createdBy)
                instance._createdBy = element._createdBy;
            if (element._updatedAt)
                instance._updatedAt = moment(element._updatedAt).toDate();
            if (element._updatedBy)
                instance._updatedBy = element._updatedBy;
            if (element._refLocales)
                instance._refLocales = element._refLocales;
            var fromApiPromises = [];
            var _loop_1 = function (key) {
                if (!instance.deco.propertyTypes[key]) {
                    // previously: we used to ignore keys that have not been flaged as input by the @io.input decorator
                    // now: we keep them to help auto with autofetch feature
                    // in the future we could keep only autofetched properties, this should not be too hard
                    instance[key] = element[key];
                    return "continue";
                }
                // determine the key type
                var type = instance.deco.propertyTypes[key];
                var options = instance.deco.propertyTypesOptions[key];
                fromApiPromises.push(type.fromApi(key, element[key], options, element, instance.deco.target).then(function (value) {
                    instance[key] = value;
                }));
            };
            for (var _i = 0, _a = Object.keys(element); _i < _a.length; _i++) {
                var key = _a[_i];
                _loop_1(key);
            }
            return Promise.all(fromApiPromises).then(function () {
                return instance;
            });
        };
        Model.instanceFromUnclassedElement = function (element) {
            var instance = this.instanceFromElement(element);
            if (element.id)
                instance.id = element.id;
            if (element._createdAt)
                instance._createdAt = moment(element._createdAt).toDate();
            if (element._createdBy)
                instance._createdBy = element._createdBy;
            if (element._updatedAt)
                instance._updatedAt = moment(element._updatedAt).toDate();
            if (element._updatedBy)
                instance._updatedBy = element._updatedBy;
            if (element._refLocales)
                instance._refLocales = element._refLocales;
            for (var _i = 0, _a = Object.keys(element); _i < _a.length; _i++) {
                var key = _a[_i];
                if (!instance.deco.propertyTypes[key]) {
                    // previously: we used to ignore keys that have not been flaged as input by the @io.input decorator
                    // now: we keep them to help auto with autofetch feature
                    // in the future we could keep only autofetched properties, this should not be too hard
                    instance[key] = element[key];
                    continue;
                }
                instance[key] = element[key];
            }
            return instance;
        };
        Object.defineProperty(Model.prototype, "_label", {
            get: function () {
                return this.id;
            },
            enumerable: false,
            configurable: true
        });
        Model.prototype.save = function (suffix, options) {
            var _this = this;
            if (suffix === void 0) { suffix = ''; }
            if (options === void 0) { options = {}; }
            suffix = this.addLocaleInSuffixIfNecessary(suffix, options);
            var body = options.body || {};
            var toApiPromises = [];
            var _loop_2 = function (property) {
                var type = this_1.deco.propertyTypes[property];
                var options_1 = this_1.deco.propertyTypesOptions[property];
                if (this_1.deco.propertyFromApiOnly.includes(property)) {
                    return "continue";
                }
                toApiPromises.push(type.toApi(property, this_1[property], options_1, this_1, this_1.deco.target).then(function (value) {
                    body[property] = value;
                }));
            };
            var this_1 = this;
            for (var _i = 0, _a = Object.keys(this.deco.propertyTypes); _i < _a.length; _i++) {
                var property = _a[_i];
                _loop_2(property);
            }
            var response;
            return Promise.all(toApiPromises).then(function () {
                return _this.fixBodyIfFilesToUpload(body, options);
            }).then(function (body) {
                var route = options.route || _this.postRoute();
                return _this.api.post(route + suffix, body, options);
            }).then(deco_api_1.jsonify).then(function (element) {
                response = Object.assign({}, element);
                return _this.deco.target.instanceFromApi(element).then(function (instance) {
                    instance._saveResponse = element;
                    return instance;
                });
            }).then(function (element) {
                if (options.includeResponse === undefined || options.includeResponse === true) {
                    element._response = response;
                    return element;
                }
            });
        };
        Model.prototype.fixBodyIfFilesToUpload = function (body, options) {
            if (options === void 0) { options = {}; }
            var form = new FormData();
            var filesToUpload = false;
            //let filePromises = [];
            for (var _i = 0, _a = Object.keys(body); _i < _a.length; _i++) {
                var property = _a[_i];
                var type = this.deco.propertyTypes[property];
                var options_2 = this.deco.propertyTypesOptions[property];
                if (type === undefined || type.name !== 'file' && type.name !== 'files' && body[property] !== null && body[property] !== undefined) {
                    // TODO: here try to do a JSON.stringify of the value
                    // and then a JSON.parse on the API side in order to
                    // properly send and get the data in the fields appended
                    // via the form-data thing
                    // exemple: add metadata to products while also uploading files
                    var value = JSON.stringify(body[property]);
                    form.append(property, value);
                }
                else if (type.name === 'file' && body[property] && typeof body[property] === 'object') {
                    if (body[property].toUpload !== true) {
                        body[property] = undefined; // remove the data from the body, because it must not be changed on server side
                    }
                    else {
                        filesToUpload = true;
                        var blob = body[property].replaced ? body[property].replaced : body[property];
                        form.append(property, blob, body[property].name);
                        if (body[property].blobs) {
                            for (var _b = 0, _c = Object.keys(body[property].blobs); _b < _c.length; _b++) {
                                var format = _c[_b];
                                form.append(property + '_preview', body[property].blobs[format], body[property].name);
                            }
                        }
                    }
                }
                else if (type.name === 'files' && Array.isArray(body[property])) {
                    for (var _d = 0, _e = body[property]; _d < _e.length; _d++) {
                        var file = _e[_d];
                        if (file.toUpload === true) {
                            filesToUpload = true;
                            var blob = file.replaced ? file.replaced : file;
                            form.append(property, blob, file.name);
                            if (file.blobs) {
                                for (var _f = 0, _g = Object.keys(file.blobs); _f < _g.length; _f++) {
                                    var format = _g[_f];
                                    form.append(property + '_preview', file.blobs[format], file.name);
                                }
                            }
                        }
                    }
                    if (body[property].removedFiles) {
                        body[property + "_remove"] = [];
                        for (var _h = 0, _j = body[property].removedFiles; _h < _j.length; _h++) {
                            var removedFile = _j[_h];
                            body[property + "_remove"].push(removedFile.filename);
                        }
                        form.append(property + "_remove", JSON.stringify(body[property + "_remove"]));
                    }
                    if (body[property].sortFiles) {
                        body[property + "_sort"] = [];
                        for (var _k = 0, _l = body[property].sortFiles; _k < _l.length; _k++) {
                            var sortFile = _l[_k];
                            body[property + "_sort"].push(sortFile.filename);
                        }
                        form.append(property + "_sort", JSON.stringify(body[property + "_sort"]));
                    }
                    body[property] = 'changed'; // the body of the property must be 'changed' to indicate that there are changes in this property
                    form.append(property, 'changed');
                }
            }
            if (filesToUpload) {
                // fix options and return formData instance
                options.bodyFormat = 'FormData';
                return Promise.resolve(form);
            }
            else {
                // return the original body
                return Promise.resolve(body);
            }
        };
        Model.prototype.remove = function (suffix, options) {
            if (suffix === void 0) { suffix = ''; }
            if (options === void 0) { options = {}; }
            var route = options.route || this.deleteRoute(this.id);
            return this.api.delete(route + suffix, options).then(deco_api_1.jsonify);
        };
        Model.prototype.updateInstanceFromElement = function (element, properties) {
            var _this = this;
            var fromApiPromises = [];
            var _loop_3 = function (property) {
                if (!this_2.deco.propertyTypes[property])
                    return "continue";
                if (properties && properties.indexOf(property) === -1)
                    return "continue";
                var type = this_2.deco.propertyTypes[property];
                var options = this_2.deco.propertyTypesOptions[property];
                fromApiPromises.push(type.fromApi(property, element[property], options, element, this_2.deco.target).then(function (value) {
                    _this[property] = value;
                }));
            };
            var this_2 = this;
            for (var _i = 0, _a = Object.keys(element); _i < _a.length; _i++) {
                var property = _a[_i];
                _loop_3(property);
            }
            return Promise.all(fromApiPromises).then(function () {
                if (element._refLocales)
                    _this._refLocales = element._refLocales;
                if (element._createdAt)
                    _this._createdAt = element._createdAt;
                if (element._createdBy)
                    _this._createdBy = element._createdBy;
                if (element._updatedAt)
                    _this._updatedAt = element._updatedAt;
                if (element._updatedBy)
                    _this._updatedBy = element._updatedBy;
                return _this;
            });
        };
        Model.prototype.updateInstanceFromUnclassedElement = function (element, properties) {
            for (var _i = 0, _a = Object.keys(element); _i < _a.length; _i++) {
                var property = _a[_i];
                if (!this.deco.propertyTypes[property])
                    continue;
                if (properties && properties.indexOf(property) === -1)
                    continue;
                this[property] = element[property];
            }
            if (element._refLocales)
                this._refLocales = element._refLocales;
            if (element._createdAt)
                this._createdAt = element._createdAt;
            if (element._createdBy)
                this._createdBy = element._createdBy;
            if (element._updatedAt)
                this._updatedAt = element._updatedAt;
            if (element._updatedBy)
                this._updatedBy = element._updatedBy;
            return this;
        };
        Model.prototype.unClass = function () {
            var element = {};
            for (var prop in this.deco.propertyTypes) {
                element[prop] = this[prop];
            }
            return element;
        };
        Model.prototype.updateProperties = function (suffix, properties, options) {
            var _this = this;
            if (suffix === void 0) { suffix = ''; }
            if (options === void 0) { options = {}; }
            suffix = this.addLocaleInSuffixIfNecessary(suffix);
            var body = {};
            var toApiPromises = [];
            var _loop_4 = function (property) {
                if (!this_3.deco.propertyTypes[property])
                    return "continue";
                var type = this_3.deco.propertyTypes[property];
                var options_3 = this_3.deco.propertyTypesOptions[property];
                if (this_3.deco.propertyFromApiOnly.includes(property)) {
                    return "continue";
                }
                toApiPromises.push(type.toApi(property, this_3[property], options_3, this_3, this_3.deco.target).then(function (value) {
                    body[property] = value;
                }));
            };
            var this_3 = this;
            for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
                var property = properties_1[_i];
                _loop_4(property);
            }
            var response;
            return Promise.all(toApiPromises).then(function () {
                return _this.fixBodyIfFilesToUpload(body, options);
            }).then(function (body) {
                var route = options.route || _this.putRoute(_this.id);
                return _this.api.put(route + suffix, body, options);
            }).then(deco_api_1.jsonify).then(function (element) {
                response = Object.assign({}, element);
                _this.validationController.reset();
                if (options.includeResponse === undefined || options.includeResponse === true) {
                    _this._updateResponse = element;
                    _this._response = response;
                }
                if (options.updateInstanceWithResponse === undefined || options.updateInstanceWithResponse === true) {
                    return _this.updateInstanceFromElement(element, properties).then(function (instance) {
                        instance._response = response;
                        return instance;
                    });
                }
                else {
                    return _this;
                }
            });
        };
        Model.prototype.getFilePreview = function (property, format, options) {
            var etag = options && options.etag ? options.etag : null;
            var fileId = options && options.fileId ? options.fileId : null;
            var type = this.deco.propertyTypes[property];
            if (type.name !== 'file' && type.name !== 'files')
                return Promise.resolve(null);
            if (type.name === 'files' && !fileId)
                return Promise.resolve(null);
            var requestOptions = {};
            if (etag)
                requestOptions.etag = etag;
            else if (this[property] && this[property].filename)
                requestOptions.etag = this[property].filename;
            fileId = (type.name === 'files' || fileId) ? "&fileId=" + fileId : '';
            var route = options && options.route || this.getOneRoute(this.id);
            //let requestId = route + '?download=' + property + '&preview=' + format + fileId + '&etag=' + etag;
            var promise = this.api.get(route + '?download=' + property + '&preview=' + format + fileId, requestOptions).then(function (response) {
                return response.blob();
            }).then(function (blob) {
                return blob;
            });
            return promise;
        };
        Model.prototype.getFilePreviewUrl = function (property, format, options) {
            return this.getFilePreview(property, format, options).then(function (blob) {
                if (blob) {
                    return URL.createObjectURL(blob);
                }
                else {
                    return null;
                }
            });
        };
        Model.prototype.getUxFilePreviewData = function (property, file, format) {
            var type = this.deco.propertyTypes[property];
            if (type.name !== 'file' && type.name !== 'files')
                return Promise.resolve(null);
            return this.api.get(this.getOneRoute(this.id) + '?download=' + property + '&fileId=' + file.filename + '&preview=' + format).then(function (response) {
                return response.blob();
            }).then(function (blob) {
                if (blob) {
                    file.previewData = URL.createObjectURL(blob);
                }
            });
        };
        Model.prototype.getUxFileData = function (property, file) {
            var type = this.deco.propertyTypes[property];
            var url = null;
            if (type.name !== 'file' && type.name !== 'files')
                return null;
            url = this.getOneRoute(this.id) + '?download=' + property + '&fileId=' + file.filename;
            return this.api.get(url).then(function (response) {
                return response.blob();
            }).then(function (blob) {
                if (blob) {
                    file.previewData = URL.createObjectURL(blob);
                    file.filename = url;
                    return file;
                }
                return null;
            });
        };
        Model.prototype.validationRules = function () {
            var rules;
            for (var key in this.deco.propertyTypes) {
                var type = this.deco.propertyTypes[key];
                var options = this.deco.propertyTypesOptions[key];
                var validation = this.deco.propertyValidations[key] || null;
                rules = (rules || aurelia_validation_1.ValidationRules).ensure(key);
                rules = rules.satisfiesRule("type:" + type.name, options);
                for (var _i = 0, _a = validation || []; _i < _a.length; _i++) {
                    var validate = _a[_i];
                    if (validate.type === 'required') {
                        rules = rules.required();
                    }
                    else if (validate.type === 'email') {
                        rules = rules.email();
                    }
                    else if (validate.type === 'minLength') {
                        rules = rules.minLength(validate.options.minLength);
                    }
                    else if (validate.type === 'maxLength') {
                        rules = rules.maxLength(validate.options.maxLength);
                    }
                    else if (validate.type === 'slug') {
                        rules = rules.matches(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/);
                    }
                    else {
                        var options_4 = Object.assign(validate.options, { key: key, instance: this, target: this.constructor });
                        rules = rules.satisfiesRule("validate:" + validate.type, validate.options);
                    }
                }
            }
            return rules;
        };
        Model.prototype.validate = function () {
            var rules = this.validationRules();
            var validator = aurelia_framework_1.Container.instance.get(aurelia_validation_1.Validator);
            return validator.validateObject(this, rules.rules).then(function (result) {
                // return true if the validation doesn't reject
                return Promise.resolve(true);
            });
        };
        Object.defineProperty(Model.prototype, "validationController", {
            get: function () {
                if (!this._validationController) {
                    this._validationController = aurelia_framework_1.Container.instance.get(aurelia_validation_1.ValidationControllerFactory).create();
                    this._validationController.addRenderer(new aurelia_resources_1.AureliaUXFormRenderer());
                    this.validationRules().on(this);
                }
                return this._validationController;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Model, "baseroute", {
            get: function () {
                return this.deco.baseroute;
            },
            enumerable: false,
            configurable: true
        });
        Model.getAllRoute = function () { return this.baseroute + '/'; };
        Model.getOneRoute = function (elementId) { return this.baseroute + ("/" + elementId); };
        Model.postRoute = function () { return this.baseroute + '/'; };
        Model.putRoute = function (elementId) { return this.baseroute + ("/" + elementId); };
        Model.deleteRoute = function (elementId) { return this.baseroute + ("/" + elementId); };
        Model.prototype.getRoute = function () {
            return this.deco.baseroute + '/';
        };
        Model.prototype.getOneRoute = function (elementId) {
            return this.deco.baseroute + ("/" + elementId);
        };
        Model.prototype.postRoute = function () {
            return this.deco.baseroute + '/';
        };
        Model.prototype.putRoute = function (elementId) {
            return this.deco.baseroute + ("/" + elementId);
        };
        Model.prototype.deleteRoute = function (elementId) {
            return this.deco.baseroute + ("/" + elementId);
        };
        Model.prototype.get = function (propertyName) {
            return this[propertyName];
        };
        Model.prototype.set = function (propertyName, value) {
            this[propertyName] = value;
        };
        return Model;
    }());
    exports.Model = Model;
});
