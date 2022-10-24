const DEFAULT_CITY = 'Санкт-Петербург';
const CityInputTypes = {
  PICK_UP: true,
  DELIVERY: false,
}

const inputWrapperLedAddress = document.querySelector('.input-wrapper--led-address');
const inputCityPickUpWrapper = document.querySelector('.input-wrapper--city-pick-up');
const inputCityDeliveryWrapper = document.querySelector('.input-wrapper--city-delivery');

const generateCityInput = (cityId, cityName, isPickUpInputs = true) => {
  const inputAndLabel = document.createDocumentFragment();

  const input = document.createElement('input');
  const label = document.createElement('label');

  const idPrefix = (isPickUpInputs) ? 'pick-up' : 'delivery';
  input.id = `${idPrefix}--${cityId}`;
  input.type = 'radio';
  input.name = 'city';
  input.value = cityId;

  if (cityName === DEFAULT_CITY) {
    input.checked = true;
  }

  label.htmlFor = input.id;
  label.textContent = cityName;

  inputAndLabel.append(input, label);
  return inputAndLabel;
};
const generateCityInputsList = (data, isPickUpInputs = true) => {
  return data.cities.map((city) => generateCityInput(city['city-id'], city.city, isPickUpInputs))
};
const cleanCityInputsWraps = () => {
  const fieldsPickUp = inputCityPickUpWrapper.querySelectorAll('input, label');
  const fieldsCityDelivery = inputCityDeliveryWrapper.querySelectorAll('input, label');

  fieldsPickUp.forEach((field) => field.remove());
  fieldsCityDelivery.forEach((field) => field.remove());
}
const renderCityInputsLists = (data) => {
  const cityInputsPickUp = generateCityInputsList(data, CityInputTypes.PICK_UP);
  const cityInputsDelivery = generateCityInputsList(data, CityInputTypes.DELIVERY);

  const fieldsetPickUp = document.createDocumentFragment();
  const fieldsetDelivery = document.createDocumentFragment();

  fieldsetPickUp.append(...cityInputsPickUp);
  fieldsetDelivery.append(...cityInputsDelivery);

  cleanCityInputsWraps();
  inputCityPickUpWrapper.append(fieldsetPickUp);
  inputCityDeliveryWrapper.append(fieldsetDelivery);
};

const getCheckedPickUpCityId = () => {
  return inputCityPickUpWrapper.querySelector(':checked').value;
};
const generateAddressInput = (order, adress) => {
  const inputAndLabel = document.createDocumentFragment();

  const input = document.createElement('input');
  const label = document.createElement('label');

  input.id = `pick-up-led-address-${order + 1}`;
  input.type = 'radio';
  input.name = 'led-address';
  input.value = adress;

  if (order === 0) {
    input.checked = true;
  }

  label.htmlFor = input.id;
  label.textContent = input.value;

  inputAndLabel.append(input, label);
  return inputAndLabel;
};
const generateAddressInputsList = (data) => {
  const cityId = getCheckedPickUpCityId();
  const cityData = data.cities.find((city) => city['city-id'] === cityId);
  const deliveryPointsData = cityData['delivery-points'];

  return deliveryPointsData.map((deliveryPoint, order) => generateAddressInput(order, deliveryPoint.address));
};
const cleanAddressInputsWrap = () => {
  const fields = inputWrapperLedAddress.querySelectorAll('input, label');

  fields.forEach((field) => field.remove());
}
const renderAddressInputsList = (data) => {
  const addressInputs = generateAddressInputsList(data);
  const fieldset = document.createDocumentFragment();
  fieldset.append(...addressInputs);

  cleanAddressInputsWrap();
  inputWrapperLedAddress.append(fieldset);
};

const setCityInput = (cb) => {
  inputCityPickUpWrapper.addEventListener('input', () => {
    cb();
  });
};

export {
  renderCityInputsLists,
  renderAddressInputsList,
  setCityInput
};
