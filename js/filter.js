const mapFilter = document.querySelector('.map__filters');
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const mapFeatures = document.querySelectorAll('.map__checkbox');

const filterFields = [housingType, housingPrice, housingRooms, housingGuests, ...mapFeatures];

const resetFilter = () => {
  mapFilter.reset();
};

const filterByType = (advert) => {
  if (housingType.value === 'any') {
    return true;
  }
  return advert.offer.type === housingType.value;
};

const filterByPrice = (advert) => {
  switch (housingPrice.value) {
    case 'any':
      return true;
    case 'low':
      return advert.offer.price <= 10000;
    case 'middle':
      return advert.offer.price > 10000 && advert.offer.price <= 50000;
    case 'high':
      return advert.offer.price > 50000;
  }
};

const filterByRooms = (advert) => {
  if (housingRooms.value === 'any') {
    return true;
  }
  return advert.offer.rooms === Number(housingRooms.value);
};

const filterByGuests = (advert) => {
  if (housingGuests.value === 'any') {
    return true;
  }
  return advert.offer.guests === Number(housingGuests.value);
};

const filterByFeatures = (advert) => {
  const checkedFeatures = mapFilter.querySelectorAll('[type = "checkbox"]:checked');
  if (!checkedFeatures.length) {
    return true;
  }
  if (!advert.offer.features) {
    return false;
  }

  const checkedValues = Array.from(checkedFeatures).map((checkedFeature) => checkedFeature.value);

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
