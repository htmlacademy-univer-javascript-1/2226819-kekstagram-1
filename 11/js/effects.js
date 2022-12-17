import {effectClasses} from "./data.js";
import {getCheckedRadioButton} from "./util.js";


// DOM-элемент, к которому далее будет предписан слайдер
const sliderElement = document.querySelector('.effect-level__slider');
// Добавление класса hidden к слайдеру, так как изначально открывается фото без эффектов
sliderElement.classList.add("hidden");

// DOM-элемент - загруженное фото
const uploadPhotoPreview = document.querySelector(".img-upload__preview");
// Список радио-кнопок с эффектами
const effectsList = document.getElementsByName("effect");
// Input для значения глубины эффекта
const effectLevel = document.querySelector(".effect-level__value");


// Инициализация слайдера в sliderElement с помощью noUiSlider
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

// Логика изменения глубины эффекта
sliderElement.noUiSlider.on('update', () => {
  // Получаем текущее значение слайдера
  effectLevel.value = sliderElement.noUiSlider.get();
  // Получение текущего выбранного эффекта
  let effect = getCheckedRadioButton(effectsList);

  // Изменение текущего значения текущего эффекта в CSS
  if (effect === "chrome") {
    uploadPhotoPreview.style.filter = `grayscale(${sliderElement.noUiSlider.get()})`;
  } else if (effect === "sepia") {
    uploadPhotoPreview.style.filter = `sepia(${sliderElement.noUiSlider.get()})`;
  } else if (effect === "marvin") {
    uploadPhotoPreview.style.filter = `invert(${sliderElement.noUiSlider.get()}%)`;
  } else if (effect === "phobos") {
    uploadPhotoPreview.style.filter = `blur(${sliderElement.noUiSlider.get()}px)`;
  } else if (effect === "heat") {
    uploadPhotoPreview.style.filter = `brightness(${sliderElement.noUiSlider.get()})`;
  }
});

// Обновление настроек слайдера в зависимости от текущего эффекта
let updateSlidersOptions = function (effect) {
  if (effect === "chrome" || effect === "sepia") {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
      connect: 'lower'
    });
  } else if (effect === "marvin") {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1,
      connect: 'lower'
    });
  } else if (effect === "phobos") {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1,
      connect: 'lower'
    });
  } else if (effect === "heat") {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1,
      connect: 'lower'
    });
  }
};


// Логика при изменении выбора радио-кнопки эффекта
effectsList.forEach(button => {
  button.addEventListener('change', function (evt) {
    evt.preventDefault();

    // Получение текущего выбранного эффекта
    const effect = getCheckedRadioButton(effectsList);

    // Удаление всех ранее применяемых классов эффектов (путём перебора)
    effectClasses.forEach(effectClass => {
      uploadPhotoPreview.classList.remove(effectClass);
    });
    // Обновление настроек слайдера
    updateSlidersOptions(button.value);

    // Если выбран режим просмотра фото без эффект, то слайдер не показывается
    if (effect === "none") {
      sliderElement.classList.add("hidden");
      // Убираем фильтр на загруженной фотографии (времени разобраться не было, и я просто обнулил grayscale())
      uploadPhotoPreview.style.filter = `grayscale(0)`;
    } else {
      sliderElement.classList.remove("hidden");
      uploadPhotoPreview.classList.add(`effects__preview--${effect}`);
    }
  });
});
