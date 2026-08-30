import {
  clearBoundaryPoints,
  getBoundaryPoints,
} from '../services/measurementService.js';
import { saveMeasurement } from '../services/saveMeasurementService.js';

import { getAddressFromPosition } from '../services/geocodingService.js';

import { AREA_UNIT, getAreaUnit } from '../services/settingsService.js';

import {
  calculateArea,
  calculateCenter,
  calculatePerimeter,
} from '../utils/calculator.js';

export function ResultPage() {
  const boundaryPoints = getBoundaryPoints();

  const area = Math.round(calculateArea(boundaryPoints));
  const roundedArea = Math.round(area);
  const pyeong = Math.round(area / 3.3058);
  const perimeter = Math.round(calculatePerimeter(boundaryPoints));
  const areaUnit = getAreaUnit();

  return `
  
    <div class="result-page">
      <header class="result-page__header">
        <button
          type="button"
          data-result-back-button
          aria-label="측정 화면으로 돌아가기"
        >
          ‹
        </button>

        <h1>측정 결과</h1>
        <span></span>
      </header>

      <main class="result-page__content">
        <div class="result-card">
          <div class="result-card__icon">✓</div>

          <h2>측정이 완료되었습니다!</h2>

          <div class="result-card__area">
            <span>면적</span>
            <strong>${roundedArea.toLocaleString()} m²</strong>
            ${areaUnit === AREA_UNIT.BOTH ? `<small>(약 ${pyeong.toLocaleString()} 평)</small>` : ''}
          </div>

          <div class="result-card__summary">
            <p>
              <span>둘레</span>
              <strong>${perimeter.toLocaleString()}m</strong>
            </p>

            <p>
              <span>경계점</span>
              <strong>${boundaryPoints.length}개</strong>
            </p>
          </div>

          <button
              class="result-card__save-button"
              type="button"
              data-save-result-button
            >
              저장
          </button>
          <button
            class="result-card__retry-button"
            type="button"
            data-retry-measurement-button
          >
            다시 측정
          </button>
        </div>
      </main>
    </div>
  `;
}

export function initResultPage(navigate) {
  const backButton = document.querySelector('[data-result-back-button]');

  const saveButton = document.querySelector('[data-save-result-button]');

  const retryButton = document.querySelector('[data-retry-measurement-button]');

  if (!backButton || !saveButton || !retryButton) {
    return;
  }

  // 저장 버튼 이벤트 추가
  saveButton.addEventListener('click', async () => {
    const boundaryPoints = getBoundaryPoints();

    if (boundaryPoints.length < 3) {
      return;
    }

    const area = Math.round(calculateArea(boundaryPoints));

    const perimeter = Math.round(calculatePerimeter(boundaryPoints));

    const pyeong = Math.round(area / 3.3058);
    const centerPosition = calculateCenter(boundaryPoints);

    let address = {
      shortAddress: '주소 정보 없음',
      fullAddress: '주소 정보 없음',
    };

    try {
      if (centerPosition) {
        address = await getAddressFromPosition(centerPosition);
      }
    } catch (error) {
      console.warn('주소 확인 실패:', error.message);
    }

    saveMeasurement({
      area,
      pyeong,
      perimeter,
      pointCount: boundaryPoints.length,
      boundaryPoints,
      centerPosition,
      shortAddress: address.shortAddress,
      fullAddress: address.fullAddress,
      addressSource: 'OpenStreetMap',
    });

    // 중복 클릭 방지
    saveButton.textContent = '저장 완료';
    saveButton.disabled = true;

    console.log('측정 결과가 저장되었습니다.');

    navigate('/saved');
  });

  retryButton.addEventListener('click', () => {
    const shouldRetry = window.confirm(
      '새로 측정하시겠습니까? 저장하지 않은 현재 결과는 사라집니다.',
    );

    if (!shouldRetry) {
      return;
    }

    clearBoundaryPoints();

    navigate('/measurement');
  });

  // 뒤로 가기 이벤트
  backButton.addEventListener('click', () => {
    navigate('/measurement');
  });
}
