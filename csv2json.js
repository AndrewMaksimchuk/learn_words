const { readFileSync, existsSync } = require("fs");
const { join } = require("path");

const maped = (value) => {
    const [summary, ...body] = value.split(" ");
    return { summary, body: body.toString().replaceAll(",", ", ") };
}

const csv2json = (file = "words") => existsSync(join(__dirname, file))
    && readFileSync(file).toString().split("\n").map(maped);

module.exports = { csv2json }
