const PRICE_VALUES = {
  low: 10000,
  high: 50000,
};
const mapFilter = document.querySelector('.map__filters');
const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');
const mapFeatureElements = document.querySelectorAll('.map__checkbox');

const filterFields = [housingTypeElement, housingPriceElement, housingRoomsElement, housingGuestsElement, ...mapFeatureElements];

const resetFilter = () => {
  mapFilter.reset();
};

const filterByType = (advert) => {
  if (housingTypeElement.value === 'any') {
    return true;
  }
  return advert.offer.type === housingTypeElement.value;
};

const filterByPrice = (advert) => {
  switch (housingPriceElement.value) {
    case 'any':
      return true;
    case 'low':
      return advert.offer.price <= PRICE_VALUES.low;
    case 'middle':
      return advert.offer.price > PRICE_VALUES.low && advert.offer.price <= PRICE_VALUES.high;
    case 'high':
      return advert.offer.price > PRICE_VALUES.high;
  }
};

const filterByRooms = (advert) => {
  if (housingRoomsElement.value === 'any') {
    return true;
  }
  return advert.offer.rooms === Number(housingRoomsElement.value);
};

const filterByGuests = (advert) => {
  if (housingGuestsElement.value === 'any') {
    return true;
  }
  return advert.offer.guests === Number(housingGuestsElement.value);
};

const filterByFeatures = (advert) => {
  const checkedFeatureElements = mapFilter.querySelectorAll('[type = "checkbox"]:checked');
  if (!checkedFeatureElements.length) {
    return true;
  }
  if (!advert.offer.features) {
    return false;
  }

  const checkedValues = Array.from(checkedFeatureElements).map((checkedFeature) => checkedFeature.value);

  return checkedValues.every((checkedValue) => advert.offer.features.includes(checkedValue));
};

const filterAdverts = (advert) => filterByType(advert) && filterByPrice(advert) && filterByRooms(advert) && filterByGuests(advert) && filterByFeatures(advert);

const onFilterChange = (cb) => {
  filterFields.forEach((filterField) => {
    filterField.addEventListener('change', () => {
      cb();
    });
  });
};

export { filterAdverts, onFilterChange, resetFilter };
