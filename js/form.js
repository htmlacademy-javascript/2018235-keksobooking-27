import { sendData } from './request.js';

const PRICE_SETTINGS = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const advertForm = document.querySelector('.ad-form');
const submitButton = document.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');

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
const getCapacityErrorMessage = () => 'количество гостей не может быть больше, чем количество комнат';

pristine.addValidator(capacity, validateCapacity, getCapacityErrorMessage);
pristine.addValidator(roomNumber, validateCapacity, getCapacityErrorMessage);

const onCapacityChange = () => pristine.validate(capacity);
const onRoomNumberChange = () => pristine.validate(roomNumber);

roomNumber.addEventListener('change', onCapacityChange);
capacity.addEventListener('change', onRoomNumberChange);

// валидация цены в зависимости от типа жилья и создание слайдера для цены

const type = document.querySelector('#type');
const price = document.querySelector('#price');

const validatePriceSetting = () => price.value >= PRICE_SETTINGS[type.value];
const getPriceErrorMessage = () => `Цена не может быть меньше ${PRICE_SETTINGS[type.value]} для этого типа жилья`;

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: PRICE_SETTINGS[type.value],
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

sliderElement.noUiSlider.on('update', () => {
  price.value = sliderElement.noUiSlider.get();
});

const onTypeChange = () => {
  price.placeholder = PRICE_SETTINGS[type.value];
  sliderElement.noUiSlider.updateOptions({
    start: price.placeholder,
  });
  pristine.validate(price);
};

const onInputChange = () => {
  sliderElement.noUiSlider.set(price.value);
};

const resetSlider = () => {
  sliderElement.noUiSlider.set(PRICE_SETTINGS[type.value]);
};

type.addEventListener('change', onTypeChange);
price.addEventListener('change', onInputChange);
pristine.addValidator(price, validatePriceSetting, getPriceErrorMessage);

// валидация времени заезда и выезда

const timein = advertForm.querySelector('#timein');
const timeout = advertForm.querySelector('#timeout');

const onTimeinChange = () => {
  timeout.value = timein.value;
  pristine.validate(timeout);
};

const onTimeoutChange = () => {
  timein.value = timeout.value;
  pristine.validate(timein);
};

timein.addEventListener('change', onTimeinChange);
timeout.addEventListener('change', onTimeoutChange);

//Отправка формы
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуется';
};

const unBlockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const resetForm = () => {
  advertForm.reset();
  resetSlider();
};

const setUserFormSubmit = (onSuccess, onFail) => {
  advertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unBlockSubmitButton();
        },
        () => {
          onFail();
          unBlockSubmitButton();
        },
        new FormData(evt.target));
    }
  });
};

const setResetButton = (reset) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    reset();
  });
};

export { setUserFormSubmit, resetForm, setResetButton };
