import {
  isFormValidity,
  showInputFieldsetValidity,
  resetInputFieldsetValidity
} from './validation.js';
import {
  toggleCardInputVisible,
  setCardInput,
  setCardKeydown
} from './input-card.js';
import {
  setTimeSliderMove,
  setTimeSliderFocus,
  resetSlider
} from './time-slider.js';
import {
  showCorrectDateRange,
  setDateDeliveryInput
} from './input-date.js';
import {
  sendData
} from './api.js';
import './input-mask.js';

const SubmitState = {
  TURN_ON: true,
  TURN_OFF: false,
};

const formsOrder = document.querySelectorAll('.form-order');
const dateInputs = document.querySelectorAll('[data-input-type="date"]');
const paymentMethodFieldsets = document.querySelectorAll('.input-wrapper--payment-method');
const cardInputFieldsets = document.querySelectorAll('.input-wrapper--user-card');
const rangeTimeSliders = document.querySelectorAll('.js_range-slider-thumb-area');

const toggleBtnSubmit = (form, isTurnOn = true) => {
  const submit = form.querySelector('.form__submit-btn');

  if (submit) {
    submit.disabled = !isTurnOn;
  }
};
const toggleBtnSubmitFormsOrder = (isTurnOn = SubmitState.TURN_ON) => {
  formsOrder.forEach((form) => {
    toggleBtnSubmit(form, isTurnOn);
  });
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
const setSameValueSyncInputs = (changeInput) => {
  const inputValue = changeInput.value;
  const typeSyncInput = changeInput.dataset.inputType;
  const syncInputs = document.querySelectorAll(`[data-input-type=${typeSyncInput}][data-sync='true']:not(:focus)`);

  syncInputs.forEach((input) => {
    input.mask.value = inputValue;
    const form = input.closest('form');

    toggleBtnSubmit(form, isFormValidity(form));
    showSubmitHelpValues(form);
    showInputFieldsetValidity(input);
  });
};
const resetFormsOrder = () => {
  formsOrder.forEach((form) => {
    form.reset();
    const inputs = form.querySelectorAll('input');
    const sliders = form.querySelectorAll('.js_range-slider-thumb-area');

    inputs.forEach((input) => {
      if (input.mask) {
        input.mask.updateValue();
      }
      resetInputFieldsetValidity(input);
      if (input.type === 'hidden') {
        input.value = '';
      }
    });
    sliders.forEach((slider) => resetSlider(slider));

    toggleCardInputVisible(form, true);
    showSubmitHelpValues(form);
  });
};

const setFormInput = (form) => {
  form.addEventListener('input', (event) => {
    if (event.target.dataset.sync) {
      setSameValueSyncInputs(event.target);
    }

    showInputFieldsetValidity(event.target);
    toggleBtnSubmit(form, isFormValidity(form));
    showSubmitHelpValues(form);
  });
};
const setPaymentMethodChange = (fieldset) => {
  const form = fieldset.closest('form');

  fieldset.addEventListener('input', (event) => {
    const isCard = (event.target.value === 'card');
    toggleCardInputVisible(form, isCard);
  });
};

const setFormsSubmit = (onSuccess, onError) => {
  formsOrder.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      toggleBtnSubmit(event.target,false);

      sendData(
        () => onSuccess(),
        () => onError(),
        new FormData(event.target)
      );
    });
  });
};

formsOrder.forEach((form) => {
  setFormInput(form);
  toggleBtnSubmit(form, false);
  showSubmitHelpValues(form);
});
paymentMethodFieldsets.forEach((fieldset) => {
  setPaymentMethodChange(fieldset);
});
cardInputFieldsets.forEach((fieldset) => {
  setCardInput(fieldset);
  setCardKeydown(fieldset);
});
rangeTimeSliders.forEach((slider) => {
  const sliderWrap = slider.closest('fieldset');
  const sliderOutputField = sliderWrap.querySelector('input[type="hidden"]');

  setTimeSliderMove(slider, sliderOutputField);
  setTimeSliderFocus(slider, sliderOutputField);
});
dateInputs.forEach((input) => {
  showCorrectDateRange(input);
  setDateDeliveryInput(input);
});

export {
  setFormsSubmit,
  resetFormsOrder,
  toggleBtnSubmitFormsOrder,
  SubmitState
};
