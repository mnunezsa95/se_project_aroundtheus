import Popup from "../components/Popup.js";

export default class PopupWithFrom extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  // handleFormSubmit = this._handleFormSubmit;
}
