import {
  BottomNavigation,
  initBottomNavigation,
} from '../components/BottomNavigation.js';

import {
  deleteSavedMeasurement,
  getSavedMeasurements,
} from '../services/saveMeasurementService.js';

function formatSavedDate(savedAt) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(savedAt));
}

export function SavedPage() {
  const savedMeasurements = getSavedMeasurements();

  const measurementList =
    savedMeasurements.length === 0
      ? `
        <p class="saved-page__empty">
          저장된 측정 결과가 없습니다.
        </p>
      `
      : savedMeasurements
          .map(
            (measurement) => `
              <article class="saved-card">
                <time datetime="${measurement.savedAt}">
                  ${formatSavedDate(measurement.savedAt)}
                </time>

                <strong>
                  ${measurement.area.toLocaleString()} m²
                </strong>

                <span>
                  약 ${measurement.pyeong.toLocaleString()}평 ·
                  경계점 ${measurement.pointCount}개
                </span>

                <button class="saved-card__detail-button"
                type="button"
                data-view-measurement-id="${measurement.id}"
                >상세 보기</button>

                <button
                  class="saved-card__delete-button"
                  type="button"
                  data-delete-measurement-id="${measurement.id}"
                >
                  삭제
                </button>
              </article>
            `,
          )
          .join('');

  return `
    <div class="saved-page">
      <header class="saved-page__header">
        <button
          type="button"
          data-saved-back-button
          aria-label="홈으로 돌아가기"
        >
          ‹
        </button>

        <h1>저장 목록</h1>
        <span></span>
      </header>

      <main class="saved-page__content">
        ${measurementList}
      </main>

          ${BottomNavigation('saved')}

    </div>
  `;
}

export function initSavedPage(navigate) {
  const backButton = document.querySelector('[data-saved-back-button]');

  if (!backButton) {
    return;
  }

  initBottomNavigation(navigate);

  const deleteButtons = document.querySelectorAll(
    '[data-delete-measurement-id]',
  );

  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const shouldDelete = window.confirm('이 측정 결과를 삭제하시겠습니까?');

      if (!shouldDelete) {
        return;
      }

      const measurementId = Number(button.dataset.deleteMeasurementId);

      deleteSavedMeasurement(measurementId);

      navigate('/saved');
    });
  });

  backButton.addEventListener('click', () => {
    navigate('/');
  });

  const detailButtons = document.querySelectorAll('[data-view-measurement-id]');

  detailButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const measurementId = button.dataset.viewMeasurementId;

      navigate(`/saved-detail?id=${measurementId}`);
    });
  });
}
