let initialCards = [
  {
    name: "New Orleans",
    link: "https://unsplash.com/photos/FzPG_1QJouY",
  },
  {
    name: "Boston",
    link: "https://unsplash.com/photos/VtqqOg_eHTM",
  },
  {
    name: "Chicago",
    link: "https://unsplash.com/photos/Nyvq2juw4_o",
  },
  {
    name: "Philly",
    link: "https://unsplash.com/photos/rUMzI6Vn7hU",
  },
  {
    name: "Miami",
    link: "https://unsplash.com/photos/Um9AkOiIDcU",
  },
  {
    name: "NYC",
    link: "https://unsplash.com/photos/2f8SXXbP9nY",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".modal_profile-button");

function modalProfileOpen() {
  profileEditModal.classList.add("modal_opened");
}
profileEditButton.addEventListener("click", modalProfileOpen);

const profileCloseButton = document.querySelector(".modal__close-button");

function modalProfileClose() {
  profileEditModal.classList.remove("modal_opened");
}

profileCloseButton.addEventListener("click", modalProfileClose);
