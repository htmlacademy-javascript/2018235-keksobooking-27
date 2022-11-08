const advertForm = document.querySelector('.ad-form');
const advertFormElements = advertForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterElements = mapFilter.children;

const disableActiveState = () => {
  advertForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
  advertFormElements.forEach((formElement) => {
    formElement.setAttribute('disabled', 'true');
  });

  for (const filterElement of mapFilterElements) {
    filterElement.setAttribute('disabled', 'true');
  }
};

const enableActiveState = () => {
  advertForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  advertFormElements.forEach((formElement) => {
    formElement.removeAttribute('disabled');
  });
  for (const filterElement of mapFilterElements) {
    filterElement.removeAttribute('disabled');
  }
};

disableActiveState();

export { enableActiveState };

