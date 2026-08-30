import { getSavedMeasurementById } from '../services/saveMeasurementService.js';

import { createBoundaryPreviewMap } from '../services/mapService.js';

function formatSavedDate(savedAt) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(savedAt));
}

export function SavedDetailPage() {
  const searchParams = new URLSearchParams(window.location.search);

  const measurementId = Number(searchParams.get('id'));

  const measurement = getSavedMeasurementById(measurementId);

  if (!measurement) {
    return `
      <div class="saved-detail-page">
        <header class="saved-detail-page__header">
          <button
            type="button"
            data-detail-back-button
            aria-label="저장 목록으로 돌아가기"
          >
            ‹
          </button>

          <h1>측정 상세</h1>
          <span></span>
        </header>

        <main class="saved-detail-page__content">
          <p>측정 결과를 찾을 수 없습니다.</p>
        </main>
      </div>
    `;
  }

  return `
    <div class="saved-detail-page">
      <header class="saved-detail-page__header">
        <button
          type="button"
          data-detail-back-button
          aria-label="저장 목록으로 돌아가기"
        >
          ‹
        </button>

        <h1>측정 상세</h1>
        <span></span>
      </header>

      <main class="saved-detail-page__content">
        <article class="saved-detail-card">
          <time datetime="${measurement.savedAt}">
            ${formatSavedDate(measurement.savedAt)}
          </time>

          <div
            id="saved-detail-map"
            class="saved-detail-map"
            aria-label="저장된 토지 경계 지도"
          ></div>


          <div class="saved-detail-card__address">
            <span>지도 기준 위치</span>

            <strong>
              ${
                measurement.shortAddress ??
                measurement.fullAddress ??
                '주소 정보 없음'
              }
            </strong>
          </div>


          <div class="saved-detail-card__area">
            <span>면적</span>

            <strong>
              ${measurement.area.toLocaleString()} m²
            </strong>

            <small>
              약 ${measurement.pyeong.toLocaleString()}평
            </small>
          </div>

          <p>
            경계선 총길이
              <strong>
                ${measurement.perimeter?.toLocaleString() ?? '-'}m
              </strong>
          </p>

          <p>
            선택한 경계점
            <strong>${measurement.pointCount}개</strong>
          </p>
        </article>

        <small class="saved-detail-card__attribution">
          주소 데이터 © OpenStreetMap contributors
        </small>
      </main>
    </div>
  `;
}

export function initSavedDetailPage(navigate) {
  const backButton = document.querySelector('[data-detail-back-button]');

  const mapElement = document.querySelector('#saved-detail-map');

  if (!backButton) {
    return;
  }

  const searchParams = new URLSearchParams(window.location.search);

  const measurementId = Number(searchParams.get('id'));

  const measurement = getSavedMeasurementById(measurementId);

  if (mapElement && measurement && Array.isArray(measurement.boundaryPoints)) {
    createBoundaryPreviewMap(mapElement, measurement.boundaryPoints);
  }

  backButton.addEventListener('click', () => {
    navigate('/saved');
  });
}
