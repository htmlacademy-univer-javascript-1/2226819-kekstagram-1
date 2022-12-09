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

// Шаблон для добавления комментария под полноразмерный пост
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');


// Хэндлер для полноразмерного вывода постов
let addThumbnailClickHandler = function (thumbnail, {id, url, description, likes, comments}) {
  thumbnail.addEventListener('click', function (evt) {
    evt.preventDefault();

    // Настройка отображения блоков
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    // Проставление главной информации о посте
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.social__caption').textContent = description;

    // Счётчик комментариев
    let currentCommentsCounter = 0;
    // Добавляем первые 5 комментариев
    currentCommentsCounter = showComment(currentCommentsCounter, comments);

    // Добавляем лисенер на кнопку загрузки комментариев
    commentLoaderHandler(currentCommentsCounter, comments);
  });
};

// Добавление лисенера на кнопку загрузки комментариев
let commentLoaderHandler = function (currentCommentsCounter, comments) {
  commentsLoader.addEventListener('click', function (evt) {
    evt.preventDefault();

    // Добавляем по 5 комментариев
    currentCommentsCounter = showComment(currentCommentsCounter, comments);
  });
};

// Добавление комментариев на полноразмерный пост
let showComment = function (currentCommentsCounter, comments) {
  // DOM-элемент - фрагмент документа, который не виден на странице
  let commentsFragment = document.createDocumentFragment();
  // Стартовый индекс добавляемых комментариев
  let startCommentIndex = currentCommentsCounter;

  //Проставление комментариев под полноразмерный пост
  for (let i = startCommentIndex; i < comments.length; i++) {
    // Клонирование шаблона комментария
    let commentElement = commentTemplate.cloneNode(true);

    // Проставление информации в комментарий
    commentElement.querySelector('.social__picture').src = comments[i].avatar;
    commentElement.querySelector('.social__picture').alt = comments[i].name;
    commentElement.querySelector('.social__text').textContent = comments[i].message;
    commentsFragment.append(commentElement);

    currentCommentsCounter += 1;
    // Если добавлены 5 комментариев, то цикл останавливается
    if (i === startCommentIndex + 4) {
      break;
    }
  }

  // Обновление информации счётчика
  commentsCounter.innerHTML = currentCommentsCounter + " из <span class=\"comments-count\"></span> комментариев";
  bigPicture.querySelector('.comments-count').textContent = comments.length.toString();

  // Добавление фрагмента документа на страницу
  if (startCommentIndex === 0) {
    commentsList.innerHTML = '';
  }
  commentsList.append(commentsFragment);

  // Возвращаем стартовый индекс следующей партии комментариев
  return currentCommentsCounter;
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
