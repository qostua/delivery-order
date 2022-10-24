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

const showAlert = (alertText) => {
  const alert = document.createElement('div');
  alert.style.padding = '10px';
  alert.style.width = '100%';
  alert.style.backgroundColor = '#ff9081';
  alert.style.position = 'absolute';
  alert.style.top = '0';
  alert.style.display = 'flex';
  alert.style.justifyContent = 'center';
  alert.style.alignItems = 'center';
  alert.style.cursor = 'pointer';
  alert.style.userSelect = 'none';
  alert.style.color = '#ffffff';

  const text = document.createElement('p');
  text.textContent = alertText;
  text.style.color = '#ffffff';
  text.style.fontWeight = '500';
  text.style.fontSize = '18px';

  const closeBth = document.createElement('button');
  closeBth.textContent = 'Закрыть';
  closeBth.style.border = 'none';
  closeBth.style.background = 'none';
  closeBth.style.color = 'inherit';
  closeBth.style.fontWeight = '700';
  closeBth.style.fontSize = '15px';
  closeBth.style.position = 'absolute';
  closeBth.style.right = '10px';

  alert.append(text, closeBth);
  document.body.append(alert);

  const handleKeypress = (evt) => {
    if (evt.key === 'Escape') {
      alert.remove();
      document.removeEventListener('keydown', handleKeypress);
    }
  };

  document.addEventListener('keydown', handleKeypress);
  alert.addEventListener('click', () => {
    alert.remove();
    document.removeEventListener('keydown', handleKeypress);
  });
  alert.addEventListener('mouseover', () => {
    alert.style.color = '#FFFFFFB3';
  });
  alert.addEventListener('mouseout', () => {
    alert.style.color = '#ffffff';
  });
};

export {
  setCursorStyle,
  preventSelection,
  getDateString,
  showAlert
};
