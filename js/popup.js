const advertTemplate = document.querySelector('#card').content.querySelector('.popup');

const createAdvertPopup = (advert) => {
  const { offer, author } = advert;
  const advertElement = advertTemplate.cloneNode(true);

  const getType = () => {
    const typeListElements = document.querySelectorAll('option');
    const value = offer.type;
    let result;

    typeListElements.forEach((type) => {
      if (type.value === value) {
        result = type.textContent;
      }
    });
    return result;
  };

  const getCapacity = () => {
    const guestsNumber = `${offer.guests} ${offer.guests === 1 ? 'гостя' : 'гостей'}`;

    return offer.rooms === 1 ? `${offer.rooms} комната для ${guestsNumber}` :
      `${offer.rooms} комнаты для ${guestsNumber}`;
  };

  const getFeatures = () => {
    const featureItems = offer.features;
    const featureListContainerElement = advertElement.querySelector('.popup__features');
    const featureListElements = advertElement.querySelectorAll('.popup__feature');
    if (offer.features) {
      const modifiers = featureItems.map((featureItem) => `popup__feature--${featureItem}`);

      featureListElements.forEach((feature) => {
        const modifier = feature.classList[1];

        if (!modifiers.includes(modifier)) {
          feature.remove();
        }
      });
    } else {
      featureListContainerElement.style.display = 'none';
    }
    return featureListElements;
  };

  const getPhotos = () => {
    const photosContainerElement = advertElement.querySelector('.popup__photos');
    const photoItemElement = photosContainerElement.querySelector('.popup__photo');
    const photoList = offer.photos;
    photosContainerElement.innerHTML = '';

    if (offer.photos) {
      photoList.forEach((photo) => {
        const newPhoto = photoItemElement.cloneNode(true);
        newPhoto.src = photo;
        photosContainerElement.append(newPhoto);
      });

    } else {
      photosContainerElement.style.display = 'none';
    }
    return photosContainerElement;
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


export { createAdvertPopup };
