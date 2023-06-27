export default class Card {
  constructor({ name, link, likes, _id, userId, myId }, cardSelector, handleCardClick, handleDeleteClick, handleCardlike) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._myId = myId;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardlike = handleCardlike;
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
  }

  _getData() {
    const cardPassed = this;
    const data = {
      name: this._name,
      link: this._link,
      card: cardPassed,
    };
    return data;
  }

  getId() {
    return this._id;
  }

  _isLiked() {
    return this._likes.some((like) => {
      like._id === this._myId;
    });
  }

  setLikes(likes) {
    this._likes = likes;
    this._handleLikeIcon();
    this._renderLikes();
  }

  renderLikes() {
    this._cardElement.querySelector(".card__like-counter").textContent = this._likes.length;
  }

  _handleLikeClick() {
    if (this._isLiked()) {
      this._cardElement.querySelector(".card__like-button").classList.add("card__like-button_active");
    } else {
      this._cardElement.querySelector(".card__like-button").classList.remove("card__like-button_active");
    }
  }

  //handleDeleteButton
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    const deleteButton = this._cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleDeleteClick(this);
    });

    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._getData());
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._fillCardTemplate();
    this._setEventListeners();
    this.renderLikes();
    this._handleLikeClick();
    this._handleDeleteCard();
    return this._element;
  }
}
