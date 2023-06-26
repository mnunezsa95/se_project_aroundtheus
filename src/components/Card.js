export default class Card {
  constructor({ name, link, _id, likes }, cardSelector, handleCardClick, handleDeletePopup, myID) {
    this._name = name;
    this._link = link;
    // this.myID = myID;
    this.likes = likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeletePopup = handleDeletePopup;
    this.imageID = _id;
  }

  _getTemplate() {
    this._cardElement = document.querySelector(this._cardSelector).content.querySelector(".card__list-item").cloneNode(true);
    return this._cardElement;
  }

  _fillCardTemplate() {
    const imageElement = this._cardElement.querySelector(".card__image");
    imageElement.alt = this._name;
    imageElement.src = this._link;
    this._cardElement.id = this.imageID;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    if (this.myID !== this.ownerId) {
      this._cardElement.querySelector(".card__delete-button");
    }
  }

  _getData() {
    const cardPassed = this;
    const data = {
      name: this.name,
      link: this.link,
      imageID: this.imageID,
      card: cardPassed,
    };
    return data;
  }

  //handleLikeButton
  _handleToggleLikeButton() {
    this._cardElement.querySelector(".card__like-button").classList.toggle("card__like-button_active");
  }
  //handleDeleteButton
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      this._handleToggleLikeButton();
    });

    if (this.myID === this.ownerId) {
      const deleteButton = this._cardElement.querySelector(".card__delete-button");
      deleteButton.addEventListener("click", () => {
        this._handleDeletePopup(this._getData());
      });
    }

    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._getData());
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._fillCardTemplate();
    this._setEventListeners();
    return this._element;
  }
}
