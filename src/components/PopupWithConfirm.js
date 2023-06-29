import Popup from "../components/Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector }); // creates the popup element
    this._popupForm = document.querySelector(".modal__form");
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setLoading(isLoading, submitSave) {
    if (isLoading) {
      this._popupForm.querySelector(".modal__save-button").textContent = "Deleting...";
    } else {
      this._popupForm.querySelector(".modal__save-button").textContent = submitSave;
    }
  }

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._handleFormSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
  }
}
