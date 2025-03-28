const name = document.querySelector(".profile__name1");
const job = document.querySelector(".profile__name2");

const inputName = document.querySelector(".popup__input_name");
const inputJob = document.querySelector(".popup__input_job");

inputName.value = name.textContent;
inputJob.value = job.textContent;

const saveButton = document.querySelector(".popup__save-button");
saveButton.addEventListener("click", saveName);
function saveName() {
  name.textContent = inputName.value;
  job.textContent = inputJob.value;
  popup.classList.add("hide-form");
}

const editButton = document.querySelector(".profile__edit-caneta");
const popup = document.querySelector(".popup");

editButton.addEventListener("click", function () {
  popup.classList.remove("hide-form");
});

const editIcon = document.querySelector(".popup__close-icon");

editIcon.addEventListener("click", function () {
  popup.classList.add("hide-form");
});
