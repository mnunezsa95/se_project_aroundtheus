import "./index.css";

/* ---------------------------------------------------------------------------------------------- */
/*                                             Imports                                            */
/* ---------------------------------------------------------------------------------------------- */
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
  previewImageModal,
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
/*                                Card Functions (Create & Submit)                                */
/* ---------------------------------------------------------------------------------------------- */

function createCard({ name, link }) {
  const cardElement = new Card({ name, link }, "#card-template", submitCardForm);
  return cardElement.generateCard();
}

function submitCardForm({ name, link }) {
  name = cardTitleInput.value;
  link = cardUrlInput.value;
  const newCard = new Card({ name, link }, "#card-template", openCardClick).generateCard();
  cardList.prepend(newCard);
  newCardPopup.close();
}

/* ---------------------------------------------------------------------------------------------- */
/*                                          Section Class                                         */
/* ---------------------------------------------------------------------------------------------- */

const cardListSection = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const newCard = createCard({ name, link });
      cardListSection.addItem(newCard);
    },
  },
  cardList
);

cardListSection.renderItems();

/* ---------------------------------------------------------------------------------------------- */
/*                                           Card Class                                           */
/* ---------------------------------------------------------------------------------------------- */

const newCardPopup = new PopupWithForm(cardModalSelector, submitCardForm);

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  newCardPopup.open();
});

/* ---------------------------------------------------------------------------------------------- */
/*                                          Image Class                                           */
/* ---------------------------------------------------------------------------------------------- */

const previewImagePopup = new PopupWithImage(previewImageModal);
function openCardClick({ name, link }) {
  previewImagePopup.open({ name, link });
}
