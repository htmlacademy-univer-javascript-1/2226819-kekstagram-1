// Получение данных о постах в сервера
const getData = (onSuccess, onFail) => {
  fetch("https://26.javascript.pages.academy/kekstagram/data")
    .then((response) => {
      if (response.ok) {
        response.json()
          .then(r => onSuccess(r))
      } else {
        onFail("Не удалось загрузить посты. Перезагрузите страницу");
      }
    })
};

// Отправка данных загруженного поста на сервер
const sendData = (onSuccess, onFail, body) => {
  fetch("https://26.javascript.pages.academy/kekstagram",
    {
      method: "POST",
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};


export {getData, sendData};
