const advertForm = document.querySelector('.ad-form');

const pristine = new Pristine(advertForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
});

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

advertForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


