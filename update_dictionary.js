#!/usr/bin/env node

const { cvs2json } = require("./cvs2json");
const { add2json } = require("./add2json");
const { save2json } = require("./save2json");
const { obj2string } = require("./obj2string");

const csv = cvs2json();
const json = add2json(csv);
const data = obj2string(json);
save2json(data);
