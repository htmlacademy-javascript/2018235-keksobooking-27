const mapFilter = document.querySelector('.map__filters');
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const mapFeatures = document.querySelector('#housing-features');


const Default = {
  TYPE: 'flat',
  PRICE: 'low',
  ROOMS: '2',
  GUESTS: '3',
  FEATURES: ['wifi']
};

const geAdvertRank = (advert) => {
  const { offer } = advert;

  const getPriceValue = () => {
    if (offer.price < 10000) {
      return 'low';
    }
    if (offer.price > 10000 && offer.price < 50000) {
      return 'middle';
    }
    if (offer.price > 50000) {
      return 'high';
    }
  };

  const priceValue = getPriceValue();

  let rank = 0;

  if (offer.type === (housingType.value || Default.TYPE)) {
    rank += 10;
  }
  if (priceValue === (housingPrice.value || Default.PRICE)) {
    rank += 8;
  }
  if (String(offer.rooms) === (housingRooms.value || Default.ROOMS)) {
    rank += 6;
  }
  if (String(offer.guests) === (housingGuests.value || Default.GUESTS)) {
    rank += 6;
  }
  const checkedFeatures = mapFilter.querySelectorAll('[type = "checkbox"]:checked');
  const features = offer.features ? offer.features : Default.FEATURES;

  checkedFeatures.forEach((checkedFeature) => {
    if (features.includes(checkedFeature.value)) {
      rank += 1;
    }
  });
  return rank;
};

const compareAdverts = (advertA, advertB) => {
  const rankA = geAdvertRank(advertA);
  const rankB = geAdvertRank(advertB);

  return rankB - rankA;
};

const onTypeChange = (cb) => {
  housingType.addEventListener('change', () => {
    cb();
  });
};

const onPriceChange = (cb) => {
  housingPrice.addEventListener('change', () => {
    cb();
  });
};

const onRoomsChange = (cb) => {
  housingRooms.addEventListener('change', () => {
    cb();
  });
};

const onGuestsChange = (cb) => {
  housingGuests.addEventListener('change', () => {
    cb();
  });
};

const onFeaturesChange = (cb) => {
  mapFeatures.addEventListener('change', () => {
    cb();
  });
};
export { compareAdverts, onTypeChange, onPriceChange, onRoomsChange, onGuestsChange, onFeaturesChange };

