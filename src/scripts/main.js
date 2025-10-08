document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');

  if (!forms.length) {
    return;
  }

  const toPlaceholder = (raw) => {
    if (!raw) {
      return '';
    }

    const first = raw.charAt(0).toUpperCase();

    return first + raw.slice(1);
  };

  forms.forEach((formEl) => {
    const inputs = formEl.querySelectorAll('input[name]');

    inputs.forEach((input) => {
      const inputName = input.name;

      if (!inputName) {
        return;
      }

      // 1) гарантуємо наявність id і прив’язку label → input
      if (!input.id) {
        input.id = inputName;
      }

      // 2) додаємо label у безпосередній батьківський контейнер
      const parentInput = input.parentElement;

      if (!parentInput) {
        return;
      }

      let label = parentInput.querySelector(`label[for="${input.id}"]`);

      if (!label) {
        label = document.createElement('label');
        label.className = 'field-label';
        parentInput.insertBefore(label, input);
      }

      // 3) використовуємо htmlFor (а не setAttribute)
      label.htmlFor = input.id;

      // 4) текст мітки — рівно input.name (без капіталізації)
      label.textContent = input.name;

      // 5) placeholder — тільки якщо його немає, з великої літери
      if (!input.hasAttribute('placeholder')) {
        input.placeholder = toPlaceholder(inputName);
      }
    });
  });
});
