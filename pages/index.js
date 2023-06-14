// Import Card class
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { initialCards, profileEditButton, inputSelector, addNewCardButton } from "../utils/constants.js";

// ! Keep This Code
// ------Profile Query Selelctors------ //
const profileEditModal = document.querySelector("#edit-modal");
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");
// const profileTitleInput = document.querySelector("#profile-title-input");
// const profileDescriptionInput = document.querySelector("#profile-description-input");

// ------Card Query Selectors------ //
const cardList = document.querySelector(".card__list");

// ! Keep This Code
// ------Card & Image Modal Query Selectors------ //
const cardModal = document.querySelector("#add-modal");
const addCardForm = document.forms["add-card-form"];
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");

// ! Keep This Code
// ------Form Validation------ //
const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button-inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

const editProfileFormValidator = new FormValidator(config, profileEditModal);
const addCardFormValidator = new FormValidator(config, cardModal);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const newCardPopup = new PopupWithForm("#add-modal", () => {});

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

const editProfilePopup = new PopupWithForm("#edit-modal", () => {});

profileEditButton.addEventListener("click", () => {
  editProfilePopup.open();
});

// ! Keep This Code ------Modal Functions------ //
// function openProfileModal() {
//   profileTitleInput.value = profileTitle.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
//   openModal(profileEditModal);
// }

function submitProfileForm(evt) {
  evt.preventDefault();
  closeModal(profileEditModal);
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

function submitCardForm(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = new Card({ name, link }, "#card-template").generateCard();
  cardList.prepend(cardElement);
  closeModal(cardModal);
  addCardForm.reset();
  addCardFormValidator.toggleButtonState();
}

// ! Keep This Code
// ------Loop to Create New Cards------ //
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template").generateCard();
  cardList.append(card);
});
