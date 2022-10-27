const advertForm = document.querySelector('.ad-form');

const pristine = new Pristine(advertForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
});

// валидация количества комнат и количества гостей

const capacity = advertForm.querySelector('#capacity');
const roomNumber = advertForm.querySelector('#room_number');
const capacityOption = {
  '1': '1',
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': '0',
};

const validateCapacity = () => capacityOption[roomNumber.value].includes(capacity.value);
const getCapacityErrorMessage = () => 'количество гостей не может быть больше, чем количесвто комнат';

pristine.addValidator(capacity, validateCapacity, getCapacityErrorMessage);
pristine.addValidator(roomNumber, validateCapacity, getCapacityErrorMessage);

function onCapacityChange() {
  pristine.validate(capacity);
}

function onRoomNumberChange() {
  pristine.validate(roomNumber);
}

roomNumber.addEventListener('change', onCapacityChange);
capacity.addEventListener('change', onRoomNumberChange);

// валидация цены в зависимости от типа жилья

const type = document.querySelector('#type');
const price = document.querySelector('#price');
const priceSettings = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const validatePriceSetting = () => price.value >= priceSettings[type.value];
const getPriceErrorMessage = () => `Цена не может быть меньше ${priceSettings[type.value]} для этого типа жилья`;

pristine.addValidator(price, validatePriceSetting, getPriceErrorMessage);

function onTypeChange() {
  price.placeholder = priceSettings[type.value];
  pristine.validate(price);
}

type.addEventListener('change', onTypeChange);

// валидация времени заезда и выезда

const timein = advertForm.querySelector('#timein');
const timeout = advertForm.querySelector('#timeout');

function onTimeinChange() {
  timeout.value = timein.value;
  pristine.validate(timeout);
}

function onTimeoutChange() {
  timein.value = timeout.value;
  pristine.validate(timein);
}

timein.addEventListener('change', onTimeinChange);
timeout.addEventListener('change', onTimeoutChange);

advertForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
