import { sendData } from './request.js';

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

// валидация цены в зависимости от типа жилья и создание слайдера для цены

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

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: priceSettings[type.value],
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  price.value = sliderElement.noUiSlider.get();
});

function onTypeChange() {
  price.placeholder = priceSettings[type.value];
  sliderElement.noUiSlider.updateOptions({
    start: price.placeholder,
  });
  pristine.validate(price);
}

function onInputChange() {
  sliderElement.noUiSlider.set(price.value);
}

function resetSlider() {
  sliderElement.noUiSlider.set(priceSettings[type.value]);
}

type.addEventListener('change', onTypeChange);
price.addEventListener('change', onInputChange);
pristine.addValidator(price, validatePriceSetting, getPriceErrorMessage);

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
