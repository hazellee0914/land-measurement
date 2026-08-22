import { getBoundaryPoints } from '../services/measurementService.js';

export function ResultPage() {
  const boundaryPoints = getBoundaryPoints();

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

  if (!backButton) {
    return;
  }

  backButton.addEventListener('click', () => {
    navigate('/measurement');
  });
}
