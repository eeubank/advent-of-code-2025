async function solution(input) {
  let totalAccessibleRolls = 0;
  let removedRolls = new Set();
  let iterations = 0;
  
  const rows = getRows(input);

  while (true) {
    iterations++;
    const { accessibleRolls, pendingRemovedRolls } = getAccessibleRolls(rows, removedRolls);

    if (totalAccessibleRolls === 0) {
      totalAccessibleRolls += accessibleRolls;
    }

    if (pendingRemovedRolls.length) {
      removedRolls.add(...pendingRemovedRolls);
    }

    if (accessibleRolls === 0) {
      break;
    }
  }
  
  console.log(`Accessible rolls: ${totalAccessibleRolls}`);
  console.log(`Removed rolls: ${removedRolls.size}`);
  console.log(`Iterations: ${iterations}`);
}

function getAccessibleRolls(rows, removedRolls) {
  let accessibleRolls = 0;
  let pendingRemovedRolls = [];
  
  for (let i = 1; i < rows.length; i++) {
    const { accessibleRollsInRow, pendingRemovedRollsInRow } = getAccessibleRollsForRow(rows, i, removedRolls);
    accessibleRolls += accessibleRollsInRow;
    pendingRemovedRolls.push(...pendingRemovedRollsInRow);
  }

  return { accessibleRolls, pendingRemovedRolls };
}

function getAccessibleRollsForRow(rows, currentRow, removedRolls) {
  let accessibleRollsInRow = 0;
  const pendingRemovedRollsInRow = [];

  for (let i = 1; i < rows[currentRow].length - 1; i++) {
    if (!isRoll(rows, currentRow, i, removedRolls)) {
      continue;
    }

    let rolls = 0;

    rolls += isRoll(rows, currentRow - 1, i - 1, removedRolls) ? 1 : 0;
    rolls += isRoll(rows, currentRow - 1, i, removedRolls) ? 1 : 0;
    rolls += isRoll(rows, currentRow - 1, i + 1, removedRolls) ? 1 : 0;

    rolls += isRoll(rows, currentRow, i - 1, removedRolls) ? 1 : 0;
    rolls += isRoll(rows, currentRow, i + 1, removedRolls) ? 1 : 0;

    rolls += isRoll(rows, currentRow + 1, i - 1, removedRolls) ? 1 : 0;
    rolls += isRoll(rows, currentRow + 1, i, removedRolls) ? 1 : 0;
    rolls += isRoll(rows, currentRow + 1, i + 1, removedRolls) ? 1 : 0;

    if (rolls < 4) {
      accessibleRollsInRow++;
      pendingRemovedRollsInRow.push(getSetKey(currentRow, i));
    }
  }

  return { accessibleRollsInRow, pendingRemovedRollsInRow };
}

function isRoll(rows, currentRow, i, removedRolls) {
  const setKey = getSetKey(currentRow, i);

  return rows[currentRow][i] === true && !removedRolls.has(setKey);
}

function getSetKey(currentRow, i) {
  return currentRow * 1000 + i;
}

function getRow(line) {
  const row = line.split('').map(v => v === '@');
  row.push(false);
  row.unshift(false);

  return row;
}

function getEmptyRow(length) {
  return new Array(length + 2).fill(false);
}

function getRows(input) {
  const rows = new Array(input.length + 2);

  rows[0] = getEmptyRow(input[0].length);
  for (let i = 0; i < input.length; i++) {
    rows[i + 1] = getRow(input[i]);
  }
  rows[input.length + 1] = getEmptyRow(input[0].length);

  return rows;
}

module.exports = solution;