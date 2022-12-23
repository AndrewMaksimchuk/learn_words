const { readFileSync } = require("fs");

const add2json = (added = [], file = "dictionary.json") => {
    if (added.length === 0) return;
    const data = readFileSync(file);
    const parsedData = JSON.parse(data);
    return [...parsedData, ...added];
}

module.exports = { add2json }
