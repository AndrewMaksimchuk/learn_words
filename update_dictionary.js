#!/usr/bin/env node

const { cvs2json } = require("./cvs2json");
const { add2json } = require("./add2json");
const { save2json } = require("./save2json");

const csv = cvs2json();
const json = add2json(csv);
const data = JSON.stringify(json);
save2json(data);
