const { writeFileSync } = require("fs");
const { join } = require("path");

const save2json = (data, file = "dictionary.json") => writeFileSync(join(__dirname, file), data);

module.exports = { save2json }
