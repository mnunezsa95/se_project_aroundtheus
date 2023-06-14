import Popup from "./Popup.js";
import { previewImageElement, previewImageCaption, previewImageModal } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open({ name, link }) {
    previewImageCaption.textContent = name;
    previewImageElement.src = link;
    previewImageElement.alt = name;
    super.open();
  }

  close() {
    super.close();
  }
}
