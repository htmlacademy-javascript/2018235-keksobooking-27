const TITLES = [
  'Wonderfull view from window',
  'The cheapest accommodation on the block',
  'Cheap and cozy',
  'Good neighbors',
  'Free parking',
  '30 square meters for the price of 20',
  'Pets allowed',
  'Maid service included',
  'Tomorrow the price will rise',
  'Furnished room for children',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow ',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Spacious hall and big bedroom. Jacuzzi bath and home movie theater',
  'The most stylish acomodation. Every room has unique design',
  'Not lux, but there is hot water and central heating',
  'Modern and cozy. It is fully equipped - kitchen, wc, shower, sleeping bed for two, dining table',
  'ALL rooms have just been refurnished, equipped with ceiling fans',
  'A beautiful building, lovingly furnished. Children are very welcome',
  'A cozy flat with a sofa, a seating area, a flat-screen TV with cable channels',
  'A luxury serviced apartment with hotel-like services. All apartments are fully furnished and include a fully-equipped kitchen',
  'All rooms come with a flat-screen TV and a safety deposit box. There are several well-known attractions nearby',
  'In your room you will find a desk, a flat-screen TV, a private bathroom',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const MINLAT = 35.65000;
const MAXLAT = 35.70000;

const MINLNG = 139.70000;
const MAXLNG = 139.80000;

// получаем случайной целое число из диапазона
const getRandomInt = (min = 1, max = 10) => {
  if (min < 0 || max < 0) {
    return NaN;
  }

  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
};

// получаем случайной число с точкой из диапазона
const getRandomNumber = (min, max, signs) => {
  if (min < 0 || max < 0 || signs < 0) {
    return NaN;
  }

  const lower = (Math.min(min, max));
  const upper = (Math.max(min, max));

  const number = Math.random() * (upper - lower) + lower;
  return +number.toFixed(signs);
};

// Получение индекса по порядку для avatar
const getIndex = () => {
  let index = 0;
  return function () {
    return index++;
  };
};

const count = getIndex();

// функция получения случайного индекса элемента массива
const getRandomElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

// функция по созданию нового массива случайной длины на основе известного массива
const createArray = (array) => {
  const newArray = [];
  for (let i = 0; i <= getRandomInt(0, array.length - 1); i++) {
    newArray[i] = getRandomElement(array);
  }
  const makeUniq = (arr) => arr.filter((el, id) => arr.indexOf(el) === id);

  return makeUniq(newArray);
};

// функция получения цены
const getOfferPrice = () => getRandomInt() * 100;

// функция по созданию объекта
const createAdvert = () => {
  const AvatarCount = count();
  const locationLat = getRandomNumber(MINLAT, MAXLAT, 5);
  const locationLng = getRandomNumber(MINLNG, MAXLNG, 5);

  return {
    author: {
      avatar: `img/avatars/user${AvatarCount < 9 ? '0' : ''}${AvatarCount + 1}.png`,
    },
    offer: {
      title: getRandomElement(TITLES),
      address: `${locationLat}, ${locationLng} `,
      price: getOfferPrice(),
      type: getRandomElement(TYPES),
      rooms: getRandomInt(),
      guests: getRandomInt(),
      checkin: getRandomElement(CHECKIN),
      checkout: getRandomElement(CHECKOUT),
      features: createArray(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
      photos: createArray(PHOTOS),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

// функция по созданию массива объектов
const createObjectList = (quantity, object) => Array.from({ length: quantity }, object);

createObjectList(10, createAdvert);
