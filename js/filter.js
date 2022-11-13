//const mapFilter = document.querySelector('.map__filters');
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');

const Default = {
  TYPE: 'flat',
  PRICE: '5200',
};

// const priceOption = {
//   middle: '',
//   low: '',
//   high: '',
// };

const geAdvertRank = (advert) => {
  const { offer } = advert;

  const getPriceValue = () => {
    if (offer.price < 10000) { return 'low'; }
    if (offer.price > 10000 && offer.price < 50000) { return 'middle'; }
    if (offer.price > 50000) { return 'high'; }
  };

  const priceValue = getPriceValue();

  let rank = 0;

  if (offer.type === (housingType.value || Default.TYPE)) {
    rank += 10;
  }
  if (priceValue === (housingPrice.value || Default.PRICE)) {
    rank += 9;
  }

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

export { compareAdverts, onTypeChange, onPriceChange };

