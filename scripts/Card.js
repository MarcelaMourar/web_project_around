export class Card {
  constructor({ name, link }, templateSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
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
    image.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );
  }

  _handleLike(icon) {
    const isLiked = icon.classList.toggle("liked");
    icon.src = isLiked ? "./imagens/Union.png" : "./imagens/coração.png";
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
