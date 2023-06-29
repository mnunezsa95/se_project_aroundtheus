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
  deleteCardModalSelector,
  config,
  profileTitleSelector,
  profileDescriptionSelector,
  profileAvatarSelector,
  profileEditButton,
  profileDescriptionElement,
  profileTitleElement,
  addNewCardButton,
  cardListElement,
  previewImageModal,
  cardTemplateElement,
  profileAvatarPeniclIcon,
} from "../utils/constants.js";
import API from "../components/API.js";
import { data } from "autoprefixer";

/* ---------------------------------------------------------------------------------------------- */
/*                                         Class Instances                                        */
/* ---------------------------------------------------------------------------------------------- */
const editProfileFormValidator = new FormValidator(config, profileEditModalSelector);
const addCardFormValidator = new FormValidator(config, cardModalSelector);
const avatarFromValidator = new FormValidator(config, profileAvatarModalSelector);
//
const userInfo = new UserInfo(profileTitleSelector, profileDescriptionSelector, profileAvatarSelector);
const editProfilePopup = new PopupWithForm(profileEditModalSelector, handleProfileFormSubmit);
const previewImagePopup = new PopupWithImage(previewImageModal);
const addNewCardPopup = new PopupWithForm(cardModalSelector, handleSubmitCard);
const deleteImagePopup = new PopupWithConfirm(deleteCardModalSelector);
const editAvatarPopup = new PopupWithForm(profileAvatarModalSelector, handleProfileAvatarSubmit);

const api = new API({
  baseURL: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "3bb6a079-e94c-4226-a104-258379e1896b",
    "Content-Type": "application/json",
  },
});

/* ---------------------------------------------------------------------------------------------- */
/*                                         Form Validators                                        */
/* ---------------------------------------------------------------------------------------------- */

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFromValidator.enableValidation();

/* ---------------------------------------------------------------------------------------------- */
/*                                           API Promise                                          */
/* ---------------------------------------------------------------------------------------------- */

let userId;

//! Do Not Delete
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setProfileAvatar(userData.avatar);
    const cardListSection = new Section(
      {
        items: initialCards,
        renderer: (data) => {
          const newCard = createCard(data);
          cardListSection.addItem(newCard);
        },
      },
      cardListElement
    );
    cardListSection.renderItems();
  })
  .catch(() => (err) => console.log(err));

/* ---------------------------------------------------------------------------------------------- */
/*                                        Profile Functions                                       */
/* ---------------------------------------------------------------------------------------------- */

//! Do Not Delete
function openProfilePopup() {
  const { profileName, description } = userInfo.getUserInfo();
  profileTitleElement.value = profileName;
  profileDescriptionElement.value = description;
  editProfileFormValidator.toggleButtonState();
  editProfilePopup.open();
  editProfilePopup.setLoading(false, "Save");
}

//! Do Not Delete
function handleProfileFormSubmit({ title, description }) {
  api
    .updateUserInfo(title, description)
    .then(() => {
      userInfo.setUserInfo(title, description);
      editProfilePopup.setLoading(true);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

/* ---------------------------------------------------------------------------------------------- */
/*                                   Profile Set Event Listeners                                  */
/* ---------------------------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", openProfilePopup);

profileAvatarPeniclIcon.addEventListener("click", () => {
  avatarFromValidator.toggleButtonState();
  editAvatarPopup.open();
  editAvatarPopup.setLoading(false, "Save");
});

/* ---------------------------------------------------------------------------------------------- */
/*                                         Card Functions                                         */
/* ---------------------------------------------------------------------------------------------- */

//! Do Not Delete
function handleProfileAvatarSubmit(url) {
  api
    .setUserAvatar(url)
    .then((userData) => {
      editAvatarPopup.setLoading(true);
      console.log(url);
      userInfo.setProfileAvatar(userData.avatar);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

//! Do not delete
function handleSubmitCard({ title, url }) {
  api
    .addCard(title, url)
    .then((card) => {
      const newCard = createCard(card);
      cardListElement.prepend(newCard);
      addNewCardPopup.setLoading(true);
      addNewCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

//! Do not delete
function createCard(data) {
  const newCard = new Card(
    data,
    userId,
    cardTemplateElement,
    function handleCardClick() {
      previewImagePopup.open(data);
    },
    function handleCardDelete() {
      deleteImagePopup.setLoading(false, "Yes");
      deleteImagePopup.open(data._id);
      deleteImagePopup.setSubmitAction(() => {
        api
          .deleteCard(data._id)
          .then((res) => {
            newCard.remove(res._id);
            deleteImagePopup.setLoading(true);
            deleteImagePopup.close();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    },
    function handleCardLikeClick(data) {
      api
        .changeLikeCardStatus(data._id, newCard.isLiked())
        .then((res) => {
          console.log(res);
          const likes = res.likes || [];
          newCard.setLikes(likes);
          if (this.isLiked()) {
            this._element.querySelector(".card__like-button").classList.toggle("card__like-button_active");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  );
  return newCard.generateCard();
}

/* ---------------------------------------------------------------------------------------------- */
/*                                    Card Set Event Listeners                                    */
/* ---------------------------------------------------------------------------------------------- */
addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addNewCardPopup.open();
  addNewCardPopup.setLoading(false, "Create");
});
