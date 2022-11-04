
const getData = (onSuccess, onFail) => fetch('https://27.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((adverts) => {
    onSuccess(adverts);
  })
  .catch(() => onFail());

export { getData };

