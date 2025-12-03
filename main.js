const readInput = require('./util/readInput');
const readArgs = require('./util/readArgs');

async function main() {
  const { day, dataset } = readArgs();
  const input = await readInput(`./${day}/input_${dataset}.txt`);

  const startTime = Date.now();
  await require(`./${day}/solution`)(input);
  const endtime = Date.now();

  console.log(`Time: ${endtime - startTime} ms`);
}

main();