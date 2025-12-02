async function solution(input) {
  let acc1 = 0;
  let acc2 = 0;

  const ranges = input[0].split(',');

  for (const range of ranges) {
    const { min, max } = getRangeMinMax(range);
    for (let i = min; i <= max; i++) {
      if (isInvalidId(i)) {
        acc1 += i;
      } else if (isInvaliderId(i)) {
        acc2 += i;
      }
    }
  }

  console.log(`Invalid IDs: ${acc1}`);
  console.log(`Invalider IDs: ${acc1 + acc2}`);
}

function getRangeMinMax(range) {
  const [, min, max] = /(\d+)-(\d+)/.exec(range);
  return { min: +min,max: +max };
}

function isInvalidId(id) {
  const str = `${id}`;

  if (str.length % 2 !== 0) {
    return false;
  }

  const split = splitString(str, 2);

  return split[0] === split[1];
}

function isInvaliderId(id) {
  const str = `${id}`;
  
  for ( let i = 3; i <= str.length; i++) {
    if (str.length % i !== 0) {
      continue;
    }

    let isInvalid = true;
    const split = splitString(str, i);
    for ( let j = 1; j < split.length; j++ ) {
      if (split[j] !== split[j - 1]) {
        isInvalid = false;
        break;
      }
    }

    if (isInvalid) {
      return true;
    }
  }

  return false;
}

function splitString(str, chunks) {
  const arr = str.split('');
  const splits = []
  const len = arr.length / chunks;
  for ( let i = 0; i < chunks; i++ ) {
    const start = 0 * chunks;
    splits.push(arr.splice(start, start + len).join(''));
  }
  return splits;
}

module.exports = solution;