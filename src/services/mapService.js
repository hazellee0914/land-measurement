import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DEFAULT_POSITION = {
  latitude: 37.5665,
  longitude: 126.978,
};

export function createMap(element, position = DEFAULT_POSITION) {
  if (!element) {
    throw new Error('지도를 표시할 요소를 찾을 수 없습니다.');
  }

  const map = L.map(element).setView(
    [position.latitude, position.longitude],
    16,
  );

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.circleMarker([position.latitude, position.longitude], {
    radius: 9,
    color: '#ffffff',
    weight: 3,
    fillColor: '#1976d2',
    fillOpacity: 1,
  }).addTo(map);

  return map;
}

export function createBoundaryPreviewMap(element, boundaryPoints) {
  if (!element || boundaryPoints.length < 3) {
    return null;
  }

  const map = L.map(element, {
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    touchZoom: false,
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const latLngs = boundaryPoints.map((point) => [
    point.latitude,
    point.longitude,
  ]);

  const polygon = L.polygon(latLngs, {
    color: '#f52222',
    weight: 3,
    fillColor: '#8bc34a',
    fillOpacity: 0.4,
  }).addTo(map);

  boundaryPoints.forEach((point) => {
    L.circleMarker([point.latitude, point.longitude], {
      radius: 5,
      color: '#ffffff',
      weight: 3,
      fillColor: '#f52222',
      fillOpacity: 1,
    }).addTo(map);
  });

  map.fitBounds(polygon.getBounds(), {
    padding: [24, 24],
    maxZoom: 18,
  });

  return map;
}
