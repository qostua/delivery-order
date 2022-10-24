import {
  showAlert
} from './utils.js';

const Url = {
  DATA: 'https://fake-json-shop-heroku.herokuapp.com/db',
};

const getData = (onSuccess) => {
  fetch(Url.DATA)
    .then((response) => {
      if (!response.ok) {
        throw Error(`Bad response. Code: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showAlert('Не удалось получить данные с сервера. Проверьте подключение и перезагрузите страницу.');
    });
};

export {
  getData
};
