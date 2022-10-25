const PHONE_INPUT_MASK = '+{7} (000) 000-00-00';
const DATE_INPUT_MASK = 'd/`m/`y';
const DATE_INPUT_MASK_BLOCKS = {
  d: {mask: IMask.MaskedRange, placeholderChar: 'Д', from: 1, to: 31, maxLength: 2},
  m: {mask: IMask.MaskedRange, placeholderChar: 'М', from: 1, to: 12, maxLength: 2},
  y: {mask: IMask.MaskedRange, placeholderChar: 'Г', from: 1000, to: 9999, maxLength: 4},
};

const setPhoneInputMask = (input) => {
  input.mask = IMask(input, {
    mask: PHONE_INPUT_MASK,
  });
};
const setDateInputMask = (input) => {
  input.mask = IMask(input, {
    mask: DATE_INPUT_MASK,
    blocks: DATE_INPUT_MASK_BLOCKS,
    lazy: true,
  });
};

export {
  setPhoneInputMask,
  setDateInputMask
};
