// Import Card class
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal } from "../utils/utils.js";

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
// ------Profile Query Selelctors------ //
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileForm = document.forms["profile-login-form"];

// ------Card Query Selectors------ //
const cardList = document.querySelector(".card__list");

// ! Keep This Code
// ------Card & Image Modal Query Selectors------ //
const addNewCardButton = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#add-modal");
const addCardForm = document.forms["add-card-form"];
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");

// ------Close Buttons Query Selectors------ //
const closeButtons = document.querySelectorAll(".modal__close-button");

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

// ! Keep This Code
// ------Modal Functions------ //
function openProfileModal() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
}

function openCardModal() {
  openModal(cardModal);
}

function submitProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

function submitCardForm(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = new Card({ name, link }, "#card-template").generateCard();
  cardList.prepend(cardElement);
  addCardForm.reset();
  addCardFormValidator.toggleButtonState();
}

// ------Event Listeners for Profile Section------ //
profileEditButton.addEventListener("click", openProfileModal);
profileForm.addEventListener("submit", submitProfileForm);

// ------Event Listeners for Closing ALL buttons------ //
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

// ------Event Listeners for Adding Card------ //
addNewCardButton.addEventListener("click", openCardModal);
addCardForm.addEventListener("submit", submitCardForm);

// ! Keep This Code
// ------Loop to Create New Cards------ //
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template").generateCard();
  cardList.append(card);
});
