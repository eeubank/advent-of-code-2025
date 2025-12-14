async function solution(input) {
  const cables = getCables(input);

  const pathYouOut = countPaths('you', 'out', cables);
  console.log(`Path you -> out ${pathYouOut.paths}`);

  const pathSvrFft = countPaths('svr', 'fft', cables, 10);
  const pathFftDac = countPaths('fft', 'dac', cables);
  const pathDacOut = countPaths('dac', 'out', cables);

  console.log(
    `Path svr -> out ${pathSvrFft.paths * pathFftDac.paths * pathDacOut.paths}`
  );
}

function getCables(input) {
  const cables = new Map();

  for (const line of input) {
    const split = line.split(' ');
    const source = split[0].replace(':', '');
    cables.set(source, split.slice(1));
  }

  return cables;
}

function countPaths(
  source,
  dest,
  cables,
  ignoreBelowDepth = Number.MAX_SAFE_INTEGER
) {
  const solved = new Map();
  let maxDepth = 0;

  let next = cables.get(source);
  if (!next) {
    return 0;
  }

  const queue = [];
  queue.push(
    ...next.map((n) => ({
      n,
      prev: [source],
      d: 1,
    }))
  );
  while ((next = queue.pop())) {
    if (solved.has(next.n)) {
      const theSolve = solved.get(next.n);
      next.prev.forEach((p) => {
        let nextSolve = solved.get(p) ?? 0;
        nextSolve += theSolve;
        solved.set(p, nextSolve);
      });
      continue;
    }

    if (next.d > ignoreBelowDepth) {
      continue;
    }

    if (next.n === dest) {
      maxDepth = Math.max(maxDepth, next.d);

      next.prev.forEach((p) => {
        let nextSolve = solved.get(p) ?? 0;
        nextSolve++;
        solved.set(p, nextSolve);
      });

      continue;
    }

    if (!cables.has(next.n)) {
      continue;
    }

    queue.push(
      ...cables.get(next.n).map((n) => ({
        n,
        prev: [...next.prev, next.n],
        d: next.d + 1,
      }))
    );
  }

  return { paths: solved.get(source) ?? 0, maxDepth: maxDepth };
}

module.exports = solution;
