export function DeleteConfirmModal() {
  return `
    <div
      class="delete-modal"
      data-delete-modal
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      hidden
    >
      <div class="delete-modal__content">
        <div class="delete-modal__icon">!</div>

        <h2 id="delete-modal-title">
          측정 결과 삭제
        </h2>

        <p>
          이 측정 결과를 삭제하시겠습니까?<br />
          삭제한 결과는 복구할 수 없습니다.
        </p>

        <div class="delete-modal__buttons">
          <button
            class="delete-modal__cancel"
            type="button"
            data-delete-cancel
          >
            취소
          </button>

          <button
            class="delete-modal__confirm"
            type="button"
            data-delete-confirm
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  `;
}
