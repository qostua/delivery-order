import {
  isCardNumberCorrect,
  setCardFieldsetValidity
} from './validation.js';

const CARD_NUMBER_LENGTH = 16;
const CARD_INPUT_LENGTH = 4;

const getCardNumber = (form) => {
  const inputs = form.querySelectorAll('[data-input-type="card"]');
  return Array.from(inputs).reduce((previousValue, input) => previousValue + input.value, '');
};
const setFullCardNumberToOutput = (cardFieldset, number) => {
  const outputField = cardFieldset.querySelector('input[name="card"]');
  outputField.value = number;
};
const setCardInput = (cardFieldset) => {
  cardFieldset.addEventListener('input', () => {
    const number = getCardNumber(cardFieldset);
    setFullCardNumberToOutput(cardFieldset, number);
    const isNumberCorrect = (number.length === CARD_NUMBER_LENGTH) && isCardNumberCorrect(number);
    setCardFieldsetValidity(cardFieldset, isNumberCorrect);

    const focusInput = cardFieldset.querySelector('input:focus');
    const nextInput = cardFieldset.querySelector('input:focus ~ input');

    if (focusInput.value.length === CARD_INPUT_LENGTH && nextInput) {
      nextInput.focus();
    }
  });
};
const setCardKeydown = (cardFieldset) => {
  cardFieldset.addEventListener('keydown', (event) => {
    if (event.key !== 'Backspace' || event.target.value.length !== 0) {
      return;
    }

    const inputs = cardFieldset.querySelectorAll('input');
    const focusInput = cardFieldset.querySelector('input:focus');
    const focusInputIndex = Array.from(inputs).findIndex((input) => input === focusInput);

    if (focusInputIndex !== 0) {
      inputs[focusInputIndex - 1].focus();
    }
  });
};
const toggleCardInputVisible = (form, isVisible = true) => {
  const fieldset = form.querySelector('.input-wrapper--user-card');
  if (!fieldset) {
    return;
  }
  const inputs = fieldset.querySelectorAll('input');

  if (isVisible) {
    fieldset.classList.remove('input-wrapper--hidden');
  } else {
    fieldset.classList.add('input-wrapper--hidden');
  }

  fieldset.disabled = !isVisible;
  inputs.forEach((input) => {
    input.disabled = !isVisible;
  });
};

export {
  setCardInput,
  setCardKeydown,
  toggleCardInputVisible
};
