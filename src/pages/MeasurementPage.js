import { createMap } from '../services/mapService';
import { getPosition } from '../services/positionService';
import L from 'leaflet';
import { saveBoundaryPoints } from '../services/measurementService';

export function MeasurementPage() {
  return `
    <div class="measurement-page">
      <header class="measurement-page__header">
        <button type="button" class="measurement-page__back-button" data-back-button
        aria-label="홈으로 가기"
        >
        ‹ 
        </button>

        <h1>경계점 측정</h1>
        <span></span>
      </header>

      <main class="measurement-page__content">
      <div
          id="measurement-map"
          class="measurement-map"
          aria-label="토지 경계 측정 지도"
        ></div>

      <div class="measurement-controls">
        <button class="measurement-controls__undo"
          type="button"
          data-undo-button
          disabled
        >
        ↶ 실행 취소
        </button>

        <button class="measurement-controls__complete"
          type="button"
          data-complete-button
          disabled
        >
          측정 완료
        </button>
      </div>
      
      </main>
    </div>
  `;
}

export function initMeasurementPage(navigate) {
  const mapElement = document.querySelector('#measurement-map');

  const backButton = document.querySelector('[data-back-button]');

  const undoButton = document.querySelector('[data-undo-button]');
  const completeButton = document.querySelector('[data-complete-button]');

  if (!mapElement || !backButton || !undoButton || !completeButton) {
    console.error('측정 화면 요소를 찾을 수 없습니다.');
    return;
  }

  const position = getPosition();
  console.log('측정 지도 좌표:', position);

  const map = createMap(mapElement, position ?? undefined);

  const boundaryPoints = [];

  const boundaryMarkers = [];

  const boundaryPolygon = L.polygon([], {
    color: '#f52222',
    weight: 3,
    fillColor: '#8bc34a',
    fillOpacity: 0.4,
  }).addTo(map);

  // 1. 지도 클릭 이벤트
  map.on('click', (event) => {
    const { lat, lng } = event.latlng;

    const point = {
      latitude: lat,
      longitude: lng,
    };

    boundaryPoints.push(point);

    const latLngs = boundaryPoints.map((boundaryPoint) => [
      boundaryPoint.latitude,
      boundaryPoint.longitude,
    ]);

    boundaryPolygon.setLatLngs(latLngs);

    const marker = L.circleMarker([lat, lng], {
      radius: 8,
      color: '#ffffff',
      weight: 3,
      fillColor: '#f52222',
      fillOpacity: 1,
    }).addTo(map);

    boundaryMarkers.push(marker);

    undoButton.disabled = boundaryPoints.length === 0;
    completeButton.disabled = boundaryPoints.length < 3;

    console.log('현재 경계점 목록:', boundaryPoints);
  });

  // / 2. 실행 취소 이벤트
  undoButton.addEventListener('click', () => {
    boundaryPoints.pop();

    const lastMarker = boundaryMarkers.pop();

    if (lastMarker) {
      lastMarker.remove();
    }

    const latLngs = boundaryPoints.map((boundaryPoint) => [
      boundaryPoint.latitude,
      boundaryPoint.longitude,
    ]);

    boundaryPolygon.setLatLngs(latLngs);

    undoButton.disabled = boundaryPoints.length === 0;
    completeButton.disabled = boundaryPoints.length < 3;
  });

  // 3. 측정 완료 이벤트
  completeButton.addEventListener('click', () => {
    if (boundaryPoints.length < 3) {
      return;
    }

    saveBoundaryPoints(boundaryPoints);

    console.log('저장된 경계점:', boundaryPoints);

    navigate('/result');
  });

  // 4. 뒤로 가기 이벤트
  backButton.addEventListener('click', () => {
    navigate('/');
  });
}
