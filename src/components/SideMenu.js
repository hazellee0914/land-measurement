export function SideMenu() {
  return `
    <div
      class="side-menu"
      data-side-menu
      aria-hidden="true"
      hidden
    >
      <aside
        class="side-menu__panel"
        aria-label="전체 메뉴"
      >
        <div class="side-menu__header">
          <h2>전체 메뉴</h2>

          <button
            class="side-menu__close"
            type="button"
            data-menu-close-button
            aria-label="전체 메뉴 닫기"
          >
            ×
          </button>
        </div>

        <nav class="side-menu__navigation">
          <button
            type="button"
            data-menu-path="/"
          >
            <span class="side-menu__icon">⌂</span>

            <span>
              <strong>홈</strong>
              <small>지도 화면으로 이동합니다.</small>
            </span>
          </button>

          <button
            type="button"
            data-menu-path="/saved"
          >
            <span class="side-menu__icon">▤</span>

            <span>
              <strong>저장 목록</strong>
              <small>저장한 측정 결과를 확인합니다.</small>
            </span>
          </button>

          <button
            type="button"
            data-menu-path="/settings"
          >
            <span class="side-menu__icon">⚙</span>

            <span>
              <strong>설정</strong>
              <small>앱 설정을 변경합니다.</small>
            </span>
          </button>

          <button
            type="button"
            data-menu-help-button
          >
            <span class="side-menu__icon">?</span>

            <span>
              <strong>사용 방법</strong>
              <small>토지 측정 방법을 안내합니다.</small>
            </span>
          </button>
        </nav>
      </aside>
    </div>
  `;
}

export function initSideMenu(navigate) {
  const sideMenu = document.querySelector('[data-side-menu]');

  const openButton = document.querySelector('[data-menu-open-button]');

  const closeButton = document.querySelector('[data-menu-close-button]');

  const menuPathButtons = document.querySelectorAll('[data-menu-path]');

  const helpButton = document.querySelector('[data-menu-help-button]');

  const helpOpenButton = document.querySelector('[data-help-open-button]');

  if (!sideMenu || !openButton || !closeButton) {
    return;
  }

  function openMenu() {
    sideMenu.hidden = false;
    sideMenu.setAttribute('aria-hidden', 'false');

    openButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-menu-open');

    closeButton.focus();
  }

  function closeMenu() {
    sideMenu.hidden = true;
    sideMenu.setAttribute('aria-hidden', 'true');

    openButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-menu-open');

    openButton.focus();
  }

  openButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', closeMenu);

  menuPathButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const path = button.dataset.menuPath;

      closeMenu();
      navigate(path);
    });
  });

  if (helpButton && helpOpenButton) {
    helpButton.addEventListener('click', () => {
      closeMenu();
      helpOpenButton.click();
    });
  }

  sideMenu.addEventListener('click', (event) => {
    if (event.target === sideMenu) {
      closeMenu();
    }
  });

  sideMenu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}
