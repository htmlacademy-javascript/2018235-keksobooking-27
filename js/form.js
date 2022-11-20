import { sendData } from './request.js';

const PRICE_SETTINGS = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const advertForm = document.querySelector('.ad-form');
const submitButtonElement = document.querySelector('.ad-form__submit');
const resetButtonElement = document.querySelector('.ad-form__reset');

const pristine = new Pristine(advertForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
});

// валидация количества комнат и количества гостей

const capacityElement = advertForm.querySelector('#capacity');
const roomNumberElement = advertForm.querySelector('#room_number');
const capacityOption = {
  '1': '1',
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': '0',
};

const validateCapacity = () => capacityOption[roomNumberElement.value].includes(capacityElement.value);
const getCapacityErrorMessage = () => 'количество гостей не может быть больше, чем количество комнат';

pristine.addValidator(capacityElement, validateCapacity, getCapacityErrorMessage);
pristine.addValidator(roomNumberElement, validateCapacity, getCapacityErrorMessage);

const onCapacityChange = () => pristine.validate(capacityElement);
const onRoomNumberChange = () => pristine.validate(roomNumberElement);

roomNumberElement.addEventListener('change', onCapacityChange);
capacityElement.addEventListener('change', onRoomNumberChange);

// валидация цены в зависимости от типа жилья и создание слайдера для цены

const typeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');

const validatePriceSetting = () => priceElement.value >= PRICE_SETTINGS[typeElement.value];
const getPriceErrorMessage = () => `Цена не может быть меньше ${PRICE_SETTINGS[typeElement.value]} для этого типа жилья`;

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: PRICE_SETTINGS[typeElement.value],
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceElement.value = sliderElement.noUiSlider.get();
});

const onTypeChange = () => {
  priceElement.placeholder = PRICE_SETTINGS[typeElement.value];
  sliderElement.noUiSlider.updateOptions({
    start: priceElement.placeholder,
  });
  pristine.validate(priceElement);
};

const onInputChange = () => {
  sliderElement.noUiSlider.set(priceElement.value);
};

const resetSlider = () => {
  sliderElement.noUiSlider.set(PRICE_SETTINGS[typeElement.value]);
};

typeElement.addEventListener('change', onTypeChange);
priceElement.addEventListener('change', onInputChange);
pristine.addValidator(priceElement, validatePriceSetting, getPriceErrorMessage);

// валидация времени заезда и выезда

const timeinElement = advertForm.querySelector('#timein');
const timeoutElement = advertForm.querySelector('#timeout');

const onTimeinChange = () => {
  timeoutElement.value = timeinElement.value;
  pristine.validate(timeoutElement);
};

const onTimeoutChange = () => {
  timeinElement.value = timeoutElement.value;
  pristine.validate(timeinElement);
};

timeinElement.addEventListener('change', onTimeinChange);
timeoutElement.addEventListener('change', onTimeoutChange);

//Отправка формы
const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикуется';
};

const unBlockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
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
  resetButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    reset();
  });
};

export { setUserFormSubmit, resetForm, setResetButton };
