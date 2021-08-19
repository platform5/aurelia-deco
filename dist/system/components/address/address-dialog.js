System.register([], function (exports_1, context_1) {
    "use strict";
    var AddressDialog;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            AddressDialog = /** @class */ (function () {
                function AddressDialog() {
                    this.address = {};
                    this.mode = 'create';
                    this.labels = [];
                    this.dicoContext = '';
                    this.allowDescription = false;
                }
                AddressDialog.prototype.activate = function (params) {
                    if (params.address && typeof params.address === 'object') {
                        this.address = params.address;
                    }
                    if (params.mode === 'edit') {
                        this.mode = 'edit';
                    }
                    else {
                        this.mode = 'create';
                    }
                    if (params.labels && Array.isArray(params.labels)) {
                        this.labels = params.labels;
                    }
                    else {
                        this.labels = [];
                    }
                    if (params.allowDescription && typeof params.allowDescription === 'boolean') {
                        this.allowDescription = params.allowDescription;
                    }
                    if (params.dicoContext) {
                        this.dicoContext = params.dicoContext;
                    }
                    else {
                        this.dicoContext = '';
                    }
                };
                AddressDialog.prototype.fixAddressKeys = function () {
                    if (typeof this.address.label !== 'string') {
                        this.address.label = '';
                    }
                };
                return AddressDialog;
            }());
            exports_1("AddressDialog", AddressDialog);
        }
    };
});
