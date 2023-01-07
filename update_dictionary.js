#!/usr/bin/env node

const { csv2json } = require("./csv2json");
const { add2json } = require("./add2json");
const { save2json } = require("./save2json");
const { obj2string } = require("./obj2string");

const csv = csv2json();
const json = add2json(csv);
const data = obj2string(json);
save2json(data);
