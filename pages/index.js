// Import Card class
import Card from "./Card.js";
import { openModal, closeModal, closeByEscape } from "../utils/utils.js";

// ! Keep This Code
const initialCards = [
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

// ! Keep This Code
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
const cardList = document.querySelector(".card__list");

// ! Keep This Code
// selecting Add Card Modal
const addNewCardButton = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#add-modal");
const closeCardModalButton = document.querySelector(
  "#modal__close-card-button"
);
const addCardForm = cardModal.querySelector(".modal__form");
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");
const modalSaveButton = addCardForm.querySelector(".modal__save-button");

// modal functions
function openProfileModal() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
}

function closeProfileModal() {
  closeModal(profileEditModal);
}

function openCardModal() {
  openModal(cardModal);
}

function closeCardModal() {
  closeModal(cardModal);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeProfileModal();
}

function submitCardForm(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = getCardElement({ name, link });
  cardList.prepend(cardElement);
  closeCardModal();
  addCardForm.reset();
  modalSaveButton.classList.add("modal__save-button-inactive");
  modalSaveButton.disabled = true;
}

// event listeners for profile title & description
profileEditButton.addEventListener("click", openProfileModal);
profileCloseButton.addEventListener("click", closeProfileModal);
profileEditForm.addEventListener("submit", submitProfileForm);

// event listeners for adding card
addNewCardButton.addEventListener("click", openCardModal);
closeCardModalButton.addEventListener("click", closeCardModal);
addCardForm.addEventListener("submit", submitCardForm);

// Close Image Modal
const imageModal = document.querySelector("#preview-modal");
const cardPreviewCloseButton = document.querySelector(
  ".modal__close-button-image"
);
function closeCardPreview() {
  closeModal(imageModal);
}
cardPreviewCloseButton.addEventListener("click", closeCardPreview);

// ! Keep This Code
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template").generateCard();
  document.querySelector(".card__list").append(card);
});

// card preview query selectors
// const previewImageElement = document.querySelector(".modal__preview-image");

// universal open/close modal functions
// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", closeByEscape);
//   document.addEventListener("mousedown", closeViaOverlay);
// }

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeByEscape);
//   document.removeEventListener("mousedown", closeViaOverlay);
// }

// Esapce button to exit modal
// function closeByEscape(evt) {
//   if (evt.key === "Escape") {
//     const modalOpened = document.querySelector(".modal_opened");
//     closeModal(modalOpened);
//   }
// }

// Overlay click to exit modals
// function closeViaOverlay(evt) {
//   if (!evt.target.closest(".modal__container")) {
//     const modalOpened = document.querySelector(".modal_opened");
//     closeModal(modalOpened);
//   }
// }

// get cards function
// function getCardElement(data) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardTitle = cardElement.querySelector(".card__title");
//   const cardImage = cardElement.querySelector(".card__image");

// const likeButton = cardElement.querySelector(".card__like-button");
// function toggleLikeButton() {
//   likeButton.classList.toggle("card__like-button_active");
// }
// likeButton.addEventListener("click", toggleLikeButton);

// const cardDeleteButton = cardElement.querySelector(".card__delete-button");
// function deleteCard() {
//   const cardListItem = cardDeleteButton.closest(".card__list-item");
//   cardListItem.remove();
// }
// cardDeleteButton.addEventListener("click", deleteCard);

// function previewImageModal() {
//   const previewImageCaption = imageModal.querySelector(
//     ".modal__preview-caption"
//   );
//   previewImageElement.src = data.link;
//   previewImageElement.alt = data.name;
//   openModal(imageModal);
//   previewImageCaption.textContent = data.name;
// }
// cardImage.addEventListener("click", previewImageModal);
// cardTitle.textContent = data.name;
// cardImage.src = data.link;
// cardImage.alt = data.name;
// return cardElement;
// }