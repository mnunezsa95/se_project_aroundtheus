export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    // opens popup
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._closeByEscape);
    document.addEventListener("mousedown", closeViaOverlay);
  }

  close() {
    // closes popup
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._closeByEscape);
    document.removeEventListener("mousedown", closeViaOverlay);
  }

  _closeByEscape(evt) {
    // listens for esc button
    if (evt.key === "Escape") {
      const modalOpened = document.querySelector(".modal_opened");
      close(modalOpened);
    }
  }

  setEventListeners() {
    // sets event listeners
  }
}
