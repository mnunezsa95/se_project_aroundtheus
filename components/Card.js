import { openModal } from "../utils/utils.js";
import { previewImageCaption, previewImageElement } from "../utils/constants.js";

export default class Card {
  constructor(cardData, cardSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    previewImageElement.src = this._link;
    previewImageElement.alt = this._name;
    previewImageCaption.textContent = this._name;
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      this._toggleLikeButton();
    });

    const deleteButton = this._cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });

    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick;
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
