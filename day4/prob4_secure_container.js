export const sort = (number) => {
  return parseInt(
    String(number).split("").sort((x, y) => parseInt(x) - parseInt(y)).join(""),
  );
};

export const isSorted = (number) => {
  return number === sort(number);
};

export const checkAdjacentRepeat = (number) => {
  const digitsToCheck = String(number).split("").map((x) => parseInt(x));
  let isRepeating = false;
  digitsToCheck.reduce((current, next) => {
    if(current === next) {
      isRepeating = true;
    }
    return next;
  });

  return isRepeating;
};

export const passwordCombination = ([min, max]) => {
  let combinationCount = 0;
  for(let password = min; password <= max; password++) {
    if(isSorted(password) && checkAdjacentRepeat(password)) {
      combinationCount++;
    }
  }

  return combinationCount;
}

console.log(passwordCombination([245182, 790572]))