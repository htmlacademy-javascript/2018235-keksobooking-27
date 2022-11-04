import './form.js';
import './page-control.js';
import { getData } from './request.js';
import { createAdvertPins } from './map.js';
import { showAlert } from './util.js';

getData((adverts) => {
  createAdvertPins(adverts);
}, () => {
  showAlert('Не удалось подключиться к серверу. Повторите попытку позже');
});
