async function solution(input) {
  const machines = [];

  for (const line of input) {
    const machine = getMachine(line);
    printMachine(machine);
    machines.push(machine);
    break;
  }

  let presses = 0;
  for (const machine of machines) {
    presses += getMinInitPresses(machine);
  }

  console.log(`Presses ${presses}`);
}

function getMachine(line) {
  const machine = {
    numLights: 0,
    initState: 0,
    buttons: [],
    joltage: [],
  };

  const split = line.split(' ');

  const initState = split[0].split('');
  machine.numLights = initState.length - 2;
  for (let i = 1; i < initState.length - 1; i++) {
    machine.initState <<= 1;
    machine.initState |= initState[i] === '#' ? 1 : 0;
  }

  for (let i = 1; i < split.length - 1; i++) {
    const buttons = split[i]
      .slice(1, -1)
      .split(',')
      .map((n) => +n)
      .reduce((acc, button) => {
        acc[button] = true;
        return acc;
      }, new Array(machine.numLights).fill(false))
      .reduce((acc, button) => {
        acc <<= 1;
        acc |= button ? 1 : 0;
        return acc;
      }, 0);

    machine.buttons.push(buttons);
  }

  machine.joltage = split[split.length - 1]
    .slice(1, -1)
    .split(',')
    .map((n) => +n);

  return machine;
}

function getMinInitPresses(machine) {
  for (let i = 1; i <= machine.buttons.length; i++) {
    const combinations = getCombinations(machine.buttons, i);
    for (const combination of combinations) {
      let state = 0;
      for (const button of combination) {
        state ^= button;
      }
      if (state === machine.initState) {
        return i;
      }
    }
  }
}

function getCombinations(arr, k) {
  const result = [];

  function backtrack(currentCombination, startIndex) {
    // Base case: if the current combination has the desired length, add it to the result
    if (currentCombination.length === k) {
      result.push([...currentCombination]); // Push a copy to avoid mutation issues
      return;
    }

    // Recursive step: iterate from startIndex to explore possibilities
    for (let i = startIndex; i < arr.length; i++) {
      currentCombination.push(arr[i]); // Include the current element
      backtrack(currentCombination, i + 1); // Recurse with the next element and updated startIndex
      currentCombination.pop(); // Backtrack: remove the current element to explore other combinations
    }
  }

  backtrack([], 0); // Start the recursion with an empty combination and startIndex 0
  return result;
}

function printMachine(machine) {
  console.log(
    `Init    : ${getBitString(machine.initState, machine.numLights)}`
  );
  console.log('---');
  machine.buttons.forEach((buttons) =>
    console.log(`Buttons : ${getBitString(buttons, machine.numLights)}`)
  );
  console.log('---');
  console.log(machine.joltage);
  console.log('');
}

function getBitString(bits, len) {
  return bits.toString(2).padStart(len, '0');
}

module.exports = solution;
