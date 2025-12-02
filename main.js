const readInput = require('./util/readInput');
const readArgs = require('./util/readArgs');

async function main() {
  const { day, dataset } = readArgs();
  const input = await readInput(`./${day}/input_${dataset}.txt`);

  await require(`./${day}/solution`)(input);
}

main();