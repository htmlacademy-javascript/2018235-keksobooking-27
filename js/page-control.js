const advertForm = document.querySelector('.ad-form');
const advertFormElements = advertForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterElements = mapFilter.children;

const disableForm = () => {
  advertForm.classList.add('ad-form--disabled');
  advertFormElements.forEach((formElement) => {
    formElement.setAttribute('disabled', 'true');
  });
};

const disableFilter = () => {
  mapFilter.classList.add('map__filters--disabled');
  for (const filterElement of mapFilterElements) {
    filterElement.setAttribute('disabled', 'true');
  }
};

const disableActiveState = () => {
  disableForm();
  disableFilter();
};

const enableFilter = () => {
  mapFilter.classList.remove('map__filters--disabled');
  for (const filterElement of mapFilterElements) {
    filterElement.removeAttribute('disabled');
  }
};

const enableForm = () => {
  advertForm.classList.remove('ad-form--disabled');
  advertFormElements.forEach((formElement) => {
    formElement.removeAttribute('disabled');
  });
};

export { enableForm, enableFilter, disableActiveState };

