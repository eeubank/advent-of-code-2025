async function solution(input) {
  let ranges = [];
  let fresh = 0;
  let totalFresh = 0;
  
  let idx = 0;
  for (const line of input) {
    idx++;
    if (line === '') {
      break;
    }

    const { min, max } = getRangeMinMax(line);
    ranges.push({ min, max });
  }

  ranges = mergeRanges(ranges);
  
  for (let i = idx; i < input.length; i++) {
    const line = input[i];
    if (isInRanges(+line, ranges)) {
      fresh++;
    }
  }

  for (const range of ranges) {
    totalFresh += (range.max + 1) - range.min;
  }

  console.log(`Fresh ingredients ${fresh}`);
  console.log(`Total fresh ingredients ${totalFresh}`);
}

function getRangeMinMax(range) {
  const [, min, max] = /(\d+)-(\d+)/.exec(range);
  return { min: +min,max: +max };
}

function isInRanges(id, ranges) {
  for (let range of ranges) {
    if (isInRange(id, range)) {
      return true;
    }
  }

  return false;
}

function isInRange(id, range) {
  if (id >= range.min && id <= range.max) {
    return true;
  }

  return false;
}

function mergeRanges(ranges) {
  let didMerge = false;
  const newRanges = [...ranges];
  
  for (let i = 0; i < newRanges.length; i++) {
    const range = newRanges[i];
    if (range.merged) {
      continue;
    }

    for (let j = 0; j < newRanges.length; j++) {
      if (i === j) {
        continue;
      }

      const otherRange = newRanges[j];
      if (otherRange.merged) {
        continue;
      }
    
      const minInRange = isInRange(range.min, otherRange);
      const maxInRange = isInRange(range.max, otherRange);
    
      if (!maxInRange && !minInRange) {
        continue;
      }
      didMerge = true;

      if (minInRange) {
        range.min = otherRange.min;
      }
      if (maxInRange) {
        range.max = otherRange.max;
      }
      
      otherRange.merged = true;
    }
  }

  return didMerge ? mergeRanges(newRanges) : newRanges.filter(r => !r.merged);
}

module.exports = solution;