import { createAdverts } from './data.js';

const advertTemplate = document.querySelector('#card').content.querySelector('.popup');

const advertsList = createAdverts();

const createAdvertPopup = (advert) => {
  const { offer, author } = advert;
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
    const guestsNumber = `${offer.guests} ${offer.guests === 1 ? 'гостя' : 'гостей'}`;
    switch (true) {
      case offer.rooms < 2:
        return `${offer.rooms} комната для ${guestsNumber}`;
      case offer.rooms < 5:
        return `${offer.rooms} комнаты для ${guestsNumber}`;
      default:
        return `${offer.rooms} комнат для ${guestsNumber}`;
    }
  };

  const getFeatures = () => {
    const featureItems = offer.features;
    const featureListContainer = advertElement.querySelector('.popup__features');
    const featureList = advertElement.querySelectorAll('.popup__feature');
    if (featureItems.length) {
      const modifiers = featureItems.map((featureItem) => `popup__feature--${featureItem}`);

      featureList.forEach((feature) => {
        const modifier = feature.classList[1];

        if (!modifiers.includes(modifier)) {
          feature.remove();
        }
      });
    } else {
      featureListContainer.style.display = 'none';
    }
  };

  const getPhotos = () => {
    const photosContainer = advertElement.querySelector('.popup__photos');
    const photoItem = photosContainer.querySelector('.popup__photo');
    const photoList = offer.photos;
    photosContainer.innerHTML = '';

    if (photoList.length) {
      photoList.forEach((photo) => {
        const newPhoto = photoItem.cloneNode(true);
        newPhoto.src = photo;
        photosContainer.append(newPhoto);
      });

    } else {
      photosContainer.style.display = 'none';
    }

  };

  advertElement.querySelector('.popup__title').textContent = offer.title;
  advertElement.querySelector('.popup__text--address').textContent = offer.address;
  advertElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  advertElement.querySelector('.popup__type').textContent = getType();
  advertElement.querySelector('.popup__text--capacity').textContent = getCapacity();
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  advertElement.querySelector('.popup__features').content = getFeatures();

  if (offer.description) {
    advertElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    advertElement.querySelector('.popup__description').style.display = 'none';
  }

  advertElement.querySelector('.popup__photos').content = getPhotos();
  advertElement.querySelector('.popup__avatar').src = author.avatar;

  return advertElement;
};


export { advertsList, createAdvertPopup };
