async function solution(input) {
  let joltage = 0;
  let unsafeJoltage = 0;

  for ( line of input ) {
    joltage += getMaxJoltage(line, 2);
    unsafeJoltage += getMaxJoltage(line, 12);
  }

  console.log(`Joltage: ${joltage}`);
  console.log(`Unsafe Joltage: ${unsafeJoltage}`);
}

function getMaxJoltage(battery, batteryLimit) {
  const arr = battery.split('');

  const batteries = new Array(batteryLimit).fill(0);

  let currBattery = 0;
  let firstIdx = 0;
  
  while (currBattery < batteryLimit) {
    for (let i = firstIdx; i < arr.length - (batteryLimit - (currBattery + 1)); i++) {
      const num = +arr[i];
      if (num > batteries[currBattery]) {
        batteries[currBattery] = num;
        firstIdx = i + 1;
      }
    }

    currBattery++;
  }

  return +batteries.join('');
}

module.exports = solution;