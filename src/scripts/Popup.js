export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.remove("hide-form");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.add("hide-form");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__close-icon");

    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    }

    this._popup.addEventListener("mousedown", (e) => {
      if (e.target === this._popup) {
        this.close();
      }
    });
  }
}
