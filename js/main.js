import { enableFilter, disableActiveState, enableForm } from './page-control.js';
import { getData } from './request.js';
import { debounce } from './debounce.js';
import { createAdvertPins, mapInit, resetMainMarker } from './map.js';
import { setUserFormSubmit, resetForm, setResetButton } from './form.js';
import { showAlert, showSuccessMessage, showErrorMessage } from './messages.js';
import { onFilterChange, filterAdverts, resetFilter } from './filter.js';
import { resetImages } from './image-download.js';

const RENDER_DELAY = 500;

disableActiveState();

mapInit(() => {
  enableForm();
  getData((adverts) => {
    createAdvertPins(adverts);
    enableFilter();
    onFilterChange(debounce(() => createAdvertPins(adverts.filter(filterAdverts)), RENDER_DELAY,));
  }, () => {
    showAlert('Не удалось подключиться к серверу. Повторите попытку позже');
  });
});

const resetUserData = () => {
  resetForm();
  resetMainMarker();
  resetFilter();
  resetImages();
  getData((adverts) => {
    createAdvertPins(adverts);
  }, () => {
    showAlert('Не удалось подключиться к серверу. Повторите попытку позже');
  });
};

setUserFormSubmit(() => {
  resetUserData();
  showSuccessMessage();
}, () => {
  showErrorMessage();
});

setResetButton(resetUserData);
