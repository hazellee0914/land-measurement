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
        <h2>측정 화면</h2>
        <p>다음 단계에서 실제 지도를 연결합니다.</p>
      </main>
    </div>
  `;
}
