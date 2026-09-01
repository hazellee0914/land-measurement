export function HelpModal() {
  return `
    <div
      class="help-modal"
      data-help-modal
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
      hidden
    >
      <div class="help-modal__content">
        <button
          class="help-modal__close"
          type="button"
          data-help-close-button
          aria-label="사용 방법 닫기"
        >
          ×
        </button>

        <h2 id="help-modal-title">사용 방법</h2>

        <ol class="help-modal__steps">
          <li>
            <span class="help-modal__number">1</span>

            <div>
              <strong>현재 위치를 확인합니다.</strong>
              <p>
                위치 확인 버튼을 눌러 GPS를 준비해주세요.
              </p>
            </div>
          </li>

          <li>
            <span class="help-modal__number">2</span>

            <div>
              <strong>토지 경계점을 찍습니다.</strong>
              <p>
                지도에서 토지 모서리를 순서대로 눌러주세요.
              </p>
            </div>
          </li>

          <li>
            <span class="help-modal__number">3</span>

            <div>
              <strong>측정을 완료합니다.</strong>
              <p>
                점을 3개 이상 찍고 측정 완료를 눌러주세요.
              </p>
            </div>
          </li>

          <li>
            <span class="help-modal__number">4</span>

            <div>
              <strong>결과를 저장합니다.</strong>
              <p>
                면적과 둘레를 확인하고 목록에 저장할 수 있습니다.
              </p>
            </div>
          </li>
        </ol>

        <button
          class="help-modal__confirm"
          type="button"
          data-help-confirm-button
        >
          확인
        </button>
      </div>
    </div>
  `;
}

export function initHelpModal() {
  const modal = document.querySelector('[data-help-modal]');

  const openButton = document.querySelector('[data-help-open-button]');

  const closeButton = document.querySelector('[data-help-close-button]');

  const confirmButton = document.querySelector('[data-help-confirm-button]');

  if (!modal || !openButton || !closeButton || !confirmButton) {
    return;
  }

  function openModal() {
    modal.hidden = false;
    document.body.classList.add('is-modal-open');

    closeButton.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('is-modal-open');

    openButton.focus();
  }

  openButton.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);
  confirmButton.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  modal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
}
