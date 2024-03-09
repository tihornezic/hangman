import "@testing-library/jest-dom";
import { calculateScoreSmarter } from "../helpers/helpers";

describe("Score of the solution with fewer errors", () => {
  test("should always be higher than for the solution with more errors", () => {
    const solutionWithFewerErrors = calculateScoreSmarter(10, 5, 1, 1000);
    const solutionWithMoreErrors = calculateScoreSmarter(10, 5, 3, 1000);

    expect(solutionWithFewerErrors).toBeGreaterThan(solutionWithMoreErrors);
  });
});

describe("Given the same number of errors, solutions with larger numbers of unique letters", () => {
  test("should be scored higher", () => {
    const solutionWithMoreUniqueCharacters = calculateScoreSmarter(
      10,
      8,
      2,
      1200
    );
    const solutionWithFewerUniqueCharacters = calculateScoreSmarter(
      10,
      5,
      2,
      1200
    );

    expect(solutionWithMoreUniqueCharacters).toBeGreaterThan(
      solutionWithFewerUniqueCharacters
    );
  });
});

describe("Given the same number of errors and unique letters", () => {
  test("longer solutions (quoteLenght) should be scored higher", () => {
    const scoreWithLongerSolution = calculateScoreSmarter(15, 5, 2, 1200);
    const scoreWithShorterSolution = calculateScoreSmarter(10, 5, 2, 1200);

    expect(scoreWithLongerSolution).toBeGreaterThan(scoreWithShorterSolution);
  });
});

describe("Given the same number of errors, unique letters, and quote length", () => {
  test("faster solutions should result in a higher score", () => {
    const scoreWithFasterSolution = calculateScoreSmarter(10, 5, 2, 800);
    const scoreWithSlowerSolution = calculateScoreSmarter(10, 5, 2, 1200);

    expect(scoreWithFasterSolution).toBeGreaterThan(scoreWithSlowerSolution);
  });
});
