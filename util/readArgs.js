function readArgs() {
  const args = process.argv.slice(2);
  const day = args[0] ?? 'day01';
  const dataset = args[1] ?? 'example';
  return { day, dataset };
}

module.exports = readArgs;