const { readFileSync, existsSync } = require("fs");
const { join } = require("path");

const maped = (value) => {
  const [summary, ...rest] = value.split(" ");
  const body = rest
    .toString()
    .replaceAll(",", ", ");
  return { summary, body, };
}

const csv2json = (file = "words") => {
  const pathtofile = join(__dirname, file);
  return (
    existsSync(pathtofile) &&
    readFileSync(pathtofile)
      .toString()
      .split("\n")
      .map(maped));
}

module.exports = { csv2json }
