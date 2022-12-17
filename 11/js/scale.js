import {scaleClasses} from "./data.js";


// Кнопка уменьшения масштаба загруженного фото
const smallerButton = document.querySelector(".scale__control--smaller");
// Кнопка увеличения масштаба загруженного фото
const biggerButton = document.querySelector(".scale__control--bigger");
// Поле значение масштаба загруженного фото
const scaleValueInput = document.querySelector(".scale__control--value");
// DOM-элемент - загруженное фото
const uploadPhotoPreview = document.querySelector(".img-upload__preview");


// Логика уменьшения масштаба фото
smallerButton.addEventListener("click", function (evt) {
  evt.preventDefault();

  // Получение текущего значения масштаба (отсекаем знак процента)
  let scaleValue = parseInt(scaleValueInput.value.slice(0, scaleValueInput.value.length - 1));
  // Вычисление следующего значения
  if (scaleValue - 25 <= 25) {    // минимальное значение = 25
    scaleValue = 25;
  } else {
    scaleValue -= 25;
  }

  // Вызов функцию изменения масштаба uploadPhotoPreview
  changeScale(scaleValue);
});

// Логика увеличения масштаба фото
biggerButton.addEventListener("click", function (evt) {
  evt.preventDefault();

  // Получение текущего значения масштаба (отсекаем знак процента)
  let scaleValue = parseInt(scaleValueInput.value.slice(0, scaleValueInput.value.length - 1));
  // Вычисление следующего значения
  if (scaleValue + 25 >= 100) {    // масимальное значение = 100
    scaleValue = 100;
  } else {
    scaleValue += 25;
  }

  // Вызов функцию изменения масштаба uploadPhotoPreview
  changeScale(scaleValue);
});


// Функция, которая изменает масштаб uploadPhotoPreview
let changeScale = function (scaleValue) {
  // Удаление ранее добавленного класса масштаба (перебором всех классов)
  Object.entries(scaleClasses).forEach(entry => {
    const [key, value] = entry;
    uploadPhotoPreview.classList.remove(value);
  });

  // Добавление значения текущего масштаба в scaleValueInput
  scaleValueInput.value = scaleValue.toString() + "%";
  // Добавление полученного класса масштаба
  uploadPhotoPreview.classList.add(scaleClasses[scaleValue]);
};
