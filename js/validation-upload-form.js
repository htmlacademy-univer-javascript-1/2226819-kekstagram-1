// Форма редактирования поста
const form = document.querySelector(".img-upload__form");
// Поле ввода хэш-тегов
const hashtagInput = document.querySelector(".text__hashtags");
// Поле ввода описания поста
const descriptionInput = document.querySelector(".text__description");

// Объект конфига pristine
const defaultConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'error__title'
};
// Инициализация валидатора
const pristine = new Pristine(form, defaultConfig, false);


// Функция валидации формы хэш-тегов
function validateHashtag (value) {
  const re = /^#[a-zA-Z0-9а-яА-ЯЁё]+/;
  const hashtags = value.split(' ');

  if (value === "") {   // ввод пустой
    return true;
  }
  if (hashtags.length > 5) {    // на вводе более 5 хэш-тегов
    return false;
  }
  for (let i = 0; i < hashtags.length; i++) {   // проверка каждого хэш-тега
    if (!re.test(hashtags[i]) || hashtags[i].length > 20) {
      return false;
    }
  }

  return true;
}
// Функция валидации формы описания
function validateDescription (value) {
  return value.length <= 140;
}

// Добавление валидации для поля ввода хэш-тегов
pristine.addValidator(
  hashtagInput,
  validateHashtag,
  "Некорректный хэш-тег!"
);
// Добавление валидации для поля ввода описания
pristine.addValidator(
  descriptionInput,
  validateDescription,
  "Некорректное описание!"
);


// Проверка формы на валидность при сабмите
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    console.log('Форма валидна');
  } else {
    console.log('Форма невалидна');
  }
});
