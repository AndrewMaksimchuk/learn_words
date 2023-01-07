#!/usr/bin/env node

const { csv2json } = require("./csv2json");
const { add2json } = require("./add2json");
const { save2json } = require("./save2json");
const { obj2string } = require("./obj2string");

try {
    const csv = csv2json();
    const json = csv && add2json(csv);
    const data = json && obj2string(json);
    data 
        ? save2json(data)
        : process.stdout.write("Nothing to add.\nCheck if \"words\" file exist and is not empty.\n");    
}
catch (error) {
    process.stderr.write("Error is happened");
}
