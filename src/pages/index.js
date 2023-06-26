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
  cardListElement,
  previewImageModal,
  profileAvatarSelector,
  cardTemplateElement,
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

// const myUserID = "5578a2cd7bb9cc9c1c62618d";
const myUserID = null;

api.getInitialCards().then((cards) => {
  const cardListSection = new Section(
    {
      items: cards,
      renderer: ({ name, link }) => {
        const newCard = createCard({ name, link });
        cardListSection.addItem(newCard);
      },
    },
    cardListElement
  );
  cardListSection.renderItems();
});

/* ---------------------------------------------------------------------------------------------- */
/*                                         Profile Classes                                        */
/* ---------------------------------------------------------------------------------------------- */

//! Do Not Delete
const userInfo = new UserInfo(profileTitleSelector, profileDescriptionSelector, profileAvatarSelector);
api.getUserInfo().then((userData) => {
  userInfo.setUserInfo(userData.name, userData.about);
  userInfo.setProfileAvatar(userData.avatar);
});

//! Do Not Delete
function openProfilePopup() {
  const { profileName, description } = userInfo.getUserInfo();
  profileTitleElement.value = profileName;
  profileDescriptionElement.value = description;
  editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
}

//! Do Not Delete
function handleProfileFormSubmit({ title, description }) {
  userInfo.setUserInfo(title, description);
  api.updateUserInfo(title, description);
  editProfilePopup.close();
}

const editProfilePopup = new PopupWithForm(profileEditModalSelector, handleProfileFormSubmit);

profileEditButton.addEventListener("click", openProfilePopup);

/* ---------------------------------------------------------------------------------------------- */
/*                                      PopupWithForm Classes                                     */
/* ---------------------------------------------------------------------------------------------- */

const previewImagePopup = new PopupWithImage(previewImageModal);
const addNewCardPopup = new PopupWithForm(cardModalSelector, handleSubmitCard);
const deleteImagePopup = new PopupWithForm(deleteCardModalSelector, handleDeleteImageSubmit);

function handleCardClick(data) {
  previewImagePopup.open(data);
}

function handleDeleteImageSubmit(data) {
  api.deleteCard(data.imageId);
  let cardToDelete = document.getElementById(data.imageId);
  cardToDelete.remove();
  cardToDelete.null;
  deleteImagePopup.close();
}

//! Do Not Delete
function handleCardLikeClick(cardId, isLiked) {
  api.changeLikeCardStatus(cardId, isLiked);
}

const confirmDeleteBtn = document.querySelector(".modal__delete-card-button");
confirmDeleteBtn.addEventListener("click", handleDeleteImageSubmit);

function handleDeletePopup(imageId) {
  deleteImagePopup.open(imageId);
}

/* ---------------------------------------------------------------------------------------------- */
/*                                         Card Functions                                         */
/* ---------------------------------------------------------------------------------------------- */

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addNewCardPopup.open();
});

//! Do not delete
function createCard(data) {
  const newCard = new Card(data, cardTemplateElement, handleCardClick, handleDeletePopup, handleCardLikeClick);
  return newCard.generateCard();
}

//! Do not delete
function handleSubmitCard({ title, url }) {
  api.addCard(title, url).then((card) => {
    const newCard = createCard(card);
    cardListElement.prepend(newCard);
  });
  addNewCardPopup.close();
}

api.getAppInfo().then(([cardsArray, userData]) => {});
