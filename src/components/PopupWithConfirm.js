import Popup from "../components/Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector }); // creates the popup element
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = document.querySelector(".modal__form");
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setLoading(isLoading, submitSave) {
    if (isLoading) {
      this._popupElement.querySelector(".modal__save-button").textContent = "Deleting...";
    } else {
      this._popupElement.querySelector(".modal__save-button").textContent = submitSave;
    }
  }

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", _handleFormSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", _handleFormSubmit);
  }
}
