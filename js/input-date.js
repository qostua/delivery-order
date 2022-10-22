import {
  isInputDeliveryDateCorrect,
  showInputFieldsetValidity
} from './validation';
import {
  getDateString
} from './utils.js';

const setDateDeliveryInput = (input) => {
  input.addEventListener('input', () => {
    if (input.validity.patternMismatch) {
      return;
    }

    const date = input.value;
    const isCorrect = isInputDeliveryDateCorrect(date);

    if (!isCorrect) {
      input.setCustomValidity('Неверная дата');
    } else {
      input.setCustomValidity('');
    }

    showInputFieldsetValidity(input);
  });
};
const showCorrectDateRange = (input) => {
  const start = new Date();
  const end = new Date();

  start.setDate(start.getDate() + 1);
  end.setDate(end.getDate() + 7);

  input.placeholder = `${getDateString(start)} — ${getDateString(end)}`;
};

export {
  setDateDeliveryInput,
  showCorrectDateRange
};
