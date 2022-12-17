import {addThumbnailClickHandler} from './big-picture.js';


// DOM-элемент - список миниатюр
const thumbnailsList = document.querySelector('.pictures');
// DOM-элемент - шаблон для постов
const postTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
// DOM-элемент - фрагмент документа, который не виден на странице
const postsFragment = document.createDocumentFragment();


// Рендер постов при загрузке страницы
const renderPosts = function (postsData) {
  // Создание DOM-элементов, соответствующих фотографиям
  postsData.forEach(({comments, description, id, likes, url}) => {
    // Клонирование элемента поста из шаблона
    const postElement = postTemplate.cloneNode(true);

    // Наполнение полученного элемента данными
    postElement.querySelector('.picture__img').src = url;
    postElement.querySelector('.picture__likes').textContent = likes;
    postElement.querySelector('.picture__comments').textContent = comments.length;

    // Добавление элемента во фрагмент документа
    postsFragment.appendChild(postElement);
  });

  // Добавление полученных постов в список миниатюр из фрагмента документа
  thumbnailsList.appendChild(postsFragment);

  // Добавление обработчиков событий на миниатюры (с использованием замыкания)
  for (let i = 2; i < thumbnailsList.children.length; i++) {
    addThumbnailClickHandler(thumbnailsList.children[i], postsData[i - 2]);
  }
};


export {renderPosts};
