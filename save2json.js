const { writeFileSync } = require("fs");

const save2json = (data, file = "dictionary.json") => writeFileSync(file, data);

module.exports = { save2json }
