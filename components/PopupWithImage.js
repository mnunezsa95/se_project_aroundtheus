import Popup from "./Popup.js";
import { previewImage, previewImageCaption, previewImageModal } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open({ name, link }) {
    previewImageCaption.textContent = this._name;
    previewImage.src = this._link;
    previewImage.alt = this._name;
    super.open();
  }

  close() {
    super.close();
  }
}
