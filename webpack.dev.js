const aliases = [
  '@aurelia-ux',
  'aurelia-binding',
  'aurelia-deco',
  'aurelia-dependency-injection',
  'aurelia-dialog',
  'aurelia-event-aggregator',
  'aurelia-framework',
  'aurelia-fetch-client',
  'aurelia-i18n',
  'aurelia-loader',
  'aurelia-logging',
  'aurelia-metadata',
  'aurelia-pal',
  'aurelia-path',
  'aurelia-polyfills',
  'aurelia-resources',
  'aurelia-router',
  'aurelia-store',
  'aurelia-swissdata',
  'aurelia-task-queue',
  'aurelia-templating',
  'aurelia-templating-resources',
  'aurelia-validation',
  'awesome-phonenumber',
  'moment',
  'promise-polyfill',
  'tslib',
  'whatwg-fetch',
  'i18nnext',
  'i18next-xhr-backend',
  'rxjs'
];

const resources = [
  './deco/components/form/ad-dialog-model.html',
  './deco/components/form/deco-field.html',
  './deco/components/form/deco-remove.html',
  './deco/components/form/deco-save.html',
  './deco/components/form/deco-update.html',
  './deco/components/form/ux-file-input.html',
  './deco/components/ad-image.html',
  './deco/components/ad-images.html',
  './deco/components/ad-country-selector.html',
  './deco/components/ad-lang-selector.html',
  './deco/components/ad-locale-selector.html',

  './deco/dialogs/model-editor-default-form.html',
  './deco/dialogs/model-editor-dialog.html',
  './deco/dialogs/ref-language-dialog.html',

  './components/address/address-control.html',
  './components/address/address-dialog.html',
  './components/address/address-item.html',
  './components/address/select-address-control.html',
  './components/address/select-address-dialog.html',
  './components/login/swissdata-login.html',
  './components/notification/swissdata-notification.html',
  './components/dico/dico.html',
  './components/dico/dico-translate-key-locale.html',
  './components/dico2/dico.html',
  './components/dico2/dico-dialog.html',
  './components/form/swissdata-user-field.html',
  './components/form/swissdata-field.html',
  './components/contact/as-contact.html',
  './components/getting-started/getting-started.html',
  './components/getting-started/getting-started-accounts-list.html',
  './components/getting-started/getting-started-create-account-part2.html',
  './components/getting-started/getting-started-create-account.html',
  './components/getting-started/getting-started-forgot-password.html',
  './components/getting-started/getting-started-login.html',
  './components/getting-started/getting-started-password.html',
  './components/getting-started/getting-started-reset-password.html',
  './components/getting-started/getting-started-validate-account.html',
  './components/getting-started/tour-step.html',
  './components/request-recorder/request-recorder-tool.html',
  './components/request-recorder/request-recorder-viewer.html',
  './components/users/select-user-control.html',
  './components/users/select-user.html',
  './components/users/user-item.html',
];

const dev = {
  aliases: aliases,
  resources: resources
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = dev;

