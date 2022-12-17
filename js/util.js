const ALERT_SHOW_TIME = 5000;


// Проверка на нажатие Escape
const isEscapeKey = (evt) => {
  return evt.key === 'Escape';
};

// Функция поиска выбранной радио-кнопки
let getCheckedRadioButton = function (radios) {
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return  radios[i].value.toString();
    }
  }
};

// Вывод сообщения ошибки отправки формы / получения данных
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}


export {isEscapeKey, getCheckedRadioButton, showAlert};
