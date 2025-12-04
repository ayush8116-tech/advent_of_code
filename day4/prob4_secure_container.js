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
  let i = 0;

  while (i < digitsToCheck.length) {
    if(isRepeating && (digitsToCheck[i] === digitsToCheck[i + 1])) {
      isRepeating = false;
      i = i + 2;
    }
    
    if(isRepeating) return isRepeating; 
    
    if(i < digitsToCheck.length && (digitsToCheck[i] === digitsToCheck[i + 1])) {
     isRepeating = true
   }

    i++
  }

  return isRepeating;
};

export const passwordCombination = ([min, max]) => {
  let combinationCount = 0;
  for (let password = min; password <= max; password++) {
    if (isSorted(password) && checkAdjacentRepeat(password)) {
      combinationCount++;
    }
  }

  return combinationCount;
};

console.log(passwordCombination([245182, 790572]));
