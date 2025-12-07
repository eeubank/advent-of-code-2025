async function solution(input) {
  const manifolds = getManifolds(input);
  const { totalSplits, totalTimelines } = getTotalSplits(manifolds);

  console.log(`Splits ${totalSplits}`);
  console.log(`Timelines ${totalTimelines}`);
}

function getManifolds(input) {
  const manifolds = [];

  for (let i = 0; i < input.length; i += 2) {
    if (input[i] === '') {
      break;
    }
    const row = [];
    for (let j = 0; j < input[i].length; j++) {
      if (['^', 'S'].includes(input[i][j])) {
        row.push(j);
      }
    }
    manifolds.push(row);
  }

  return manifolds;
}

function getTotalSplits(manifolds) {
  let beams = new Map();
  beams.set(manifolds[0][0], 1);
  let totalSplits = 0;

  for (let i = 1; i < manifolds.length; i++) {
    const { newBeams, splits } = splitBeam(manifolds[i], beams);
    beams = newBeams;
    totalSplits += splits;
  }

  const totalTimelines = [...beams.values()].reduce((a, v) => (a += v));
  return { totalSplits, totalTimelines };
}

function splitBeam(manifoldRow, beams) {
  const newBeams = new Map();
  let splits = 0;

  for (const [beam, count] of beams) {
    if (manifoldRow.includes(beam)) {
      setBeam(newBeams, beam - 1, count);
      setBeam(newBeams, beam + 1, count);

      splits++;
    } else {
      setBeam(newBeams, beam, count);
    }
  }

  return { newBeams, splits };
}

function setBeam(beams, beam, count) {
  if (beams.has(beam)) {
    beams.set(beam, beams.get(beam) + count);
  } else {
    beams.set(beam, count);
  }
}

module.exports = solution;
