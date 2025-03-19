let name = document.querySelector(".profile__name1");
let job = document.querySelector(".profile__name2");
console.log(name.textContent);
console.log(job.textContent);

let inputName = document.querySelector(".popup__input_name");
let inputJob = document.querySelector(".popup__input_job");

inputName.value = name.textContent;
inputJob.value = job.textContent;

let saveButton = document.querySelector(".popup__save-button");
saveButton.addEventListener("click", saveName);
function saveName() {
  name.textContent = inputName.value;
  job.textContent = inputJob.value;
  popup.classList.add("hide-form");
}

let editButton = document.querySelector(".profile__edit-caneta");
let popup = document.querySelector(".popup");

editButton.addEventListener("click", function () {
  popup.classList.remove("hide-form");
  console.log("entrou");
});

let editIcon = document.querySelector(".popup__close-icon");

editIcon.addEventListener("click", function () {
  popup.classList.add("hide-form");
});
