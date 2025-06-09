import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openPopup, closePopup, setupPopupClose } from "./utils.js";

const profilePopup = document.querySelector("#popup");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = profilePopup.querySelector(".popup__close-icon");

const inputName = profilePopup.querySelector(".popup__input_name");
const inputJob = profilePopup.querySelector(".popup__input_job");
const displayName = document.querySelector(".profile__name1");
const displayJob = document.querySelector(".profile__name2");

profileEditButton.addEventListener("click", () => {
  inputName.value = displayName.textContent;
  inputJob.value = displayJob.textContent;
  openPopup(profilePopup);
});

profileCloseButton.addEventListener("click", () => {
  closePopup(profilePopup);
});

const profileForm = profilePopup.querySelector(".popup__form");
profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  displayName.textContent = inputName.value;
  displayJob.textContent = inputJob.value;
  closePopup(profilePopup);
});

const addPopup = document.querySelector("#popup-action");
const addButton = document.querySelector(".profile__action-button");
const addCloseButton = addPopup.querySelector(".popup__close-icon");

addButton.addEventListener("click", () => openPopup(addPopup));
addCloseButton.addEventListener("click", () => closePopup(addPopup));

const initialCards = [
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

const container = document.querySelector(".elements");

initialCards.forEach((card) => {
  const cardInst = new Card(card, "#card-template");
  container.appendChild(cardInst.generateCard());
});

document.querySelectorAll(".popup__close-icon").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const popup = e.target.closest(".popup");
    closePopup(popup);
  });
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

setupPopupClose();
