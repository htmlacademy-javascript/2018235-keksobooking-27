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
  return Number(number.toFixed(signs));
};


// Получение индекса по порядку для avatar
const getIndex = () => {
  let index = 0;
  return function () {
    return index++;
  };
};


// функция получения случайного индекса элемента массива
const getRandomElement = (elements) => elements[getRandomInt(0, elements.length - 1)];


// функция по созданию нового массива случайной длины на основе известного массива
const createArray = (array) => {
  const newItems = [];
  for (let i = 0; i <= getRandomInt(0, array.length - 1); i++) {
    newItems[i] = getRandomElement(array);
  }
  const makeUniq = (arr) => arr.filter((el, id) => arr.indexOf(el) === id);

  return makeUniq(newItems);
};


// функция получения цены
const getOfferPrice = () => getRandomInt() * 1000;

export { getRandomInt, getRandomNumber, getIndex, getRandomElement, createArray, getOfferPrice };
