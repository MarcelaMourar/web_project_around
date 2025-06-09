function handleEscClose(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup:not(.hide-form)");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function openPopup(popup) {
  popup.classList.remove("hide-form");
  document.addEventListener("keydown", handleEscClose);
}

export function closePopup(popup) {
  popup.classList.add("hide-form");
  document.removeEventListener("keydown", handleEscClose);
}

export function setupPopupClose() {
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        closePopup(popup);
      }
    });
  });
}
