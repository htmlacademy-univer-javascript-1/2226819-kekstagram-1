// Шаблон комментария
const commentTemplateHTML = '' +
  '<template id="comment">' +
  '    <li class="social__comment">' +
  '        <img ' +
  '            class="social__picture" ' +
  '            src="{{аватар}}" ' +
  '            alt="{{имя комментатора}}" ' +
  '            width="35" height="35"> ' +
  '        <p class="social__text">{{текст комментария}}</p>' +
  '    </li>' +
  '</template>';
// Добавление шаблона в конец блока body
document.body.insertAdjacentHTML('beforeend', commentTemplateHTML);

// DOM-элемент для полноразмерного поста
let bigPicture = document.querySelector('.big-picture');
// DOM-элемент - кнопка закрытия полноразмерного вида поста
let closeBidPictureButton = bigPicture.querySelector('.big-picture__cancel');
// DOM-элемент, в который прописываются комментарии
let commentsList = bigPicture.querySelector('.social__comments');
// DOM-элемент - блок счётчика комментариев
let commentsCounter = bigPicture.querySelector('.social__comment-count');
// DOM-элемент - загрузка новых комментариев
let commentsLoader = bigPicture.querySelector('.social__comments-loader');
//
let currentCommentsCounter = 0;
// Шаблон для добавления комментария под полноразмерный пост
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

// Хэндлер для полноразмерного вывода постов
let addThumbnailClickHandler = function (thumbnail, {id, url, description, likes, comments}) {
  thumbnail.addEventListener('click', function (evt) {
    evt.preventDefault();
    console.log('произошёл тык');

    // DOM-элемент - фрагмент документа, который не виден на странице
    let commentsFragment = document.createDocumentFragment();

    // Настройка отображения блоков
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    // Проставление главной информации о посте
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.social__caption').textContent = description;

    //Проставление комментариев под полноразмерный пост
    for (let i = 0; i < comments.length; i++) {
      // Клонирование шаблона комментария
      let commentElement = commentTemplate.cloneNode(true);

      // Проставление информации в комментарий
      commentElement.querySelector('.social__picture').src = comments[i].avatar;
      commentElement.querySelector('.social__picture').alt = comments[i].name;
      commentElement.querySelector('.social__text').textContent = comments[i].message;
      commentsFragment.append(commentElement);

      currentCommentsCounter = i + 1;
      if (i === 4) {
        break;
      }
    }

    //
    commentsCounter.innerHTML = currentCommentsCounter + " из <span class=\"comments-count\">4</span> комментариев";
    bigPicture.querySelector('.comments-count').textContent = comments.length.toString();


    if (currentCommentsCounter <= 5) {
      commentsLoader.disabled = true;
    }

    // Добавление фрагмента документа на страницу
    commentsList.innerHTML = '';
    commentsList.append(commentsFragment);
  });


  commentsLoader.addEventListener('click', function (evt) {
    evt.preventDefault();

    // DOM-элемент - фрагмент документа, который не виден на странице
    let commentsFragment = document.createDocumentFragment();
    let initial = currentCommentsCounter;

    console.log("тыкнуто");

    //Проставление комментариев под полноразмерный пост
    for (let i = currentCommentsCounter; i < comments.length; i++) {
      // Клонирование шаблона комментария
      let commentElement = commentTemplate.cloneNode(true);

      console.log("добавлето");

      // Проставление информации в комментарий
      commentElement.querySelector('.social__picture').src = comments[i].avatar;
      commentElement.querySelector('.social__picture').alt = comments[i].name;
      commentElement.querySelector('.social__text').textContent = comments[i].message;
      commentsFragment.append(commentElement);

      currentCommentsCounter = i + 1;
      if (i === initial + 4) {
        break;
      }
    }

    //
    commentsCounter.innerHTML = currentCommentsCounter + " из <span class=\"comments-count\">4</span> комментариев";
    bigPicture.querySelector('.comments-count').textContent = comments.length.toString();

    commentsList.append(commentsFragment);
  });

};


// Обработчик события на кнопке закрытия полноразмерного вида поста
closeBidPictureButton.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
});
// Обработчик события на Esc для закрытия полноразмерного вида поста
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});


export {addThumbnailClickHandler};
