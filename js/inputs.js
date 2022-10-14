const dateInput = document.querySelector('#delivery-user-date-delivery');
const phoneInput = document.querySelector('#delivery-user-phone');

IMask(dateInput, {
  mask: 'd/`m/`y',
  lazy: true,
  blocks: {
    d: {mask: IMask.MaskedRange, placeholderChar: 'd', from: 1, to: 31, maxLength: 2},
    m: {mask: IMask.MaskedRange, placeholderChar: 'm', from: 1, to: 12, maxLength: 2},
    y: {mask: IMask.MaskedRange, placeholderChar: 'y', from: 1900, to: 2999, maxLength: 4},
  },
});
IMask(phoneInput, {
  mask: '+{7} (000) 000-00-00',
});
