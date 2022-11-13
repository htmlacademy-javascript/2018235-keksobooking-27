import './form.js';
import { enableFilter } from './page-control.js';
import { getData } from './request.js';
import { createAdvertPins } from './map.js';
import { showAlert } from './messages.js';
import { onTypeChange, onPriceChange } from './filter.js';
import { debounce } from './debounce.js';

const RENDER_DELAY = 500;

getData((adverts) => {
  createAdvertPins(adverts);
  enableFilter();
  onTypeChange(debounce(() => createAdvertPins(adverts), RENDER_DELAY,));
  onPriceChange(debounce(() => createAdvertPins(adverts), RENDER_DELAY,));
}, () => {
  showAlert('Не удалось подключиться к серверу. Повторите попытку позже');
});
