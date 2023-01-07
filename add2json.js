const { readFileSync } = require("fs");
const { isAdded } = require("./isAdded.js");

const add2json = (addedWords = [], file = "dictionary.json") => {
    if (addedWords.length === 0) return;
    const data = readFileSync(file);
    const dictionary = JSON.parse(data);
    const needAdded = isAdded(dictionary, addedWords);
    return needAdded ? [...dictionary, ...needAdded] : undefined;
}

module.exports = { add2json }
