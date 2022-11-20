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
let commentsLoader = bigPicture.querySelector('.comments-loader');
// Шаблон для добавления комментария под полноразмерный пост
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

// Хэндлер для полноразмерного вывода постов
let addThumbnailClickHandler = function (thumbnail, {id, url, description, likes, comments}) {
  thumbnail.addEventListener('click', function () {
    // DOM-элемент - фрагмент документа, который не виден на странице
    let commentsFragment = document.createDocumentFragment();

    // Настройка отображения блоков
    bigPicture.classList.remove('hidden');
    commentsCounter.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.body.classList.add('modal-open');

    // Проставление главной информации о посте
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.comments-count').textContent = comments.length.toString();
    bigPicture.querySelector('.social__caption').textContent = description;

    //Проставление комментариев под полноразмерный пост
    comments.forEach(({id, avatar, message, name}) => {
      // Клонирование шаблона комментария
      let commentElement = commentTemplate.cloneNode(true);

      // Проставление информации в комментарий
      commentElement.querySelector('.img').src = avatar;
      commentElement.querySelector('.img').alt = name;
      commentElement.querySelector('.social__text').textContent = message;
      commentsFragment.append(commentElement);
    });

    // Добавление фрагмента документа на страницу
    commentsList.innerHTML = '';
    commentsList.append(commentsFragment);
  });
};

// Обработчик события на кнопке закрытия полноразмерного вида поста
closeBidPictureButton.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});
// Обработчик события на Esc для закрытия полноразмерного вида поста
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
  }
});


export {addThumbnailClickHandler};
