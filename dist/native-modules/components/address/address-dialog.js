var AddressDialog = /** @class */ (function () {
    function AddressDialog() {
        this.address = {};
        this.mode = 'create';
        this.labels = [];
        this.dicoContext = '';
        this.allowDescription = false;
        this.allowLatLngEdition = false;
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
        if (params.allowLatLngEdition && typeof params.allowLatLngEdition === 'boolean') {
            this.allowLatLngEdition = params.allowLatLngEdition;
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
export { AddressDialog };
