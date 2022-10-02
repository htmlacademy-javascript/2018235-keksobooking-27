function getRandomInt(min, max) {

  if (min >= 0 && Number.isFinite(min) && max >= 0 && Number.isFinite(max)) {
    return Math.round(Math.random() * (max - min + 1)) + min;
  }

  return NaN;
}

getRandomInt(15, 150);

function getRandomNumber(min, max, signs) {

  if (min >= 0 && Number.isFinite(min) && max >= 0 && Number.isFinite(max)) {
    const number = Math.random() * (max - min) + min;
    return number.toFixed(signs);
  }

  return NaN;
}

getRandomNumber(15.45, 15.60, 4);

// функции взяты из https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// если значения "от" и "до" равны, вернятся само значение
// если значение «до» меньшее, чем значение «от», функция сработает и вернет случайное число из диапазона между этими значениями
