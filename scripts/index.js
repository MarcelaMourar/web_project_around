import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const profilePopup = new PopupWithForm("#popup", (formData) => {
  userInfo.setUserInfo({
    name: formData["name"],
    job: formData["job"],
  });
});
profilePopup.setEventListeners();

const addPopup = new PopupWithForm("#popup-action", (formData) => {
  const newCardData = {
    name: formData["title"],
    link: formData["link"],
  };
  const cardElement = createCard(newCardData);
  cardSection.addItem(cardElement);
  addPopup.close();
});
addPopup.setEventListeners();

const imagePopup = new PopupWithImage("#popup-img");
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__title",
});

const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__action-button");
const inputName = document.querySelector(".popup__input_name");
const inputJob = document.querySelector(".popup__input_job");

const containerSelector = ".elements";
const newCardForm = document.querySelector("#form-new-card");
const titleInput = document.querySelector("#title-input");
const linkInput = document.querySelector("#link-input");

profileEditButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  inputName.value = name;
  inputJob.value = job;
  profilePopup.open();
});

addButton.addEventListener("click", () => {
  addPopup.open();
});

const inicialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: inicialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  containerSelector
);

cardSection.renderItems();

newCardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCardData = {
    name: titleInput.value,
    link: linkInput.value,
  };
  const cardElement = createCard(newCardData);
  cardSection.addItem(cardElement);

  addPopup.close();
  newCardForm.reset();
});

const formSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

document.querySelectorAll(".popup__form").forEach((form) => {
  const validator = new FormValidator(formSettings, form);
  validator.enableValidation();
});
