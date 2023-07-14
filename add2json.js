const { readFileSync } = require("fs");
const { join } = require("path");
const { isAdded } = require("./isAdded.js");

const add2json = (
  addedWords = [],
  file = "dictionary.json"
) => {
  if (addedWords.length === 0) return;

  const pathToFile = join(__dirname, file);
  const data = readFileSync(pathToFile);
  const dictionary = JSON.parse(data);
  const needAdded = isAdded(dictionary, addedWords);

  return needAdded
    ? [...dictionary, ...needAdded]
    : undefined;
}

module.exports = { add2json }
