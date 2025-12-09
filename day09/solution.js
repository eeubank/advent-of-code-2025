async function solution(input) {
  const redTiles = getRedTiles(input);
  const rectangles = getRectanglesAndArea(redTiles);
  let containedRect;

  for (let rect of rectangles) {
    if (polyIsContained(rect.rect, redTiles)) {
      containedRect = rect;
      break;
    }
  }

  console.log(`Largest rectangle ${rectangles[0].area}`);
  console.log(`Largest contained rectangle ${containedRect.area}`);
}

function getRedTiles(input) {
  const redTiles = [];

  for (const line of input) {
    const [x, y] = line.split(',');
    redTiles.push(getPoint(+x, +y));
  }

  return redTiles;
}

function getRectanglesAndArea(redTiles) {
  const rectangles = [];

  for (let i = 0; i < redTiles.length; i++) {
    for (let j = i + 1; j < redTiles.length; j++) {
      const rt1 = redTiles[i];
      const rt2 = redTiles[j];
      const xMin = Math.min(rt1.x, rt2.x);
      const xMax = Math.max(rt1.x, rt2.x);
      const yMin = Math.min(rt1.y, rt2.y);
      const yMax = Math.max(rt1.y, rt2.y);
      const rect = [
        getPoint(xMin, yMin),
        getPoint(xMax, yMin),
        getPoint(xMin, yMax),
        getPoint(xMax, yMax),
      ];
      const area = (xMax - xMin + 1) * (yMax - yMin + 1);
      rectangles.push({ rect, area });
    }
  }

  rectangles.sort((a, b) => b.area - a.area);
  return rectangles;
}

function getPoint(x, y) {
  return { x, y };
}

function polyIsContained(rect, poly) {
  for (let i = 0; i < rect.length; i++) {
    const p1 = rect[i];
    const p2 = rect[i + 1 === rect.length ? 0 : i + 1];
    for (let j = 0; j < poly.length; j++) {
      const p3 = poly[j];
      const p4 = poly[j + 1 === poly.length ? 0 : j + 1];

      if (doLinesIntersect(p1, p2, p3, p4)) {
        return false;
      }
    }
  }

  return true;
}

// https://www.reddit.com/r/algorithms/comments/9moad4/what_is_the_simplest_to_implement_line_segment/
// https://github.com/vlecomte/cp-geo
function doLinesIntersect(p1, p2, p3, p4) {
  function cross(p1, p2) {
    return p1.x * p2.y - p1.y * p2.x;
  }

  function orient(p1, p2, p3) {
    const a = { x: p2.x - p1.x, y: p2.y - p1.y };
    const b = { x: p3.x - p1.x, y: p3.y - p1.y };

    return cross(a, b);
  }

  const oa = orient(p3, p4, p1);
  const ob = orient(p3, p4, p2);
  const oc = orient(p1, p2, p3);
  const od = orient(p1, p2, p4);

  return oa * ob < 0 && oc * od < 0;
}

module.exports = solution;
