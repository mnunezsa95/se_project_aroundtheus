let initialCards = [
  {
    name: "New Orleans",
    link: "https://images.unsplash.com/photo-1571893544028-06b07af6dade?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
  },
  {
    name: "Boston",
    link: "https://images.unsplash.com/photo-1613937657470-c0a312757c7f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    name: "Chicago",
    link: "https://images.unsplash.com/photo-1596250410216-1ac77dc208e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "Philadelphia",
    link: "https://images.unsplash.com/photo-1623275411247-69395307a9c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
  {
    name: "Miami",
    link: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    name: "NYC",
    link: "https://images.unsplash.com/photo-1532960401447-7dd05bef20b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  },
];

// selecting Profile Modal
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const profileCloseButton = document.querySelector(
  "#modal__close-profile-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

// card template querySelectors
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card__list-item");
const cardListAdd = document.querySelector(".card__list");

// selecting Add Card Modal
const addNewCardButton = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#add-modal");
const closeCardModalButton = document.querySelector(
  "#modal__close-card-button"
);
const addCardForm = cardModal.querySelector(".modal__form");
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");

// open modal function
function modalProfileOpen() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
}

// close modal function
function modalProfileClose() {
  profileEditModal.classList.remove("modal_opened");
}

// open add card function
function addCardModalOpen() {
  cardModal.classList.add("modal_opened");
}

// close add card function
function addCardModalClose() {
  cardModal.classList.remove("modal_opened");
}

// submit profile modal function
function profileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  modalProfileClose();
}

// submit add card modal function
function addCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = getCardElement({ name, link });
  cardListAdd.prepend(cardElement);
  addCardModalClose();
}

initialCards.forEach(function (card) {
  const data = card;
  const cardElement = getCardElement(data);
  cardListAdd.append(cardElement);
});

// event listeners for profile title & description
profileEditButton.addEventListener("click", modalProfileOpen);
profileCloseButton.addEventListener("click", modalProfileClose);
profileEditForm.addEventListener("submit", profileFormSubmit);

// event listeners for adding card
addNewCardButton.addEventListener("click", addCardModalOpen);
closeCardModalButton.addEventListener("click", addCardModalClose);
addCardForm.addEventListener("submit", addCardFormSubmit);

// get cards function
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardAltTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  function activeLikeButton() {
    likeButton.classList.toggle("card__like-button_active");
  }
  likeButton.addEventListener("click", activeLikeButton);

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  function deleteCard() {
    const cardListItem = cardDeleteButton.closest(".card__list-item");
    cardListItem.remove();
  }
  cardDeleteButton.addEventListener("click", deleteCard);

  const imageModal = document.querySelector("#preview-modal");
  const imageElement = cardElement.querySelector(".card__image");
  function previewImageModal() {
    const previewImageElement = document.querySelector(".modal__preview-image");
    const previewImageCaption = imageModal.querySelector(
      ".modal__preview-caption"
    );
    previewImageElement.src = data.link;
    previewImageElement.alt = data.name;
    imageModal.classList.toggle("modal_opened");
    previewImageCaption.textContent = data.name;
  }
  imageElement.addEventListener("click", previewImageModal);

  const cardPreviewCloseButton = document.querySelector(
    ".modal__close-button-image"
  );
  function closeCardPreview() {
    imageModal.classList.remove("modal_opened");
  }
  cardPreviewCloseButton.addEventListener("click", closeCardPreview);

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  return cardElement;
}
