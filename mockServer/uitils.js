function createArrayWithNumbers(length) {
  return Array.from({length}, (_, k) => k + 1);
}

function randInt(min, max) {
  if (min && max) {
    return parseInt(Math.random() * (max - min) + min, 10);
  }
  return 0;
}

export {createArrayWithNumbers, randInt};
