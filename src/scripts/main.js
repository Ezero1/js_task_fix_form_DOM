document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');

  if (!forms.length) {
    return;
  }

  const toLabelText = (rawName) => {
    if (!rawName) {
      return '';
    }

    const first = rawName.charAt(0).toUpperCase();

    return first + rawName.slice(1);
  };

  forms.forEach((formElement) => {
    const inputs = formElement.querySelectorAll('input[name]');

    inputs.forEach((input) => {
      const inputName = input.name;
      const id = input.id || inputName;

      const parentInput = input.closest('.field');

      if (!parentInput) {
        return;
      }

      const hasLabel = parentInput.querySelector(`label[for="${id}"]`);

      if (!hasLabel) {
        const label = document.createElement('label');

        label.className = 'field-label';
        label.setAttribute('for', id);
        label.textContent = toLabelText(inputName);

        parentInput.insertBefore(label, input);
      }

      const hasPlaceholder = input.hasAttribute('placeholder');

      if (!hasPlaceholder) {
        input.placeholder = toLabelText(inputName);
      }
    });
  });
});
