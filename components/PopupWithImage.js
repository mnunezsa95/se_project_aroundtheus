import Popup from "./Popup.js";
import { previewImageElement, previewImageCaption, previewImageModal } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open(name, link) {
    this.name = previewImageCaption.textContent;
    this.link = previewImageElement.src;
    this.name = previewImageElement.alt;
    super.open();
  }

  close() {
    super.close();
  }
}
