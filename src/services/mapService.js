import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DEFAULT_POSITION = {
  latitude: 37.5665,
  longitude: 126.978,
};

export function createMap(element) {
  if (!element) {
    throw new Error('지도를 표시할 요소를 찾을 수 없습니다.');
  }

  const map = L.map(element).setView(
    [DEFAULT_POSITION.latitude, DEFAULT_POSITION.longitude],
    16,
  );

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.circleMarker([DEFAULT_POSITION.latitude, DEFAULT_POSITION.longitude], {
    radius: 9,
    color: '#ffffff',
    weight: 3,
    fillColor: '#1976d2',
    fillOpacity: 1,
  }).addTo(map);

  return map;
}
