export class Card {
  constructor(
    { name, link, _id, likes, owner },
    templateSelector,
    handleImageClick,
    handleDeleteClick,
    api,
    currentUserId
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this._owner = owner;
    this._api = api;
    this._currentUserId = currentUserId;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _isLikedByCurrentUser() {
    return this._likes.some((user) => user._id === this._currentUserId);
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    return template.content.querySelector(".element").cloneNode(true);
  }

  _setEventListeners(cardElement) {
    const heartIcon = cardElement.querySelector(".element__heart");
    const likeCounter = cardElement.querySelector(".element__like-count");
    heartIcon.addEventListener("click", () =>
      this._handleLike(heartIcon, likeCounter)
    );

    const trashIcon = cardElement.querySelector(".element__trash");

    if (this._owner === this._currentUserId) {
      trashIcon.addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
    } else {
      trashIcon.remove();
    }

    const image = cardElement.querySelector(".element__image");
    image.addEventListener("click", () =>
      this._handleImageClick(this._name, this._link)
    );
  }

  _handleLike(button, counter) {
    const liked = button.classList.contains("liked");

    const request = liked
      ? this._api.unlikeCard(this._id)
      : this._api.likeCard(this._id);

    request
      .then((updatedCard) => {
        this._likes = Array.isArray(updatedCard.likes) ? updatedCard.likes : [];

        const isNowLiked = button.classList.contains("liked") ? false : true;

        counter.textContent = this._likes.length;
        button.classList.toggle("liked", isNowLiked);
        button.src = isNowLiked
          ? "./imagens/Union.png"
          : "./imagens/coração.png";
      })
      .catch((err) => console.error("Erro ao alternar curtida:", err));
  }

  generateCard() {
    this._element = this._getTemplate();

    const image = this._element.querySelector(".element__image");
    image.src = this._link;
    image.alt = `Imagem de ${this._name}`;

    this._element.querySelector(".element__title").textContent = this._name;

    this._setEventListeners(this._element);

    return this._element;
  }

  getId() {
    return this._id;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}
