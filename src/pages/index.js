import "./index.css";

/* ---------------------------------------------------------------------------------------------- */
/*                                             Imports                                            */
/* ---------------------------------------------------------------------------------------------- */
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileAvatarModalSelector,
  profileEditModalSelector,
  cardModalSelector,
  config,
  profileTitleSelector,
  profileDescriptionSelector,
  deleteCardModalSelector,
  profileEditButton,
  profileDescriptionElement,
  profileTitleElement,
  addNewCardButton,
  cardListElement,
  previewImageModal,
  profileAvatarSelector,
  cardTemplateElement,
} from "../utils/constants.js";
import API from "../components/API.js";
import { data } from "autoprefixer";

/* ---------------------------------------------------------------------------------------------- */
/*                                         Form Validator                                         */
/* ---------------------------------------------------------------------------------------------- */

const editProfileFormValidator = new FormValidator(config, profileEditModalSelector);
const addCardFormValidator = new FormValidator(config, cardModalSelector);
const avatarFromValidator = new FormValidator(config, profileAvatarModalSelector);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFromValidator.enableValidation();

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

//! Do Not Delete
api.getInitialCards().then((cards) => {
  const cardListSection = new Section(
    {
      items: cards,
      renderer: (data) => {
        const newCard = createCard(data);
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
  editProfilePopup.setLoading(true);
  api.updateUserInfo(title, description).then(() => {
    editProfilePopup.setLoading(false, "Save");
  });
  editProfilePopup.close();
}

profileEditButton.addEventListener("click", openProfilePopup);

const changeProfileAvatar = new PopupWithForm(profileAvatarModalSelector, handleProfileImageSubmit);
// changeProfileAvatar.open();

function handleProfileImageSubmit() {
  const profileIcon = document.querySelector(".profile__icon-edit-button");
  profileIcon.addEventListener("click", () => {
    changeProfileAvatar.open();
  });
  // changeProfileAvatar.open();
  // changeProfileAvatar.setLoading(true);
  // Api.setUserAvatar(data).then((data) => {
  //   userInfo.setProfileAvatar(data.avatar);
  //   changeProfileAvatar.close();
  // });
}

/* ---------------------------------------------------------------------------------------------- */
/*                                      PopupWithForm Classes                                     */
/* ---------------------------------------------------------------------------------------------- */

const editProfilePopup = new PopupWithForm(profileEditModalSelector, handleProfileFormSubmit);
const previewImagePopup = new PopupWithImage(previewImageModal);
const addNewCardPopup = new PopupWithForm(cardModalSelector, handleSubmitCard);
const deleteImagePopup = new PopupWithConfirm(deleteCardModalSelector);
deleteImagePopup.setEventListeners();

function handleCardClick(data) {
  previewImagePopup.open(data);
}

/* ---------------------------------------------------------------------------------------------- */
/*                                         Card Functions                                         */
/* ---------------------------------------------------------------------------------------------- */

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addNewCardPopup.open();
  addNewCardPopup.setLoading(false, "Create");
});

//! Do not delete
function createCard(data) {
  const newCard = new Card(
    data,
    cardTemplateElement,
    function handleCardClick() {
      previewImagePopup.open(data);
    },
    function handleCardDelete() {
      deleteImagePopup.open(data._id);
      deleteImagePopup.setLoading(true);
      deleteImagePopup.setSubmitAction(() => {
        api.deleteCard(data._id).then(() => {
          newCard.remove();
          deleteImagePopup.close();
          deleteImagePopup.setLoading(false, "Yes");
        });
      });
    },
    function handleCardLikeClick(data) {
      api.changeLikeCardStatus(data._id, isLiked);
    }
  );
  return newCard.generateCard();
}

//! Do not delete
function handleSubmitCard({ title, url }) {
  api.addCard(title, url).then((card) => {
    const newCard = createCard(card);
    cardListElement.prepend(newCard);
  });
  addNewCardPopup.setLoading(true);
  addNewCardPopup.close();
}
