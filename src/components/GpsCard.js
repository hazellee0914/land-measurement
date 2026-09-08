export function GpsCard() {
  return `
    <section class="gps-card">
      <div class="gps-card__icon" aria-hidden="true" data-gps-icon
>
        ✓
      </div>

      <h2 class="gps-card__title" data-gps-title>
        GPS 준비 확인
      </h2>

      <p class="gps-card__description" data-gps-description>
        위치 확인 버튼을 눌러주세요.
      </p>

      <button
        class="gps-card__location-button"
        type="button"
        data-location-button
      >
        현재 위치 확인
      </button>

      <button
        class="gps-card__start-button"
        type="button"
        data-start-button
        disabled
      >
        측정 시작
      </button>

      <button
        class="gps-card__demo-button"
        type="button"
        data-demo-button
        hidden
      >
        기본 위치에서 시작하기
      </button>
    </section>
  `;
}
