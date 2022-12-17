import './util.js';
import './upload-preview.js';
import './scale.js';
import './effects.js';
import {getData} from "./api.js";
import {renderPosts} from "./thumbnails.js";
import {showAlert} from "./util.js";
import {setUserFormSubmit} from "./upload-form.js";
import {successfulUpload, errorUpload} from "./upload-preview.js";


// Получение данных с сервера
getData(
  (posts) => renderPosts(posts),
  (message) => showAlert(message)
);

// Отправка данных на сервер при отправке формы
setUserFormSubmit(successfulUpload, errorUpload);
