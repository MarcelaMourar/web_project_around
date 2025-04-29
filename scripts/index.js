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

const editButton = document.querySelector(".profile__edit-caneta");

editButton.addEventListener("click", function () {
  popup.classList.remove("hide-form");
});

const editIcon = document.querySelector(".popup__close-icon");

editIcon.addEventListener("click", function () {
  popup.classList.add("hide-form");
});

const actionButton = document.querySelector(".profile__action-button");
const popupAction = document.querySelector("#popup-action");
const actionIcon = popupAction.querySelector(".popup__close-icon");

actionButton.addEventListener("click", function () {
  popupAction.classList.remove("hide-form");
});

actionIcon.addEventListener("click", function () {
  popupAction.classList.add("hide-form");
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
  popupImg.classList.add("hide-form");
});

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("element__trash")) {
    e.target.closest(".element").remove();
  }
});
function lidarPopupImg() {
  const img2 = document.querySelectorAll(".element__image");

  for (let i in img2) {
    img2[i].addEventListener("click", (e) => {
      const popupImage = document.querySelector(".popup__img");
      popupImage.src = img2[i].src;
      popupImg.classList.remove("hide-form");

      atualizarTitulo(img2[i]);
      popupImg.classList.remove("hide-form");
    });
  }
}
lidarPopupImg();

function atualizarTitulo(imagem) {
  const popupCityName = document.querySelector(".popup__city-name");
  const cardTitle = imagem.closest(".element").querySelector(".element__title");
  popupCityName.textContent = cardTitle.textContent;
}
