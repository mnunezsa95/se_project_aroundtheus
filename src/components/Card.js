export default class Card {
  constructor({ name, link, likes, _id, userId }, myId, cardSelector, handleCardClick, handleDeleteClick, handleCardlike) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._myId = myId;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardLike = handleCardlike;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector(".card__list-item").cloneNode(true);
  }

  _fillCardTemplate() {
    const imageElement = this._element.querySelector(".card__image");
    imageElement.alt = this._name;
    imageElement.src = this._link;
    this._element.id = this.imageID;
    this._element.querySelector(".card__title").textContent = this._name;
  }

  _getData() {
    const data = {
      name: this._name,
      link: this._link,
    };
    return data;
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._likes.some((like) => {
      return like._id === this._myId;
    });
  }

  setLikes(likes) {
    this._likes = likes;
    this.renderLikes();
  }

  renderLikes() {
    this._element.querySelector(".card__like-counter").textContent = this._likes.length;
  }

  _handleLikeClick() {
    this._element.querySelector(".card__like-counter").textContent = this._likes.length;
    if (this.isLiked()) {
      this._element.querySelector(".card__like-button").classList.toggle("card__like-button_active");
    }
  }

  _handleLikeIcon() {
    this._handleCardLike({ _id: this._id, likes: this._likes });
    this.renderLikes();
    this._handleLikeClick();
  }

  remove() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    const deleteButton = this._element.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleDeleteClick(this._id);
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
    return this._element;
  }
}
