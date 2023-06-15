export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = popupSelector;
  }

  open() {
    // opens popup
    this._popupElement.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    // closes popup
    this._popupElement.classList.remove("modal_opened");
    this._popupElement.removeEventListener("click", this._closeViaClick);
    document.removeEventListener("keydown", this._closeByEscape);
  }

  _closeByEscape = (evt) => {
    // listens for esc button
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _closeViaClick = (evt) => {
    if (evt.target.classList.contains("modal_opened") || evt.target.classList.contains("modal__close-button")) {
      this.close();
    }
  };

  setEventListeners() {
    // sets event listeners
    document.addEventListener("keydown", this._closeByEscape);
    this._popupElement.addEventListener("click", this._closeViaClick);
  }
}
