import {
  ValidationRenderer,
  RenderInstruction,
  ValidateResult
} from 'aurelia-validation';

export class SwissdataLoginFormValidationRenderer {
  public render(instruction: RenderInstruction) {
    for (let { result, elements } of instruction.unrender) {
      for (let element of elements) {
        this.remove(element, result);
      }
    }

    for (let { result, elements } of instruction.render) {
      for (let element of elements) {
        this.add(element, result);
      }
    }
  }

  public add(element: Element, result: ValidateResult) {
    if (result.valid) {
      return;
    }

    element.classList.add('has-error');

    const container = element.closest('.input-container');
    if (!container) {
      return;
    }

    const inputInfoHintText = container.nextElementSibling;
    if (!inputInfoHintText || !inputInfoHintText.classList.contains('input-bottom-info')) {
      return;
    }

    // add help-block
    const message = document.createElement('span');
    message.className = 'error-text';
    message.textContent = result.message;
    message.id = `validation-message-${result.id}`;
    inputInfoHintText.insertBefore(message, inputInfoHintText.firstChild);
  }

  public remove(element: Element, result: ValidateResult) {
    if (result.valid) {
      return;
    }

    element.classList.remove('has-error');
    
    
    const container = element.closest('.input-container');
    if (!container) {
      return;
    }

    const inputInfoHintText = container.nextElementSibling;
    if (!inputInfoHintText || !inputInfoHintText.classList.contains('input-bottom-info')) {
      return;
    }

    // remove help-block
    const message = inputInfoHintText.querySelector(`#validation-message-${result.id}`);
    if (message) {
      inputInfoHintText.removeChild(message);

      // remove the has-error class from the enclosing form-group div
      if (inputInfoHintText.querySelectorAll('.help-block.validation-message').length === 0) {
        inputInfoHintText.classList.remove('has-error');
      }
    }
  }
}
