import {isEscapeKey} from "./util.js";
import "./validation-upload-form.js";


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
  document.addEventListener('keydown', onPopupEscKeydown);
};
// Закрываем окно редактирования фото
const closeUploadForm = function () {
  editForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Убираем лисенер на ESC
  document.removeEventListener('keydown', onPopupEscKeydown);
  // Очищаем значение поля ввода uploadFileInput
  uploadFileInput.value = "";
};

// Ловим закрытие формы по нажатию Esc
const onPopupEscKeydown = (evt) => {
  // Деактивация действия при фокусе на hashtagInput или descriptionInput
  if (hashtagInput === document.activeElement || descriptionInput === document.activeElement) {
    evt.stopPropagation();
  } else if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};
