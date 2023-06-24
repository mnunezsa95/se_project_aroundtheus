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
  profileDescriptionElement,
  profileTitleElement,
  cardModalSelector,
  addNewCardButton,
  cardList,
  previewImageModal,
} from "../utils/constants.js";
import API from "../components/API.js";

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

profileEditButton.addEventListener("click", openProfilePopup);

function openProfilePopup() {
  const { profileName, description } = userInfo.getUserInfo();
  profileTitleElement.value = profileName;
  profileDescriptionElement.value = description;
  editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
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
/*                                      PopupWithForm Classes                                     */
/* ---------------------------------------------------------------------------------------------- */

const newCardPopup = new PopupWithForm(cardModalSelector, submitCard);
const previewImagePopup = new PopupWithImage(previewImageModal);

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  newCardPopup.open();
});

/* ---------------------------------------------------------------------------------------------- */
/*                                         Card Functions                                         */
/* ---------------------------------------------------------------------------------------------- */

function createCard({ name, link }) {
  const cardElement = new Card({ name, link }, "#card-template", ({ name, link }) => {
    previewImagePopup.open({ name, link });
  });
  return cardElement.generateCard();
}

function submitCard({ title, url }) {
  const newCardData = { name: title, link: url };
  const newCard = createCard(newCardData); // creates "newCard" & stores the function returned execution of createCard fn
  cardListSection.prependItem(newCard); // prepend method from Section class
  newCardPopup.close();
}

/* ---------------------------------------------------------------------------------------------- */
/*                                           API Section                                          */
/* ---------------------------------------------------------------------------------------------- */

const api = new API({
  baseURL: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "3bb6a079-e94c-4226-a104-258379e1896b",
    "Content-Type": "application/json",
  },
});

api.getInitialCards();
api.getUserInfo();

// api.getAppInfo().then(([cardsArray, userData]) => {
//   userInfo.setUserInfo({
//     title: userData.name,
//     description: userData.about,
//   });
// });
