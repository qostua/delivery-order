import './keyboard-control.js';
import './form.js';
import {
  renderCityInputsLists,
  renderAddressInputsList,
  setCityInput
} from './input-address.js';
import {
  getData
} from './api.js';

getData(
  (data) => {
    renderCityInputsLists(data);
    renderAddressInputsList(data);
    setCityInput(
      () => renderAddressInputsList(data)
    );
  }
);

