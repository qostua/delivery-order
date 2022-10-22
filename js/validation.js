const PHONE_INPUT_REGEXP = '\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}';
const DATE_INPUT_REGEXP = '(\\d{2}/){2}\\d{4}';
const MIN_DAYS_BEFORE_DELIVERY = 1;
const MAX_DAYS_BEFORE_DELIVERY = 7;
const MS_IN_DAY = 86400000;

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
const showInputFieldsetValidity = (input) => {
  const validityClass = input.validity.valid ? 'input-wrapper--success' : 'input-wrapper--error';
  const inputFieldset = input.closest('fieldset');

  inputFieldset.classList.remove('input-wrapper--error', 'input-wrapper--success');
  inputFieldset.classList.add(validityClass);
};
const isInputDeliveryDateCorrect = (inputDateString = '01/01/1000') => {
  const [inputDay, inputMonth, inputYear] = inputDateString.split('/');
  const now = new Date();
  const deliveryDate = new Date();

  deliveryDate.setTime(now.getTime());
  deliveryDate.setFullYear(Number(inputYear));
  deliveryDate.setMonth(Number(inputMonth) - 1);
  deliveryDate.setDate(Number(inputDay));

  const calcedDay = deliveryDate.getDate();
  const calcedMonth = deliveryDate.getMonth();
  const calcedYear = deliveryDate.getFullYear();

  const isInputDayCorrect = (calcedDay === Number(inputDay)) && (calcedMonth + 1 === Number(inputMonth)) && (calcedYear === Number(inputYear));

  const dateDiff = (deliveryDate - now) / MS_IN_DAY;
  const isInputDayMatch = (dateDiff <= MAX_DAYS_BEFORE_DELIVERY) && (dateDiff >= MIN_DAYS_BEFORE_DELIVERY);

  return isInputDayCorrect && isInputDayMatch;
};

export {
  isFormValidity,
  isCardNumberCorrect,
  setCardInputValidity,
  showInputFieldsetValidity,
  isInputDeliveryDateCorrect
};
