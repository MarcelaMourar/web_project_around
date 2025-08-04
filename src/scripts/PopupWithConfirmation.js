import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__container");
    this._submitButton = this._popup.querySelector(".popup__save-button");
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener("click", () => {
      if (this._handleSubmit) {
        this._handleSubmit();
      }
    });
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }
}
