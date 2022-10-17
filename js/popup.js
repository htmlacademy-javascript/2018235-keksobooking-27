import { createAdverts } from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const advertTemplate = document.querySelector('#card').content.querySelector('.popup');

const advertsList = createAdverts();
const advertElementsList = []; // массив объявлений для отрисовки

const advertListFragment = document.createDocumentFragment();

advertsList.forEach(({ offer, author }) => {
  const advertElement = advertTemplate.cloneNode(true);

  const getType = () => {
    const typeList = document.querySelectorAll('option');
    const value = offer.type;
    let result;

    typeList.forEach((type) => {
      if (type.value === value) {
        result = type.textContent;
      }
    });
    return result;
  };

  const getCapacity = () => {
    switch (true) {
      case offer.rooms < 2:
        return `${offer.rooms} комната для ${offer.guests} гостей`;
      case offer.rooms < 5:
        return `${offer.rooms} комнаты для ${offer.guests} гостей`;
      default:
        return `${offer.rooms} комнат для ${offer.guests} гостей`;
    }
  };

  const getFeatures = () => {
    const featureItems = offer.features;
    const featureList = advertElement.querySelectorAll('.popup__feature');
    const modifiers = featureItems.map((featureItem) => `popup__feature--${featureItem}`);

    featureList.forEach((feature) => {
      const modifier = feature.classList[1];

      if (!modifiers.includes(modifier)) {
        feature.remove();
      }
    });

  };

  const getPhotos = () => {
    const photosContainer = advertElement.querySelector('.popup__photos');
    const photoItem = photosContainer.querySelector('.popup__photo');
    const photoList = offer.photos;

    photoList.forEach((photo) => {
      const newPhoto = photoItem.cloneNode(true);
      newPhoto.src = photo;
      photosContainer.append(newPhoto);
    });
  };


  advertElement.querySelector('.popup__title').textContent = offer.title;
  advertElement.querySelector('.popup__text--address').textContent = offer.address;
  advertElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  advertElement.querySelector('.popup__type').textContent = getType();
  advertElement.querySelector('.popup__text--capacity').textContent = getCapacity();
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  advertElement.querySelector('.popup__features').content = getFeatures();
  advertElement.querySelector('.popup__description').textContent = offer.description;
  advertElement.querySelector('.popup__photos').content = getPhotos();
  advertElement.querySelector('.popup__avatar').src = author.avatar;
  advertListFragment.append(advertElement);
  advertElementsList.push(advertElement);
});

mapCanvas.append(advertElementsList[9]);
