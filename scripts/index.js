let initialCards = [
  {
    name: "New Orleans",
    link: "./images/new-orleans.jpg",
  },
  {
    name: "Boston",
    link: "./images/boston.jpg",
  },
  {
    name: "Chicago",
    link: "./images/chicago-skyline.jpg",
  },
  {
    name: "Philly",
    link: "./images/philly.jpg",
  },
  {
    name: "Miami",
    link: "./images/miami-beach.jpg",
  },
  {
    name: "NYC",
    link: "./images/nyc-skyline.jpg",
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

// submit modal function
function profileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  modalProfileClose();
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
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  console.log(cardElement);
  return cardElement;
}
