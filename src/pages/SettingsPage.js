import {
  BottomNavigation,
  initBottomNavigation,
} from '../components/BottomNavigation';

import {
  AREA_UNIT,
  getAreaUnit,
  saveAreaUnit,
} from '../services/settingsService.js';

export function SettingsPage() {
  const areaUnit = getAreaUnit();

  return `
    <div class="settings-page">
      <header class="settings-page__header">
        <h1>설정</h1>
      </header>

      <main class="settings-page__content">
        <section class="settings-section">
          <h2>면적 표시 단위</h2>

          <label class="settings-option">
            <span>
              <strong>제곱미터와 평</strong>
              <small>면적을 m²와 평으로 함께 표시합니다.</small>
            </span>

            <input
              type="radio"
              name="area-unit"
              value="both"
                ${areaUnit === AREA_UNIT.BOTH ? 'checked' : ''}

            />
          </label>

          <label class="settings-option">
            <span>
              <strong>제곱미터만 표시</strong>
              <small>면적을 m²로만 표시합니다.</small>
            </span>

            <input
              type="radio"
              name="area-unit"
              value="square-meter"
              ${areaUnit === AREA_UNIT.SQUARE_METER ? 'checked' : ''}
            />
          </label>
        </section>

        <section class="settings-section">
          <h2>저장 데이터</h2>

          <button
            class="settings-delete-button"
            type="button"
            data-delete-measurements-button
          >
            저장 목록 전체 삭제
          </button>
        </section>

        <section class="settings-section settings-section--info">
          <h2>앱 정보</h2>
          <p>토지면적 측정 앱</p>
          <span>버전 1.0.0</span>
        </section>
      </main>

      ${BottomNavigation('settings')}
    </div>

  `;
}

export function initSettingsPage(navigate) {
  initBottomNavigation(navigate);

  const areaUnitInputs = document.querySelectorAll('input[name="area-unit"]');

  areaUnitInputs.forEach((input) => {
    input.addEventListener('change', () => {
      if (!input.checked) {
        return;
      }

      saveAreaUnit(input.value);

      console.log('면적 표시 단위:', input.value);
    });
  });
}
