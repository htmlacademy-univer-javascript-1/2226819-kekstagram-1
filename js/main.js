// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomIntInclusive = (min, max) => {
  if (min >= max) {
    throw new Error('Invalid arguments');
  }
  if (min < 0) {
    throw new Error('Range can only be positive');
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Функция для проверки длины введённого комментария
const isCorrectLength = (comment, maxLength) => {
  return comment.length <= maxLength;
}

