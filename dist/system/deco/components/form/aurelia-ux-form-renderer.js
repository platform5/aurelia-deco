System.register([], function (exports_1, context_1) {
    "use strict";
    var AureliaUXFormRenderer;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            AureliaUXFormRenderer = /** @class */ (function () {
                function AureliaUXFormRenderer() {
                }
                AureliaUXFormRenderer.prototype.render = function (instruction) {
                    for (var _i = 0, _a = instruction.unrender; _i < _a.length; _i++) {
                        var _b = _a[_i], result = _b.result, elements = _b.elements;
                        for (var _c = 0, elements_1 = elements; _c < elements_1.length; _c++) {
                            var element = elements_1[_c];
                            this.remove(element, result);
                        }
                    }
                    for (var _d = 0, _e = instruction.render; _d < _e.length; _d++) {
                        var _f = _e[_d], result = _f.result, elements = _f.elements;
                        for (var _g = 0, elements_2 = elements; _g < elements_2.length; _g++) {
                            var element = elements_2[_g];
                            this.add(element, result);
                        }
                    }
                };
                AureliaUXFormRenderer.prototype.add = function (element, result) {
                    if (result.valid) {
                        return;
                    }
                    element.classList.add('has-error');
                    var uxField = element.closest('ux-field');
                    if (!uxField) {
                        return;
                    }
                    var inputInfoHintText = uxField.querySelector('ux-input-info');
                    if (!inputInfoHintText) {
                        return;
                    }
                    // add help-block
                    var message = document.createElement('span');
                    message.className = 'error-text';
                    message.textContent = result.message;
                    message.id = "validation-message-" + result.id;
                    inputInfoHintText.insertBefore(message, inputInfoHintText.firstChild);
                };
                AureliaUXFormRenderer.prototype.remove = function (element, result) {
                    if (result.valid) {
                        return;
                    }
                    element.classList.remove('has-error');
                    var uxField = element.closest('ux-field');
                    if (!uxField) {
                        return;
                    }
                    var inputInfoHintText = uxField.querySelector('ux-input-info');
                    if (!inputInfoHintText) {
                        return;
                    }
                    // remove help-block
                    var message = inputInfoHintText.querySelector("#validation-message-" + result.id);
                    if (message) {
                        inputInfoHintText.removeChild(message);
                        // remove the has-error class from the enclosing form-group div
                        if (inputInfoHintText.querySelectorAll('.help-block.validation-message').length === 0) {
                            inputInfoHintText.classList.remove('has-error');
                        }
                    }
                };
                return AureliaUXFormRenderer;
            }());
            exports_1("AureliaUXFormRenderer", AureliaUXFormRenderer);
        }
    };
});
