export function BottomNavigation(activeMenu = 'measurement') {
  return `
    <nav class="bottom-navigation" aria-label="주요 메뉴">
      <button
        class="bottom-navigation__item ${
          activeMenu === 'measurement' ? 'is-active' : ''
        }"
        type="button"
        data-navigation-path="/"
      >
        <span class="bottom-navigation__icon">⌂</span>
        <span>측정</span>
      </button>

      <button
        class="bottom-navigation__item ${
          activeMenu === 'saved' ? 'is-active' : ''
        }"
        type="button"
        data-navigation-path="/saved"
      >
        <span class="bottom-navigation__icon">▤</span>
        <span>목록</span>
      </button>

      <button
        class="bottom-navigation__item ${
          activeMenu === 'settings' ? 'is-active' : ''
        }"
        type="button"
        data-navigation-path="/settings"
      >
        <span class="bottom-navigation__icon">⚙</span>
        <span>설정</span>
      </button>
    </nav>
  `;
}

export function initBottomNavigation(navigate) {
  const navigationButtons = document.querySelectorAll('[data-navigation-path]');

  navigationButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const path = button.dataset.navigationPath;

      navigate(path);
    });
  });
}
