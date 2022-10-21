const tabPickUp = document.querySelector('#tab-pick-up');
const tabDelivery = document.querySelector('#tab-delivery');

const changeTabFormHandler = (event) => {
  if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
    return;
  }

  if (tabPickUp.checked === true) {
    tabDelivery.checked = true;
    tabDelivery.focus();
  } else {
    tabPickUp.checked = true;
    tabPickUp.focus();
  }
};

document.addEventListener('keydown', changeTabFormHandler);
document.addEventListener('focusin', () => document.removeEventListener('keydown', changeTabFormHandler));
document.addEventListener('focusout', () => document.addEventListener('keydown', changeTabFormHandler));
