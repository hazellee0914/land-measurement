export function BottomNavigation() {
  return `
    <nav class="bottom-navigatioin" aria-label="주요 메뉴">
      <button
        class="bottom-navigation__item is-active" 
        type="button"
      >
      <span class="bottom-navigation__icon">⌂</span>
      <span>측정</span>
      </button>

      <button
        class="bottom-navigation__item" 
        type="button"
      >
      <span class="bottom-navigation__icon">▤</span>
      <span>목록</span>
      </button>

      <button
        class="bottom-navigation__item" 
        type="button"
      >
      <span class="bottom-navigation__icon">⚙</span>
      <span>설정</span>
      </button>

      
    </nav>
  
  `;
}
