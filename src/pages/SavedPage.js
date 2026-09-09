import {
  BottomNavigation,
  initBottomNavigation,
} from '../components/BottomNavigation.js';

import {
  deleteSavedMeasurement,
  getSavedMeasurements,
} from '../services/saveMeasurementService.js';

import { AREA_UNIT, getAreaUnit } from '../services/settingsService.js';

import { DeleteConfirmModal } from '../components/DeleteConfirmModal.js';

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
  const areaUnit = getAreaUnit();
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
                <p class="saved-card__address">
                📍 ${measurement.shortAddress ?? '주소 정보 없음'}
                </p>
                <time datetime="${measurement.savedAt}">
                  ${formatSavedDate(measurement.savedAt)}
                </time>

                <strong>
                  ${measurement.area.toLocaleString()} m²
                </strong>

              <span>
                ${
                  areaUnit === AREA_UNIT.BOTH
                    ? `약 ${measurement.pyeong.toLocaleString()}평 ·`
                    : ''
                }

              경계선 총길이 ${measurement.perimeter?.toLocaleString() ?? '-'}m ·

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
          ${DeleteConfirmModal()}

    </div>
  `;
}

export function initSavedPage(navigate) {
  const backButton = document.querySelector('[data-saved-back-button]');

  const deleteModal = document.querySelector('[data-delete-modal]');
  const cancelDeleteButton = document.querySelector('[data-delete-cancel]');
  const confirmDeleteButton = document.querySelector('[data-delete-confirm]');

  const deleteButtons = document.querySelectorAll(
    '[data-delete-measurement-id]',
  );

  const detailButtons = document.querySelectorAll('[data-view-measurement-id]');

  if (
    !backButton ||
    !deleteModal ||
    !cancelDeleteButton ||
    !confirmDeleteButton
  ) {
    console.error('저장 목록 화면 요소를 찾을 수 없습니다.');
    return;
  }

  initBottomNavigation(navigate);

  let selectedMeasurementId = null;

  // 삭제 모달 열기
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectedMeasurementId = Number(button.dataset.deleteMeasurementId);

      deleteModal.hidden = false;
      document.body.classList.add('is-modal-open');
    });
  });

  // 삭제 취소
  cancelDeleteButton.addEventListener('click', () => {
    selectedMeasurementId = null;

    deleteModal.hidden = true;
    document.body.classList.remove('is-modal-open');
  });

  // 삭제 확인
  confirmDeleteButton.addEventListener('click', () => {
    if (selectedMeasurementId === null) {
      return;
    }

    deleteSavedMeasurement(selectedMeasurementId);

    selectedMeasurementId = null;
    deleteModal.hidden = true;
    document.body.classList.remove('is-modal-open');

    navigate('/saved');
  });

  // 홈으로 이동
  backButton.addEventListener('click', () => {
    navigate('/');
  });

  // 상세 화면 이동
  detailButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const measurementId = button.dataset.viewMeasurementId;

      navigate(`/saved-detail?id=${measurementId}`);
    });
  });
}
