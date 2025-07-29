import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { Api } from "./Api.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "a9ff003e-7f3e-47b6-b5e9-4b1090a76fb5",
    "Content-Type": "application/json",
  },
});
let currentUserId = null;

api
  .getUserInfo()
  .then((userData) => {
    currentUserId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
    document.querySelector(".profile__avatar").src = userData.avatar;

    return api.getInitialCards();
  })
  .then((cardsFromServer) => {
    cardSection.setItems(cardsFromServer);
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error("Erro ao carregar dados do usuário ou cards:", err);
  });

const profilePopup = new PopupWithForm(
  "#popup",
  (formData) => {
    return api
      .setUserInfo({
        name: formData["name"],
        job: formData["job"],
      })
      .then((updatedUser) => {
        userInfo.setUserInfo({
          name: updatedUser.name,
          job: updatedUser.about,
        });
      })
      .catch((err) => {
        console.error("Erro ao atualizar perfil:", err);
      });
  },
  "Salvando..."
);
profilePopup.setEventListeners();

const addPopup = new PopupWithForm(
  "#popup-action",
  (formData) => {
    const newCardData = {
      name: formData["title"],
      link: formData["link"],
    };

    return api
      .createCard(newCardData)
      .then((createdCard) => {
        const cardElement = createCard(createdCard);
        cardSection.addItem(cardElement);
      })
      .catch((err) => console.error("Erro ao criar card:", err));
  },
  "Criando..."
);
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

const confirmDeletePopup = new PopupWithConfirmation("#popup-confirm-delete");
confirmDeletePopup.setEventListeners();

function handleDeleteClick(cardInstance) {
  confirmDeletePopup.setSubmitAction(() => {
    api
      .deleteCard(cardInstance.getId())
      .then(() => {
        cardInstance.removeCard();
        confirmDeletePopup.close();
      })
      .catch((err) => {
        console.error("Erro ao deletar card:", err);
      });
  });

  confirmDeletePopup.open();
}

popup.querySelector(".popup__close-icon").addEventListener("click", () => {
  popup.classList.add("hide-form");
});

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    api,
    currentUserId
  );
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  containerSelector
);

const avatarPopup = new PopupWithForm("#popup-avatar", (formData) => {
  return api
    .setUserAvatar({ avatar: formData["avatar"] })
    .then((user) => {
      document.querySelector(".profile__avatar").src = user.avatar;
      avatarPopup.close();
    })
    .catch((err) => console.error("Erro ao atualizar avatar:", err));
});
avatarPopup.setEventListeners();

document
  .querySelector(".profile__avatar-container")
  .addEventListener("click", () => {
    avatarPopup.open();
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
