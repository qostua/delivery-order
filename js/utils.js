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

export {
  setCursorStyle,
  preventSelection
};
