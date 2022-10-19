import {
  isCardNumberCorrect,
  setCardInputValidity
} from "./validation.js";

const CARD_INPUT_MASK = '0000';
const CARD_NUMBER_LENGTH = 16;
const CARD_INPUT_MAX_LENGTH = 4;

const cardInputs = document.querySelectorAll('[data-input-type="card"]');

cardInputs.forEach((input) => {
  IMask(input, {
    mask: CARD_INPUT_MASK,
  });
});

const getCardNumber = (form) => {
  const inputs = form.querySelectorAll('[data-input-type="card"]');
  return Array.from(inputs).reduce((previousValue, field) => previousValue + field.value, '');
};
const setCardFocus = (cardFieldset) => {
  const focusInput = cardFieldset.querySelector('input:focus');
  const nextInput = cardFieldset.querySelector('input:focus ~ input');

  if (focusInput.value.length === CARD_INPUT_MAX_LENGTH && nextInput) {
    nextInput.focus();
  }
}
const setCardInput = (cardFieldset) => {
  cardFieldset.addEventListener('input', () => {
    const number = getCardNumber(cardFieldset);
    const isNumberCorrect = number.length === CARD_NUMBER_LENGTH && isCardNumberCorrect(number);
    setCardInputValidity(cardFieldset, isNumberCorrect);
    setCardFocus(cardFieldset);
  });
};
const setCardKeydown = (cardFieldset) => {
  cardFieldset.addEventListener('keydown', (evt) => {
    if (evt.key !== 'Backspace' || evt.target.value.length !== 0) {
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
const toggleCardInputVisable = (form, isVisable = true) => {
  const cardInput = form.querySelector('.input-wrapper--user-card');

  if (isVisable) {
    cardInput.classList.remove('input-wrapper--hidden');
    cardInput.disabled = false;
  } else {
    cardInput.classList.add('input-wrapper--hidden');
    cardInput.disabled = true;
  }
};

export {
  setCardInput,
  setCardKeydown,
  toggleCardInputVisable
};
