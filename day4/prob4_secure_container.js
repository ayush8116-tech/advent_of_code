import { distinct } from "jsr:@std/collections";

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
  const uniqueDigits = distinct(digitsToCheck);
  return uniqueDigits.some(
    (uniqueDigit) => {
      const count = digitsToCheck.reduce(
        (count, digit) => digit === uniqueDigit ? count + 1 : count,
        0,
      );

      return count === 2;
    },
  );
};

export const passwordCombination = ([min, max]) => {
  let combinationCount = 0;
  for (let password = min; password <= max; password++) {
    if ((isSorted(password) && checkAdjacentRepeat(password))) {
      combinationCount++;
    }
  }

  return combinationCount;
};

console.log(passwordCombination([245182, 790572]))