import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    console.log(this._form);
    console.log(this._inputList);
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      const result = this._handleFormSubmit(this._getInputValues());

      if (result instanceof Promise) {
        result
          .then(() => {
            this.close();
          })
          .catch((err) => {
            console.error("Erro ao enviar o formulário:", err);
          });
      } else {
        this.close();
      }
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
