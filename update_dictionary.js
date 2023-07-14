#!/usr/bin/env node

const { existsSync } = require("fs");
const { csv2json } = require("./csv2json");
const { add2json } = require("./add2json");
const { save2json } = require("./save2json");
const { obj2string } = require("./obj2string");
const { join } = require("path");

const errMsg = `Nothing to add.
Check if "words" file exist and is not empty.
`;

if(!existsSync(join(__dirname, "words"))) {
  process.stdout.write(errMsg);
}

const csv = csv2json();
const json = csv && add2json(csv);
const data = json && obj2string(json);

data 
    ? save2json(data)
    : process.stdout.write(errMsg);
