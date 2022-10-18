const PHONE_INPUT_REGEXP = '\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}';
const DATE_INPUT_REGEXP = '(\\d{2}/){2}\\d{4}';

const phoneInputs = document.querySelectorAll('[data-input-type="tel"]');
const dateInputs = document.querySelectorAll('[data-input-type="date"]');

phoneInputs.forEach((input) => {
  input.pattern = PHONE_INPUT_REGEXP;
});
dateInputs.forEach((input) => {
  input.pattern = DATE_INPUT_REGEXP;
});

const isFormValidity = (form) => {
  const inputs = form.querySelectorAll('[required]');

  return Array.from(inputs).every((input) => input.validity.valid);
};
const isCardNumberCorrect = (cardNumber) => {
  let sum = 0;
  const number = String(cardNumber).replace(/\D/g, '');
  const isOdd = number.length % 2 !== 0;

  if (number === '') {
    return false;
  }

  for (let i = 0; i < number.length; i++) {
    let n = parseInt(number[i], 10);

    sum += (isOdd | 0) === (i % 2) && 9 < (n *= 2) ? (n - 9) : n;
  }

  return (sum % 10) === 0;
};
const setCardInputValidity = (cardFieldset, isValid = false) => {
  const inputs = cardFieldset.querySelectorAll('[data-input-type="card"]');
  const customValidity = (isValid) ? '' : 'Номер карты неверен';

  inputs.forEach((input) => input.setCustomValidity(customValidity));
};
const setInputFieldsetValidity = (input, isValid = false) => {
  const validityClass = isValid ? 'input-wrapper--success' : 'input-wrapper--error';
  const inputFieldset = input.closest('fieldset');

  inputFieldset.classList.remove('input-wrapper--error', 'input-wrapper--success');
  inputFieldset.classList.add(validityClass);
};

export {
  isFormValidity,
  isCardNumberCorrect,
  setCardInputValidity,
  setInputFieldsetValidity
};
