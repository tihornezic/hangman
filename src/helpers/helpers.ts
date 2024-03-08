// export const specialCharactersRegex = /[,'";:<>\/\\[\]{}()=_+`~!@#$%^&*|.\s]/;
export const specialCharactersRegex = /[,'";:<>\/\\[\]{}()=_+`~!@#$%^&*|\-.\s]/;

export const findUniqueCharacters = (str: string) => {
  const cleanedSentence = str.replace(
    /[.,'";:<>\/\\[\]{}()=_+`~!@#$%^&*|\s]/g,
    ""
  );

  return [...cleanedSentence.toLowerCase()].reduce((acc, curr) => {
    return acc.includes(curr) ? acc : acc + curr;
  }, "");
};

export const calculateArrayOfWordsArrayOfChars = (sentence: string) =>
  sentence
    .split(" ")
    .map((word) => word)
    .map((arr) => arr.split(""));

export const doArraysHaveSameLetters = (
  uniqueCharacters: string,
  corrects: string[]
): boolean => {
  // sort the arrays and convert them to strings
  const sortedUnique = uniqueCharacters.split("").sort().join("");
  const correctsString = corrects.sort().join("");

  // compare the sorted strings
  return sortedUnique === correctsString;
};

export const calculateScore = (numberOfErrors: number) =>
  100 / 1 + numberOfErrors;
