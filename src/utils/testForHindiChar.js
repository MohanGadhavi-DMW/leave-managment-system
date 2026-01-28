// helper function to test for hindi chars in a string - usage in cab filters
const hindiRegx = () => {
  const numberOfHindiCharacters = 128;
  const unicodeShift = 0x0900;
  const hindiAlphabet = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numberOfHindiCharacters; i++) {
    hindiAlphabet.push(`\\u0${(unicodeShift + i).toString(16)}`);
  }

  return hindiAlphabet;
};

const hindiRegxChr = hindiRegx();
// test for hindi char
export const TestForHindiChar = (str) => {
  const regex = new RegExp(
    `(?:^|\\s)[${hindiRegxChr.join("")}]+?(?:\\s|$)`,
    "g"
  );
  return str && !!str.match(regex);
};
