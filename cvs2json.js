const { readFileSync } = require("fs");

const maped = (value) => {
    const [summary, ...body] = value.split(" ");
    return { summary, body: body.toString().replaceAll(",", ", ") };
}

const cvs2json = (file = "words") => {
    const data = readFileSync(file);
    return data.toString().split("\n").map(maped);
}

module.exports = { cvs2json }
