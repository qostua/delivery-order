const Url = {
  DATA: 'https://fake-json-shop-heroku.herokuapp.com/db',
  SERVER: 'https://fake-json-shop-heroku.herokuapp.com/requests',
};

const getData = (onSuccess, onFail) => {
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
      onFail();
    });
};
const sendData = (onSuccess, onFail, body) => {
  fetch(
    Url.SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};


export {
  getData,
  sendData
};
