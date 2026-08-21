import { createMap } from '../services/mapService';
import { getPosition } from '../services/positionService';

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
      
      </main>
    </div>
  `;
}

export function initMeasurementPage(navigate) {
  const mapElement = document.querySelector('#measurement-map');

  const backButton = document.querySelector('[data-back-button]');

  if (!mapElement || !backButton) {
    console.error('측정 화면 요소를 찾을 수 없습니다.');

    return;
  }

  const position = getPosition();
  console.log('측정 지도 좌표:', position);

  createMap(mapElement, position ?? undefined);

  backButton.addEventListener('click', () => {
    navigate('/');
  });
}
