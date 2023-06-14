import Popup from "./Popup.js";
import { previewImageElement, previewImageCaption, previewImageModal } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open({ name, link }) {
    super.open();
    previewImageElement.src = this._link;
    previewImageElement.alt = this._name;
    previewImageCaption.textContent = this._name;
  }

  close() {
    super.close();
  }
}
