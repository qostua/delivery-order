import './keyboard-control.js';
import './form.js';
import {
  getDeliveryPointsData,
  renderCityInputsLists,
  renderAddressInputsList,
  setCityInput,
  setAddressInput,
  getCheckedAddressData
} from './input-address.js';
import {
  getData
} from './api.js';
import {
  getMap,
  renderMarkers,
  activeMarker
} from './map.js';

const MapOptions = {
  ANIMATE_MAP: true,
  STATIC_MAP: false,
};

getMap(
  () => getData(
    (data) => {
      renderCityInputsLists(data);
      renderAddressInputsList(data);
      renderMarkers(getDeliveryPointsData(data));
      activeMarker(getCheckedAddressData(data), MapOptions.STATIC_MAP);
      setCityInput(
        () => {
          renderAddressInputsList(data);
          renderMarkers(getDeliveryPointsData(data));
          activeMarker(getCheckedAddressData(data), MapOptions.STATIC_MAP);
        }
      );
      setAddressInput(
        () => {
          activeMarker(getCheckedAddressData(data), MapOptions.ANIMATE_MAP);
        }
      );
    }
  )
);


