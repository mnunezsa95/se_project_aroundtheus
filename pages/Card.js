import { openModal, closeModal, closeByEscape } from "../utils/utils.js";

const imageModal = document.querySelector("#preview-modal");
const previewImageElement = document.querySelector(".modal__preview-image");
const previewImageCaption = imageModal.querySelector(".modal__preview-caption");

export default class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".card__list-item").cloneNode(true);
    return this._cardElement;
  }

  //handleLikeButton
  _toggleLikeButton() {
    this._cardElement.querySelector(".card__like-button").classList.add("card__like-button_active");
  }
  //handleDeleteButton
  _deleteCard() {
    this._cardElement.remove();
  }

  //handleOpenPicturePreview
  _openImageModal() {
    openModal(imageModal);
    previewImageElement.src = this._link;
    previewImageElement.alt = this._name;
    previewImageCaption.textContent = this._name;
  }

  //handleClosePicturePreview
  _closeImageModal() {}

  _setEventListeners() {
    // like card button event listener
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      this._toggleLikeButton();
    });

    // delete card event listener
    const deleteButton = this._cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });

    // open card event listener
    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._openImageModal();
    });

    // close card event listener
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}