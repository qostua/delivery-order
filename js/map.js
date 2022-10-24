const StartCoordinates = {
  LAT: 59.93863,
  LNG: 30.31413,
};
const MAP_START_ZOOM_SETTING = 15;
const MAP_MAX_ZOOM_SETTING = 19;

const MAP_TILE_LAYER_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_TILE_LAYER_COPYRIGHT = '&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const activePinIconOptions = {
  iconUrl: 'img/pin-current.png',
  iconSize: [28, 44],
  iconAnchor: [14, 44],
};
const pinIconOptions = {
  iconUrl: 'img/pin.png',
  iconSize: [20, 32],
  iconAnchor: [10, 32],
};

const map = L.map('map-canvas');
const layerMarkers = L.layerGroup();

const activePinIcon = L.icon(activePinIconOptions);
const pinIcon = L.icon(pinIconOptions);

const setStartPositionMap = () => {
  map.setView({
    lat: StartCoordinates.LAT,
    lng: StartCoordinates.LNG,
  }, MAP_START_ZOOM_SETTING);
};

const setMapTileLayer = () => {
  L.tileLayer(MAP_TILE_LAYER_URL, {
    maxZoom: MAP_MAX_ZOOM_SETTING,
    attribution: MAP_TILE_LAYER_COPYRIGHT,
  }).addTo(map);
};

const getMap = (onSuccess) => {
  map.on('load', () => {
    onSuccess();
  });

  setMapTileLayer();
  setStartPositionMap();
};

const createMarker = (coordinates, address) => {
  const marker = L.marker(
    coordinates,
    {
      icon: pinIcon,
      address,
    }
  );

  marker
    .addTo(layerMarkers)
    .bindPopup(
      address,
    );
};
const renderMarkers = (deliveryPointsData) => {
  map.removeLayer(layerMarkers);
  layerMarkers.clearLayers();

  deliveryPointsData.forEach((point) => {
    createMarker(point.coordinates, point.address);
  });

  layerMarkers.addTo(map);
};
const setPositionMap = (selectedAddressData, isAnimate = true) => {
  const [lat, lng] = selectedAddressData.coordinates;

  map.setView(
    {
      lat,
      lng,
    },
    MAP_START_ZOOM_SETTING,
    {
      "animate": isAnimate,
      "pan": {
        "duration": 1,
      },
    }
  );
};

const activeMarker = (selectedAddressData, isAnimate) => {
  setPositionMap(selectedAddressData, isAnimate);

  layerMarkers.eachLayer((marker) => {
    if (marker.options.address === selectedAddressData.address) {
      marker.setIcon(activePinIcon);
    }
  });
}

export {
  getMap,
  renderMarkers,
  activeMarker
};
