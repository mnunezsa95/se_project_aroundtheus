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
  config,
  profileTitleSelector,
  profileDescriptionSelector,
  profileEditModalSelector,
  deleteCardModalSelector,
  profileEditButton,
  profileDescriptionElement,
  profileTitleElement,
  cardModalSelector,
  addNewCardButton,
  cardListSelector,
  previewImageModal,
  profileAvatarSelector,
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
/*                                           API Section                                          */
/* ---------------------------------------------------------------------------------------------- */

const api = new API({
  baseURL: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "3bb6a079-e94c-4226-a104-258379e1896b",
    "Content-Type": "application/json",
  },
});

const myUserID = "5578a2cd7bb9cc9c1c62618d";

api.getInitialCards().then((cards) => {
  const cardListSection = new Section(
    {
      items: cards,
      renderer: ({ name, link }) => {
        const newCard = createCard({ name, link });
        cardListSection.addItem(newCard);
      },
    },
    cardListSelector
  );
  cardListSection.renderItems();
});
/* ---------------------------------------------------------------------------------------------- */
/*                                         Profile Classes                                        */
/* ---------------------------------------------------------------------------------------------- */

const userInfo = new UserInfo(profileTitleSelector, profileDescriptionSelector, profileAvatarSelector);
api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData.name, userData.about);
  userInfo.setProfileAvatar(userData.avatar);
});

function openProfilePopup() {
  const { profileName, description } = userInfo.getUserInfo();
  profileTitleElement.value = profileName;
  profileDescriptionElement.value = description;
  editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
}

function handleProfileFormSubmit({ title, description }) {
  userInfo.setUserInfo(title, description);
  api.updateUserInfo(userData);
  editProfilePopup.close();
}

const editProfilePopup = new PopupWithForm(profileEditModalSelector, handleProfileFormSubmit);

profileEditButton.addEventListener("click", openProfilePopup);

/* ---------------------------------------------------------------------------------------------- */
/*                                      PopupWithForm Classes                                     */
/* ---------------------------------------------------------------------------------------------- */

const newCardPopup = new PopupWithForm(cardModalSelector, handleSubmitCard);
const previewImagePopup = new PopupWithImage(previewImageModal);

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  newCardPopup.open();
});

/* ---------------------------------------------------------------------------------------------- */
/*                                         Card Functions                                         */
/* ---------------------------------------------------------------------------------------------- */
const deleteImagePopup = new PopupWithForm(deleteCardModalSelector, handleDeleteImageSubmit);

function handleDeleteImageSubmit(imageId) {
  api.deleteCard(imageId);
  deleteImagePopup.close();
}

function handleDeletePopup(imageId) {
  deleteImagePopup.open(imageId);
}

function createCard({ name, link }) {
  const cardElement = new Card({ name, link }, "#card-template", ({ name, link }) => {
    previewImagePopup.open({ name, link });
  });
  return cardElement.generateCard();
}

function handleSubmitCard({ title, url }) {
  api.addCard(title, url).then((card) => {
    const newCard = createCard(card);
    cardListSelector.prependItem(newCard);
  });
  newCardPopup.close();
}

api.getAppInfo().then(([cardsArray, userData]) => {});
