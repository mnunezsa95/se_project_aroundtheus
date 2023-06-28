import Popup from "../components/Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector }); // creates the popup element
    this._handleFormSubmit = handleFormSubmit;
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
    this._popupElement.removeEventListener("submit", this._handleFormSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("click", () => {
      this._handleFormSubmit();
    });
  }
}
