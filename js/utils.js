const DATE_LENGTH = 2;

const setCursorStyle = (cursorStyle = 'auto') => {
  if (cursorStyle === 'auto') {
    document.body.style.cursor = null;
  } else {
    document.body.style.cursor = cursorStyle;
  }

  if (document.body.getAttribute('style') === '') {
    document.body.removeAttribute('style');
  }
};
const preventSelection = () => {
  document.addEventListener('selectstart', (event) => {
    event.preventDefault();
  }, { once: true });
};
const getDateString = (date) => {
  const day = String(date.getDate()).padStart(DATE_LENGTH, '0');
  const month = String(date.getMonth() + 1).padStart(DATE_LENGTH, '0');
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
};

export {
  setCursorStyle,
  preventSelection,
  getDateString
};
