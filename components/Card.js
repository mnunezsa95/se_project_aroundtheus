import { openModal } from "../utils/utils.js";
import { previewImageModal, previewImageCaption, previewImageElement } from "../utils/constants.js";

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
    openModal(previewImageModal);
    previewImageElement.src = this._link;
    previewImageElement.alt = this._name;
    previewImageCaption.textContent = this._name;
  }

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
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}
