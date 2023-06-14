import Popup from "./Popup.js";
import { previewImage, previewImageCaption, previewImageModal } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open({ name, link }) {
    super.open();
    previewImageCaption = name;
    previewImage.src = link;
    previewImage.alt = name;
  }

  close() {
    super.close();
  }
}
