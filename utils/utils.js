function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
  document.addEventListener("mousedown", closeViaOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
  document.removeEventListener("mousedown", closeViaOverlay);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}

// Overlay click to exit modals
function closeViaOverlay(evt) {
  if (!evt.target.closest(".modal__container")) {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}

export { openModal, closeModal, closeByEscape };
