// Import Card class
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, profileEditModalSelector, profileEditButton, cardModalSelector, addNewCardButton, config, inputSelector } from "../utils/constants.js";

// ------Profile Query Selelctors------ //
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");
// const profileTitleInput = document.querySelector("#profile-title-input");
// const profileDescriptionInput = document.querySelector("#profile-description-input");

// ------Card Query Selectors------ //
const cardList = document.querySelector(".card__list");

// ! Keep This Code
// ------Card & Image Modal Query Selectors------ //
const addCardForm = document.forms["add-card-form"];
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");

// ! Keep This Code
const editProfileFormValidator = new FormValidator(config, profileEditModalSelector);
const addCardFormValidator = new FormValidator(config, cardModalSelector);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/* ---------------------------------------------------------------------------------------------- */
/*                                            Instances                                           */
/* ---------------------------------------------------------------------------------------------- */
const userInfo = new UserInfo(".profile__title", ".profile__description");

const newCardPopup = new PopupWithForm(cardModalSelector, (inputValues) => {
  // const newCardData = {name, link};
  // const newCard =
});
addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

const editProfilePopup = new PopupWithForm(profileEditModalSelector, (inputValues) => {
  userInfo.setUserInfo(inputValues.title, inputValues.description);
  editProfilePopup.close();
});

profileEditButton.addEventListener("click", () => {
  editProfilePopup.open();
});

function submitProfileForm(evt) {
  evt.preventDefault();
  closeModal(profileEditModalSelector);
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

function submitCardForm(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = new Card({ name, link }, "#card-template").generateCard();
  cardList.prepend(cardElement);
  closeModal(cardModalSelector);
  addCardForm.reset();
  addCardFormValidator.toggleButtonState();
}

// ! Keep This Code
// ------Loop to Create New Cards------ //
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template").generateCard();
  cardList.append(card);
});
