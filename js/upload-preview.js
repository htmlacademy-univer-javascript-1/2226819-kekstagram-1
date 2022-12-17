import {isEscapeKey} from "./util.js";
import "./upload-form.js";
import {effectClasses} from "./data.js";


// DOM-элемент - загруженное фото
const uploadPhotoPreview = document.querySelector(".img-upload__preview");
// Форма, которая получает фото
const uploadFileInput = document.querySelector('#upload-file');
// Форма редактирования изображения
const editForm = document.querySelector('.img-upload__overlay');
// Кнопка для закрытия формы редактирования изображения
const editFormCancelButton = document.querySelector('#upload-cancel');
// Поле ввода хэш-тегов
const hashtagInput = document.querySelector(".text__hashtags");
// Поле ввода описания поста
const descriptionInput = document.querySelector(".text__description");
// Поле значение масштаба загруженного фото
const scaleValueInput = document.querySelector(".scale__control--value");
// DOM-элемент - шаблон для постов


// Шаблон сообщения об успешной отправке формы
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
// Клонирование элемента поста из шаблона
const successElement = successTemplate.cloneNode(true);
// Кнопка закрытия сообщения об успешной отправке формы
const successButton = successElement.querySelector(".success__button");
// Изначальное добавление класса hidden к сообщению об успешной отправке формы
successElement.classList.add("hidden");
// Добавление шаблона сообщения в конец блока body
document.body.appendChild(successElement);


// Шаблон сообщения об успешной отправке формы
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
// Клонирование элемента поста из шаблона
const errorElement = errorTemplate.cloneNode(true);
// Кнопка закрытия сообщения об успешной отправке формы
const errorButton = errorElement.querySelector(".error__button");
// Изначальное добавление класса hidden к сообщению об успешной отправке формы
errorElement.classList.add("hidden");
// Добавление шаблона сообщения в конец блока body
document.body.appendChild(errorElement);


// Ловим изменение значения поля #upload-file
uploadFileInput.addEventListener('change', function () {
  openUploadForm();
});
// Закрытие формы по кнопке
editFormCancelButton.addEventListener('click', function () {
  closeUploadForm();
});

// Открываем окно редактирования фото
const openUploadForm = function () {
  editForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Добавляем лисенер на ESC
  document.addEventListener('keydown', onPopupEscKeydownForm);
};
// Закрываем окно редактирования фото
const closeUploadForm = function () {
  editForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  clearForm();

  // Убираем лисенер на ESC
  document.removeEventListener('keydown', onPopupEscKeydownForm);
  // Очищаем значение поля ввода uploadFileInput
  uploadFileInput.value = "";
};

// Ловим закрытие формы по нажатию Esc
const onPopupEscKeydownForm = (evt) => {
  // Деактивация действия при фокусе на hashtagInput или descriptionInput
  if (hashtagInput === document.activeElement || descriptionInput === document.activeElement) {
    evt.stopPropagation();
  } else if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};


// Функция, срабатываемая при успешной отправке формы
const successfulUpload = function () {
  // Закрытие формы
  closeUploadForm();

  // Отчистка формы после её закрытия / отправки
  clearForm();

  // Открытие сообщения об успешной отправке формы
  openMessage(successElement);
};

// Функция, срабатываемая при неуспешной отправке формы
const errorUpload = function () {
  // Закрытие формы
  closeUploadForm();

  // Форма не очищается

  // Открытие сообщения об неуспешной отправке формы
  openMessage(errorElement);
};


// Лисенер закрытия сообщения об успешной отправке по клику на кнопку
successButton.addEventListener("click", function (evt) {
  evt.preventDefault();

  // Закрытие сообщения
  closeMessage(successElement);
});
// Лисенер закрытия сообщения об неуспешной отправке по клику на кнопку
errorButton.addEventListener("click", function (evt) {
  evt.preventDefault();

  // Закрытие сообщения
  closeMessage(errorElement);
});

// Функция, которая открывает сообщение
const openMessage = function (element) {
  element.classList.remove("hidden");

  // Добавление лисенер на ESC
  document.addEventListener('keydown', onPopupEscKeydownMessage);
};
// Функция, которая закрывает сообщение
const closeMessage = function (element) {
  element.classList.add("hidden");

  // Убираем лисенер на ESC
  document.removeEventListener("keydown", onPopupEscKeydownMessage);
};

// Ловим закрытие формы по нажатию Esc
const onPopupEscKeydownMessage = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage(successElement);
    closeMessage(errorElement);
  }
};


const clearForm = function () {
  hashtagInput.value = "";
  descriptionInput.value = "";
  scaleValueInput.value = "100%";
  effectClasses.forEach(effectClass => {
    uploadPhotoPreview.classList.remove(effectClass);
  });
  uploadPhotoPreview.style.filter = `grayscale(0)`;
};


export {closeUploadForm, successfulUpload, errorUpload};
