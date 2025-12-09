async function solution(input) {
  const junctions = getJunctions(input);

  const distances = calcAllDistances(junctions);

  const numExtensionCords = +input[0];
  const { largestCircuits, lastJunctions } = getLargestCircuits(
    numExtensionCords,
    junctions.length,
    distances
  );
  const largestCircuitProduct = largestCircuits.reduce(
    (acc, c) => acc * c.length,
    1
  );
  const distanceFromWall = lastJunctions[0].x * lastJunctions[1].x;

  console.log(`Largest circuits ${largestCircuitProduct}`);
  console.log(`Distance from wall ${distanceFromWall}`);
}

function getJunctions(input) {
  const junctions = [];

  for (let i = 2; i < input.length; i++) {
    const [x, y, z] = input[i].split(',');
    junctions.push({ id: i, x: +x, y: +y, z: +z });
  }

  return junctions;
}

function calcAllDistances(junctions) {
  const distances = [];

  for (let i = 0; i < junctions.length; i++) {
    for (let j = i + 1; j < junctions.length; j++) {
      distances.push({
        j1: junctions[i],
        j2: junctions[j],
        distance: distanceBetweenJunctions(junctions[i], junctions[j]),
      });
    }
  }

  return distances;
}

function distanceBetweenJunctions(j1, j2) {
  return Math.sqrt(
    Math.pow(j2.x - j1.x, 2) +
      Math.pow(j2.y - j1.y, 2) +
      Math.pow(j2.z - j1.z, 2)
  );
}

function getLargestCircuits(numExtensionCords, totalJunctions, distances) {
  const circuits = [];
  let largestCircuits;
  const map = new Map();
  let remainingJunctions = totalJunctions;

  distances.sort((a, b) => a.distance - b.distance);

  let i = 0;
  let d;
  while (remainingJunctions > 0) {
    d = distances[i];
    const hasJ1 = map.has(d.j1.id);
    const hasJ2 = map.has(d.j2.id);

    if (!hasJ1 && !hasJ2) {
      // new circuit
      circuits.push([d.j1.id, d.j2.id]);
      map.set(d.j1.id, { circuit: circuits.length - 1 });
      map.set(d.j2.id, { circuit: circuits.length - 1 });
      remainingJunctions -= 2;
    } else if (hasJ1 && hasJ2) {
      const j1 = map.get(d.j1.id);
      const j2 = map.get(d.j2.id);
      if (j1.circuit !== j2.circuit) {
        // connect circuits
        circuits[j1.circuit].push(...circuits[j2.circuit]);
        const j2Circuit = j2.circuit;
        for (const j of circuits[j2Circuit]) {
          map.get(j).circuit = j1.circuit;
        }
        circuits[j2Circuit] = [];
      }
    } else if (hasJ1) {
      // add j2 to circuit
      const j1 = map.get(d.j1.id);
      map.set(d.j2.id, { circuit: j1.circuit });
      j1.open = false;
      circuits[j1.circuit].push(d.j2.id);
      remainingJunctions--;
    } else if (hasJ2) {
      // add j1 to circuit
      const j2 = map.get(d.j2.id);
      map.set(d.j1.id, { circuit: j2.circuit });
      j2.open = false;
      circuits[j2.circuit].push(d.j1.id);
      remainingJunctions--;
    }

    if (i++ === numExtensionCords - 1) {
      largestCircuits = structuredClone(circuits)
        .sort((a, b) => b.length - a.length)
        .slice(0, 3);
    }
  }

  return { largestCircuits, lastJunctions: [d.j1, d.j2] };
}

module.exports = solution;
