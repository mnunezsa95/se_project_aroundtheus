import Popup from "./Popup.js";
import { previewImageElement, previewImageCaption } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open({ name, link }) {
    previewImageElement.alt = name;
    previewImageCaption.textContent = name;
    previewImageElement.src = link;
    super.open();
  }

  close() {
    super.close();
  }
}
