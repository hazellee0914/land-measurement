import { Header } from '../components/Header.js';
import { BottomNavigation } from '../components/ButtomNavigation.js';
import { GpsCard } from '../components/GpsCard.js';

export function HomePage() {
  return `
  <div class="home-page">${Header()}
    <main class="home-page__content">
      <section class="map-preview" aria-label="현재 위치 지도">
      <p class="map-preview__message">
          📍 현재 위치입니다
      </p>

      <div class="map-preview__location" aria-label="현재 위치"></div>
      </section>
      ${GpsCard()}
    </main>
    ${BottomNavigation()}
  </div>
  
  `;
}
