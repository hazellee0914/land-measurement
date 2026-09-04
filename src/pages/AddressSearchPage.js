import { searchAddress } from '../services/geocodingService.js';
import { savePosition } from '../services/positionService.js';

export function AddressSearchPage() {
  return `
    <div class="address-search-page">
      <header class="address-search-page__header">
        <button
          type="button"
          class="address-search-page__back-button"
          data-address-back-button
          aria-label="뒤로 가기"
        >
          ‹
        </button>

        <h1>주소로 찾기</h1>

        <span></span>
      </header>

      <main class="address-search-page__content">
        <h2>측정할 토지의 주소를 입력하세요</h2>

        <p>
          도로명 또는 지번 주소로 검색할 수 있습니다.
        </p>

        <form
          class="address-search-form"
          data-address-search-form
        >
          <label for="address-input">
            주소
          </label>

          <div class="address-search-form__row">
            <input
              id="address-input"
              type="search"
              placeholder="예: 함평군 나산면 초포리 123"
              autocomplete="street-address"
              data-address-input
            />

            <button type="submit">
              검색
            </button>
          </div>
        </form>

        <section
          class="address-search-results"
          data-address-search-results
          aria-live="polite"
        ></section>
      </main>
    </div>
  `;
}

export function initAddressSearchPage(navigate) {
  const backButton = document.querySelector('[data-address-back-button]');

  const searchForm = document.querySelector('[data-address-search-form]');

  const addressInput = document.querySelector('[data-address-input]');

  const resultsContainer = document.querySelector(
    '[data-address-search-results]',
  );

  const searchButton = searchForm?.querySelector('button[type="submit"]');

  if (
    !backButton ||
    !searchForm ||
    !addressInput ||
    !resultsContainer ||
    !searchButton
  ) {
    console.error('주소 검색 화면 요소를 찾을 수 없습니다.');
    return;
  }

  backButton.addEventListener('click', () => {
    navigate('/');
  });

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = addressInput.value.trim();

    if (!query) {
      resultsContainer.textContent = '주소를 입력해주세요.';
      addressInput.focus();
      return;
    }

    searchButton.disabled = true;
    searchButton.textContent = '검색 중';
    resultsContainer.textContent = '주소를 검색하고 있습니다.';

    try {
      const results = await searchAddress(query);

      resultsContainer.replaceChildren();

      if (results.length === 0) {
        resultsContainer.textContent =
          '검색 결과가 없습니다. 주소를 조금 더 자세히 입력해주세요.';

        return;
      }

      results.forEach((result) => {
        const resultCard = document.createElement('article');
        resultCard.className = 'address-result-card';

        const addressText = document.createElement('p');
        addressText.textContent = result.displayName;

        const selectButton = document.createElement('button');
        selectButton.type = 'button';
        selectButton.textContent = '이 위치에서 측정';
        selectButton.className = 'address-result-card__button';

        selectButton.addEventListener('click', () => {
          savePosition({
            latitude: result.latitude,
            longitude: result.longitude,
            address: result.displayName,
          });

          navigate('/measurement');
        });

        resultCard.append(addressText, selectButton);
        resultsContainer.append(resultCard);
      });
    } catch (error) {
      console.error('주소 검색 실패:', error);

      resultsContainer.textContent =
        '주소를 검색하지 못했습니다. 잠시 후 다시 시도해주세요.';
    } finally {
      searchButton.disabled = false;
      searchButton.textContent = '검색';
    }
  });
}
