import {
  getMap,
  renderMarkers,
  activeMarker,
  AnimationState
} from './map.js';
import {
  getData
} from './api.js';
import {
  renderCityInputsLists,
  renderAddressInputsList,
  getDeliveryPointsData,
  getCheckedAddressData,
  setCityInput,
  setAddressInput
} from './input-address.js';
import {
  setFormsSubmit,
  resetFormsOrder,
  toggleBtnSubmitFormsOrder,
  SubmitState
} from './form.js';
import {
  showAlert,
  AlertColor
} from './utils.js';
import './keyboard-control.js';

getMap(
  () => getData(
    (data) => {
      renderCityInputsLists(data);
      renderAddressInputsList(data);
      renderMarkers(getDeliveryPointsData(data));
      activeMarker(getCheckedAddressData(data), AnimationState.STATIC);
      setCityInput(
        () => {
          renderAddressInputsList(data);
          renderMarkers(getDeliveryPointsData(data));
          activeMarker(getCheckedAddressData(data), AnimationState.STATIC);
        }
      );
      setAddressInput(
        () => {
          activeMarker(getCheckedAddressData(data), AnimationState.ANIMATE);
        }
      );
      setFormsSubmit(
        () => {
          showAlert('Заказ успешно оформлен.', AlertColor.SUCCESS_ALERT);
          resetFormsOrder();
          renderAddressInputsList(data);
          renderMarkers(getDeliveryPointsData(data));
          activeMarker(getCheckedAddressData(data), AnimationState.STATIC);
        },
        () => {
          showAlert('Ошибка оформления заказа. Попробуйте снова.', AlertColor.FAIL_ALERT);
          toggleBtnSubmitFormsOrder(SubmitState.TURN_ON);
        }
      );
    },
    () => showAlert('Не удалось получить данные с сервера. Проверьте подключение и перезагрузите страницу.', AlertColor.FAIL_ALERT)
  )
);
