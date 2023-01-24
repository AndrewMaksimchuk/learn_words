#!/usr/bin/env node
const { readFileSync } = require("fs");
const { save2json } = require("./save2json");

const updateWord = (data, file = "dictionary.json") => {
    const fileContent = readFileSync(file);
    const dictionary = JSON.parse(fileContent);
    const updatedDictionary = JSON.stringify([...dictionary, data]);
    return save2json(updatedDictionary);
}

const [ prog, script, summary, ...body ] = process.argv;

if (Boolean(summary) === false) console.log("'summary' keyword not provided!");

summary && body?.length && updateWord({ summary, body: body.toString().replaceAll(",", ", ") });

module.exports = { updateWord }
