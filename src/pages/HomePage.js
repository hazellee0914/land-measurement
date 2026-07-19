import { Header } from '../components/Header.js';
import { BottomNavigation } from '../components/ButtomNavigation.js';

export function HomePage() {
  return `
  <div class="home-page">${Header()}
    <main>
    <h2>토지면적 측정</h2>
      <p>지도에서 토지 경계점을 선택해보세요</p>
      <button type="button">측정시작</button>
    </main>
    ${BottomNavigation()}
  </div>
  
  `;
}
