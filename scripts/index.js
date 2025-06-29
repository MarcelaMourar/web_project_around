import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { inicialCards } from "./utils.js";

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
