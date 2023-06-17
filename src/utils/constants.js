//! Used in index.js
export const initialCards = [
  {
    name: "New Orleans",
    link: "https://images.unsplash.com/photo-1571893544028-06b07af6dade?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80",
  },
  {
    name: "Boston",
    link: "https://images.pexels.com/photos/4659963/pexels-photo-4659963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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

//! Used in index.js
export const profileEditModalSelector = document.querySelector("#edit-modal");
export const cardModalSelector = document.querySelector("#add-modal");
export const profileEditButton = document.querySelector(".profile__edit-button");
export const inputSelector = ".modal__input";
export const addNewCardButton = document.querySelector(".profile__add-button");
export const profileTitleSelector = document.querySelector(".profile__title");
export const profileDescriptionSelector = document.querySelector(".profile__description");
export const profileDescriptionElement = document.querySelector("#profile-description-input");
export const profileTitleElement = document.querySelector("#profile-title-input");

//! Used in index.js
export const cardList = document.querySelector(".card__list");

//! Used in Card.js
export const previewImageModal = document.querySelector("#preview-modal");

//! User in index.js
export const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button-inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};
