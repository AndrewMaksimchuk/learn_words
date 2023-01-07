const { readFileSync } = require("fs");

const maped = (value) => {
    const [summary, ...body] = value.split(" ");
    return { summary, body: body.toString().replaceAll(",", ", ") };
}

const csv2json = (file = "words") => readFileSync(file).toString().split("\n").map(maped);

module.exports = { csv2json }
