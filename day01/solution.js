async function solution(input) {
  let position = 50;
  let zeros = 0;
  let clicks = 0;

  for (const line of input) {
    let { isRight, offset } = getMove(line);

    while (offset > 100) {
      offset -= 100;
      clicks++;
    }

    let nextPosition = position + (isRight ? offset : -offset);

    if (nextPosition < 0) {
      nextPosition += 100;
      if (position !== 0) {
        clicks++;
      }
    }

    if (nextPosition > 100) {
      nextPosition -= 100;
      if (position !== 0) {
        clicks++;
      }
    }

    if (nextPosition === 0 || nextPosition === 100) {
      zeros++;
      clicks++;
    }

    if (nextPosition === 100) {
      nextPosition = 0;
    }

    position = nextPosition;
  }

  console.log(`Combo: ${zeros}`);
  console.log(`Clicks: ${clicks}`);
}

function getMove(line) {
  const [, dir, offset] = /(L|R){1}(\d+)/.exec(line);
  return { isRight: dir === 'R', offset: +offset };
}

module.exports = solution;
