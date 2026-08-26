import { getBoundaryPoints } from '../services/measurementService.js';
import { calculateArea } from '../utils/calculator.js';
import { saveMeasurement } from '../services/saveMeasurementService.js';

export function ResultPage() {
  const boundaryPoints = getBoundaryPoints();

  const area = calculateArea(boundaryPoints);
  const roundedArea = Math.round(area);
  const pyeong = Math.round(area / 3.3058);

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
            <small>(약 ${pyeong.toLocaleString()} 평)</small>
          </div>
          <button
              class="result-card__save-button"
              type="button"
              data-save-result-button
            >
              저장
          </button>
          <p>
            선택한 경계점
            <strong>${boundaryPoints.length}개</strong>
          </p>
        </div>
      </main>
    </div>
  `;
}

export function initResultPage(navigate) {
  const backButton = document.querySelector('[data-result-back-button]');

  const saveButton = document.querySelector('[data-save-result-button]');

  if (!backButton || !saveButton) {
    return;
  }

  // 저장 버튼 이벤트 추가
  saveButton.addEventListener('click', () => {
    const boundaryPoints = getBoundaryPoints();

    if (boundaryPoints.length < 3) {
      return;
    }

    const area = Math.round(calculateArea(boundaryPoints));

    const pyeong = Math.round(area / 3.3058);

    saveMeasurement({
      area,
      pyeong,
      pointCount: boundaryPoints.length,
      boundaryPoints,
    });

    saveButton.textContent = '저장 완료';
    saveButton.disabled = true;

    console.log('측정 결과가 저장되었습니다.');

    navigate('/saved');
  });

  // 뒤로 가기 이벤트
  backButton.addEventListener('click', () => {
    navigate('/measurement');
  });
}
