// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomIntInclusive = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Функция для проверки длины введённого комментария
const isCorrectLength = (comment, maxLength) => {
  return comment.length <= maxLength;
}

// Функция для получения рандомного элемента из массива elements
const getRandomArrayElement = (elements) => {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};

const isEscapeKey = (evt) => {
  return evt.key === 'Escape';
};


export {getRandomIntInclusive, getRandomArrayElement, isEscapeKey};
