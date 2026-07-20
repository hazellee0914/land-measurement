import { Header } from '../components/Header.js';
import { BottomNavigation } from '../components/BottomNavigation.js';
import { GpsCard } from '../components/GpsCard.js';
import { getCurrentPosition } from '../services/gpsService.js';

export function HomePage() {
  return `
  <div class="home-page">${Header()}
    <main class="home-page__content">
      <section class="map-preview" aria-label="현재 위치 지도">
      <p class="map-preview__message" data-map-message>
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

// 동작 함수
export function initHomePage(navigate) {
  // 요소 찾기
  const locationButton = document.querySelector('[data-location-button]');

  const startButton = document.querySelector('[data-start-button]');

  const demoButton = document.querySelector('[data-demo-button]');

  const gpsTitle = document.querySelector('[data-gps-title]');

  const gpsDescription = document.querySelector('[data-gps-description]');

  const gpsIcon = document.querySelector('[data-gps-icon]');

  const mapMessage = document.querySelector('[data-map-message]');

  const gpsCard = document.querySelector('.gps-card');

  // 나머지 요소 찾기...
  if (
    !locationButton ||
    !startButton ||
    !demoButton ||
    !gpsTitle ||
    !gpsDescription ||
    !gpsIcon ||
    !gpsCard ||
    !mapMessage
  ) {
    console.error('홈 화면 요소를 찾을 수 없습니다.', {
      locationButton,
      startButton,
      demoButton,
      gpsTitle,
      gpsDescription,
      gpsIcon,
      gpsCard,
      mapMessage,
    });
    return;
  }

  locationButton.addEventListener('click', async () => {
    // GPS 확인 기능
    locationButton.disabled = true;
    locationButton.textContent = '위치를 확인하고 있습니다...';

    gpsDescription.textContent = '잠시만 기다려주세요.';

    try {
      const position = await getCurrentPosition();

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log('위도:', latitude);
      console.log('경도:', longitude);

      gpsIcon.textContent = '✓';
      gpsTitle.textContent = 'GPS 준비 완료';
      gpsDescription.textContent = '현재 위치를 확인했습니다.';
      mapMessage.textContent = '📍 현재 위치입니다';

      locationButton.textContent = '위치 확인 완료';
      startButton.disabled = false;

      // 이전 실패 상태 제거
      gpsCard.classList.remove('is-error');

      // 성공 상태 추가
      gpsCard.classList.add('is-ready');
    } catch (error) {
      console.warn('위치 확인 실패:', error.message);

      gpsIcon.textContent = '!';

      gpsTitle.textContent = '위치를 확인할 수 없습니다';

      gpsDescription.textContent =
        '위치 권한을 확인하거나 현재 위치에서 시작해주세요.';

      locationButton.textContent = '다시 위치 확인';
      locationButton.disabled = false;

      demoButton.hidden = false;

      // 이전 성공 상태 제거
      gpsCard.classList.remove('is-ready');

      // 실패 상태 추가
      gpsCard.classList.add('is-error');
    }
  });

  demoButton.addEventListener('click', () => {
    // 기본 위치 기능
    // 실패 아이콘을 체크 아이콘으로 변경
    gpsIcon.textContent = '✓';
    gpsTitle.textContent = '기본 위치 준비 완료';

    gpsDescription.textContent = '기본 지도 위치에서 측정을 시작합니다.';

    mapMessage.textContent = '📍 기본 위치입니다';

    startButton.disabled = false;
    demoButton.hidden = true;

    gpsCard.classList.remove('is-error');
    gpsCard.classList.add('is-ready');
  });

  startButton.addEventListener('click', () => {
    if (startButton.disabled) {
      return;
    }

    navigate('/measurement');
  });
}
