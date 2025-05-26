const name = document.querySelector(".profile__name1");
const job = document.querySelector(".profile__name2");

const inputName = document.querySelector(".popup__input_name");
const inputJob = document.querySelector(".popup__input_job");

inputName.value = name.textContent;
inputJob.value = job.textContent;

const popup = document.querySelector("#popup");
const saveButton = document.querySelector(".popup__save-button");
saveButton.addEventListener("click", saveName);
function saveName() {
  name.textContent = inputName.value;
  job.textContent = inputJob.value;
  popup.classList.add("hide-form");
}

const editButton = document.querySelector(".profile__edit-button");

editButton.addEventListener("click", function () {
  openPopup(popup);
});

const editIcon = document.querySelector(".popup__close-icon");

editIcon.addEventListener("click", function () {
  closePopup(popup);
});

const actionButton = document.querySelector(".profile__action-button");
const popupAction = document.querySelector("#popup-action");
const actionIcon = popupAction.querySelector(".popup__close-icon");

actionButton.addEventListener("click", function () {
  openPopup(popupAction);
});

actionIcon.addEventListener("click", function () {
  closePopup(popupAction);
});

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

function criarCard(name, link) {
  const template = document.querySelector("#card-template");
  const cardElement = template.content.cloneNode(true);

  const image = cardElement.querySelector(".element__image");
  image.src = link;
  image.alt = `Imagem de ${name}`;

  const title = cardElement.querySelector(".element__title");
  title.textContent = name;

  const heartIcon = cardElement.querySelector(".element__heart");
  heartIcon.addEventListener("click", function () {
    const isLiked = heartIcon.classList.toggle("liked");

    heartIcon.src = isLiked ? "./imagens/Union.png" : "./imagens/coração.png";
  });

  return cardElement;
}

const container = document.querySelector(".elements");

initialCards.forEach((card) => {
  const novoCard = criarCard(card.name, card.link);
  container.appendChild(novoCard);
});

const formNewCard = document.querySelector("#form-new-card");
const inputTitle = formNewCard.querySelector("#title-input");
const inputLink = formNewCard.querySelector("#link-input");
const cardContainer = document.querySelector(".elements");

formNewCard.addEventListener("submit", function (event) {
  event.preventDefault();

  const titleValue = inputTitle.value;
  const linkValue = inputLink.value;

  const newCard = criarCard(titleValue, linkValue);
  cardContainer.prepend(newCard);

  popupAction.classList.add("hide-form");
  lidarPopupImg();
});

const popupImg = document.querySelector("#popup-img");
const closePopupImg = popupImg.querySelector(".popup__close-icon");
closePopupImg.addEventListener("click", function () {
  closePopup(popupImg);
});

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("element__trash")) {
    e.target.closest(".element").remove();
  }
});
function lidarPopupImg() {
  const img2 = document.querySelectorAll(".element__image");

  img2.forEach((img) => {
    img.addEventListener("click", () => {
      const popupImage = document.querySelector(".popup__img");
      popupImage.src = img.src;
      popupImg.classList.remove("hide-form");

      atualizarTitulo(img);
      openPopup(popupImg);
    });
  });
}
lidarPopupImg();

function atualizarTitulo(imagem) {
  const popupCityName = document.querySelector(".popup__city-name");
  const cardTitle = imagem.closest(".element").querySelector(".element__title");
  popupCityName.textContent = cardTitle.textContent;
}

function showInputError(form, input, settings) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(form, input, settings) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
}

function checkInputValidity(form, input, settings) {
  if (!input.validity.valid) {
    showInputError(form, input, settings);
  } else {
    hideInputError(form, input, settings);
  }
}

function setEventListeners(formElement, settings) {
  const inputs = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const button = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputs, button, settings);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputs, button, settings);
    });
  });
}

function enableValidation(settings) {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();

      const inputs = Array.from(
        formElement.querySelectorAll(settings.inputSelector)
      );
      let isValid = true;

      inputs.forEach((input) => {
        checkInputValidity(formElement, input, settings);
        if (!input.validity.valid) {
          isValid = false;
        }
      });

      if (isValid) {
        console.log("Formulário válido!");
        saveName();
      }
    });
    setEventListeners(formElement, settings);
  });
}

function toggleButtonState(inputs, button, settings) {
  const isFormValid = inputs.every((input) => input.validity.valid);

  if (isFormValid) {
    button.disabled = false;
    button.classList.remove(settings.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(settings.inactiveButtonClass);
  }
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

function openPopup(popup) {
  popup.classList.remove("hide-form");
  document.addEventListener("keydown", handleEscClose);
}

function closePopup(popup) {
  popup.classList.add("hide-form");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(e) {
  if (e.key === "Escape") {
    const openPopup = document.querySelector(".popup:not(.hide-form)");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup(popup);
    }
  });
});
