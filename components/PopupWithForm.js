import Popup from "../components/Popup.js";
import { inputSelector } from "../utils/constants.js";

export default class PopupWithFrom extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector }); // creates the popup element
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form"); // selects modal form for specific instance of this obj
  }

  open() {
    super.open();
  }

  close() {
    this._popupForm.reset();
    super.close();
    this._popupElement.removeEventListener("submit", this._handleFormSubmit);
  }

  _getInputValues() {
    const inputsObject = {}; // object for storing data
    this._inputList = document.querySelectorAll(inputSelector);
    this._inputList.forEach((input) => {
      if (input.value !== "") {
        inputsObject[input.name] = input.value;
      }
    });
    return inputsObject;
  }

  _submitForm = () => {
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", this._handleFormSubmit);
  }
}
