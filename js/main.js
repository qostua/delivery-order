import './keyboard-control.js';
import './form.js';
import './api.js';
import {
  renderCityInputsLists,
  generateCityInputsList,
  renderAddressInputsList,
  generateAddressInputsList,
  setCityInput
} from './input-address.js';
import {
  getData
} from './api.js';

getData(
  (data) => {
    renderCityInputsLists(generateCityInputsList(data));
    renderAddressInputsList(generateAddressInputsList(data));
    setCityInput(
      () => renderAddressInputsList(generateAddressInputsList(data))
    );
  }
);

