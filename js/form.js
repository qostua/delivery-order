import {
  isFormValidity,
  showInputFieldsetValidity
} from './validation.js';
import {
  setCardInput,
  setCardKeydown,
  toggleCardInputVisable
} from './input-card.js';
import {
  setRangeTimeSliderMove,
  setRangeTimeSliderFocus
} from './time-slider.js';
import {
  setDateDeliveryInput,
  showCorrectDateRange
} from './input-date.js';
import {
  setPhoneInputMask,
  setDateInputMask
} from './input-mask.js';

const formsOrder = document.querySelectorAll('.form-order');
const dateInputs = document.querySelectorAll('[data-input-type="date"]');
const phoneInputs = document.querySelectorAll('[data-input-type="tel"]');
const cardInputFieldsets = document.querySelectorAll('.input-wrapper--user-card');
const rangeTimeSliders = document.querySelectorAll('.js_range-slider-thumb-area');

const toggleBtnSubmit = (form, isTurnOn = true) => {
  const submit = form.querySelector('.form__submit-btn');

  if (submit) {
    submit.disabled = !isTurnOn;
  }
};
const getSubmitHelpValues = (form) => {
  const submitHelpValues = new Set();

  const invalidInputs = form.querySelectorAll('input:invalid');
  invalidInputs.forEach((input) => {
    const helpValue = input.closest('fieldset').dataset.submitHelp;
    if (helpValue) {
      submitHelpValues.add(helpValue);
    }
  });

  return submitHelpValues;
};
const generateHelpValuesString = (submitHelpValues, sizeHelpValues) => {
  let helpValuesString = '';

  let i = 0;
  for (const value of submitHelpValues) {
    helpValuesString += `<span>${value}</span>`;
    if (i < sizeHelpValues - 2) {
      helpValuesString += ', ';
    } else if (i === sizeHelpValues - 2) {
      helpValuesString += ' и ';
    }
    i++;
  }

  return helpValuesString;
};
const showSubmitHelpValues = (form) => {
  const formState = form.querySelector('.form__submit-state');
  const submitHelp = formState.querySelector('.form__submit-help');

  const submitHelpValues = getSubmitHelpValues(form);
  const sizeHelpValues = submitHelpValues.size;

  if (sizeHelpValues === 0) {
    formState.style.display = 'none';
    return;
  } else {
    formState.style.display = 'block';
  }

  submitHelp.innerHTML = generateHelpValuesString(submitHelpValues, sizeHelpValues);
};

const setFormInput = (form) => {
  form.addEventListener('input', (event) => {
    showInputFieldsetValidity(event.target);

    toggleBtnSubmit(form, isFormValidity(form));
    showSubmitHelpValues(form);
  });
};
const setPaymentMethodChange = (form) => {
  const paymentMethodFieldset = form.querySelector('.input-wrapper--payment-method');
  if (!paymentMethodFieldset) {
    return;
  }
  paymentMethodFieldset.addEventListener('input', (event) => {
    const isCard = event.target.value === 'card';
    toggleCardInputVisable(form, isCard);
  });
};


formsOrder.forEach((form) => {
  setFormInput(form);
  toggleBtnSubmit(form, false);
  showSubmitHelpValues(form);
  setPaymentMethodChange(form);
});

cardInputFieldsets.forEach((fieldset) => {
  setCardInput(fieldset);
  setCardKeydown(fieldset);
});

rangeTimeSliders.forEach((slider) => {
  setRangeTimeSliderMove(slider);
  setRangeTimeSliderFocus(slider);
});

phoneInputs.forEach((input) => {
  setPhoneInputMask(input);
});

dateInputs.forEach((input) => {
  showCorrectDateRange(input);
  setDateDeliveryInput(input);
  setDateInputMask(input);
});
