import { createAdvertPopup } from './popup.js';

const DEFAULT_LAT = 35.68950;
const DEFAULT_LNG = 139.69200;
const ADVERTS_COUNT = 10;
const address = document.querySelector('#address');

address.value = `${DEFAULT_LAT.toFixed(5)}, ${DEFAULT_LNG.toFixed(5)}`;

const map = L.map('map-canvas');
const mapInit = (onInit) => {
  map.on('load', () => {
    onInit();
  })
    .setView({
      lat: DEFAULT_LAT,
      lng: DEFAULT_LNG,
    }, 10);
};


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  address.value = `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;
});

const resetMainMarker = () => {
  mainMarker.setLatLng({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });
  map.setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, 10);
  address.value = `${DEFAULT_LAT.toFixed(5)}, ${DEFAULT_LNG.toFixed(5)}`;
};

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createAdvertPins = (adverts) => {
  markerGroup.clearLayers();
  adverts.slice(0, ADVERTS_COUNT).forEach((advert) => {
    const marker = L.marker(
      {
        lat: advert.location.lat,
        lng: advert.location.lng,
      },
      {
        icon: pinIcon,
      },
    );
    marker
      .addTo(markerGroup)
      .bindPopup(createAdvertPopup(advert));
  });
};

export { resetMainMarker, createAdvertPins, mapInit };
