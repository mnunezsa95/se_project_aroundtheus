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
const deleteCardFormValidator = new FormValidator(config, deleteCardModalSelector);
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
deleteCardFormValidator.enableValidation();
/* ---------------------------------------------------------------------------------------------- */
/*                                           API Promise                                          */
/* ---------------------------------------------------------------------------------------------- */

let userId;
let cardListSection;

//! Do Not Delete
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setProfileAvatar(userData.avatar);
    cardListSection = new Section(
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
}

//! Do Not Delete
function handleProfileFormSubmit({ title, description }) {
  editProfilePopup.setLoading(true);
  api
    .updateUserInfo(title, description)
    .then(() => {
      userInfo.setUserInfo(title, description);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editProfilePopup.setLoading(false, "Save");
    });
}

/* ---------------------------------------------------------------------------------------------- */
/*                                   Profile Set Event Listeners                                  */
/* ---------------------------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", openProfilePopup);

profileAvatarPeniclIcon.addEventListener("click", () => {
  avatarFromValidator.toggleButtonState();
  editAvatarPopup.open();
});

//! Do Not Delete
function handleProfileAvatarSubmit(url) {
  editAvatarPopup.setLoading(true);
  api
    .setUserAvatar(url)
    .then((userData) => {
      userInfo.setProfileAvatar(userData.avatar);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editAvatarPopup.setLoading(false, "Save");
    });
}

/* ---------------------------------------------------------------------------------------------- */
/*                                         Card Functions                                         */
/* ---------------------------------------------------------------------------------------------- */

//! Do not delete
function handleSubmitCard({ title, url }) {
  addNewCardPopup.setLoading(true);
  api
    .addCard(title, url)
    .then((card) => {
      const newCard = createCard(card);
      cardListSection.prependItem(newCard);
      addNewCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addNewCardPopup.setLoading(false, "Create");
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
      deleteImagePopup.setSubmitAction(() => {
        deleteImagePopup.setLoading(true);
        api
          .deleteCard(data._id)
          .then((res) => {
            newCard.remove(res._id);
            deleteImagePopup.close();
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            deleteImagePopup.setLoading(false, "Yes");
          });
      });
      deleteImagePopup.open(data._id);
    },
    function handleCardLikeClick(data) {
      api
        .changeLikeCardStatus(data._id, newCard.isLiked())
        .then((res) => {
          const likes = res.likes || [];
          newCard.setLikes(likes);
          newCard.toggleLikes();
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
});
