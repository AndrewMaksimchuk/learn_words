const { readFileSync, existsSync } = require("fs");
const { join } = require("path");

const accumulator = [];

const normalize = (value) => {
  return value.trim().toLowerCase();
}

const accumulatorPush = (text) => {
  accumulator.push(text);
  return true;
}

const removeDuplicates = (row) => {
  const [ summary, ] = row.split(" ");
  const normSummary = normalize(summary);
  return accumulator.includes(normSummary) ? false : accumulatorPush(normSummary);
}

const maped = (row) => {
  const [summary, ...rest] = row.split(" ");
  const body = rest.join(" ");
  return { summary, body };
}

const csv2json = (file = "words") => {
  const pathtofile = join(__dirname, file);
  return (
    existsSync(pathtofile) &&
    readFileSync(pathtofile)
      .toString('utf8')
      .split("\n")
      .filter(Boolean)
      .filter(removeDuplicates)
      .map(maped));
}

module.exports = { csv2json }
