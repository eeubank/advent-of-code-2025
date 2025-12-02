const fs = require('fs');
const fsPromises = fs.promises;

async function readInput(path) {
  const buffer = await fsPromises.readFile(path);
  return buffer.toString().split('\n');
}

module.exports = readInput;