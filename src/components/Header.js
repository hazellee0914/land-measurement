export function Header() {
  return `
    <header class="header">
      <button
      class="header__button"
      type="button"
      aria-label="전체 메뉴 열기"
      >☰</button>
      
      <h1 class="header__title">토지면적 측정</h1>

      <button class="header__help"
        type="button"
        aria-label="사용 방법 보기"
      >?</button>
    </header>
  `;
}
