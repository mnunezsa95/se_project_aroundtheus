// Import Card class
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  config,
  profileTitleSelector,
  profileDescriptionSelector,
  profileEditModalSelector,
  profileEditButton,
  cardModalSelector,
  addNewCardButton,
  cardTitleInput,
  cardUrlInput,
  cardList,
  previewImageElement,
} from "../utils/constants.js";

/* ---------------------------------------------------------------------------------------------- */
/*                                         Form Validator                                         */
/* ---------------------------------------------------------------------------------------------- */
const editProfileFormValidator = new FormValidator(config, profileEditModalSelector);
const addCardFormValidator = new FormValidator(config, cardModalSelector);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/* ---------------------------------------------------------------------------------------------- */
/*                                         Profile Classes                                        */
/* ---------------------------------------------------------------------------------------------- */

const userInfo = new UserInfo(profileTitleSelector, profileDescriptionSelector);

const editProfilePopup = new PopupWithForm(profileEditModalSelector, (inputsObject) => {
  userInfo.setUserInfo(inputsObject.title, inputsObject.description);
  editProfilePopup.close();
});

profileEditButton.addEventListener("click", () => {
  editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
});

/* ---------------------------------------------------------------------------------------------- */
/*                                          Section Class                                         */
/* ---------------------------------------------------------------------------------------------- */

const section = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const cardElement = new Card({ name, link }, "#card-template").generateCard();
      section.addItem(cardElement);
    },
  },
  cardList
);

section.renderItems();

/* ---------------------------------------------------------------------------------------------- */
/*                                           Card Class                                           */
/* ---------------------------------------------------------------------------------------------- */

const newCardPopup = new PopupWithForm(cardModalSelector, submitCardForm);

function submitCardForm({ name, link }) {
  name = cardTitleInput.value;
  link = cardUrlInput.value;
  const newCard = new Card({ name, link }, "#card-template").generateCard();
  cardList.prepend(newCard);
  newCardPopup.close();
}

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  newCardPopup.open();
});

/* ---------------------------------------------------------------------------------------------- */
/*                                          Image Classes                                         */
/* ---------------------------------------------------------------------------------------------- */

const previewImagePopup = new PopupWithImage(previewImageElement);
previewImagePopup.open(cardList.name, cardList.link);
