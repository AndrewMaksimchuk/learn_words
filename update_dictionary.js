#!/usr/bin/env node

const { existsSync, copyFileSync, unlinkSync, writeFileSync } = require("fs");
const { join } = require("path");
const { csv2json } = require("./csv2json");
const { add2json } = require("./add2json");
const { save2json } = require("./save2json");
const { obj2string } = require("./obj2string");

const errMsg = `Nothing to add.
Check if "words" file exist and is not empty.
`;

const printUpdates = (csv = []) => {
  process.stdout.write(`[ INFO ] Dictionary update with ${csv.length} words\n`);
}

const rawWordsFile = join(__dirname, "words")

const save2history = () => {
  const dest = join(__dirname, "history", String(Date.now()));
  copyFileSync(rawWordsFile, dest);
}

const clearWordsFile = () => {
  unlinkSync(rawWordsFile);
  writeFileSync(rawWordsFile, "");
}

if(!existsSync(rawWordsFile)) {
  process.stdout.write(errMsg);
}

const csv = csv2json();
const json = csv && add2json(csv);
const data = json && obj2string(json);

data 
    ? (save2history(), save2json(data), printUpdates(csv), clearWordsFile())
    : process.stdout.write(errMsg);
