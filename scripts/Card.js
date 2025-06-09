import { openPopup } from "./utils.js";

export class Card {
  constructor({ name, link }, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    return template.content.querySelector(".element").cloneNode(true);
  }

  _setEventListeners(cardElement) {
    const heartIcon = cardElement.querySelector(".element__heart");
    heartIcon.addEventListener("click", () => this._handleLike(heartIcon));

    const trashIcon = cardElement.querySelector(".element__trash");
    trashIcon.addEventListener("click", () => cardElement.remove());

    const image = cardElement.querySelector(".element__image");
    image.addEventListener("click", () => this._handleImageClick(image));
  }

  _handleLike(icon) {
    const isLiked = icon.classList.toggle("liked");
    icon.src = isLiked ? "./imagens/Union.png" : "./imagens/coração.png";
  }

  _handleImageClick(image) {
    const popupImg = document.querySelector("#popup-img");
    const popupImage = popupImg.querySelector(".popup__img");
    popupImage.src = this._link;
    popupImage.alt = `Imagem de ${this._name}`;
    const cityName = popupImg.querySelector(".popup__city-name");
    cityName.textContent = this._name;
    openPopup(popupImg);

    document
      .querySelector(".popup__close-icon")
      .addEventListener("click", () => {
        popupImg.classList.add("hide-form");
      });

    popupImg.classList.remove("hide-form");
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const image = cardElement.querySelector(".element__image");
    image.src = this._link;
    image.alt = `Imagem de ${this._name}`;
    cardElement.querySelector(".element__title").textContent = this._name;

    this._setEventListeners(cardElement);
    return cardElement;
  }
}
