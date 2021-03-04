// const canvasWidth = 300;
// const canvasHeight = canvasWidth;

// Interval: [-50, 50]
const valence = 23;
const arousal = -12;

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("output");

  noFill();

  drawGridPattern();
  drawCurvePattern();
}

function draw() {
  // 60 times per second
}

// ----------
// Draw
// ----------

function drawCurvePattern() {
  const themeColors = {
    primary: color(random(255), random(255), random(255), 120),
    secondary: color(random(255), random(255), random(255), 255),
    tertiary: color(random(255), random(255), random(255)),
  };

  strokeWeight(15);
  stroke(themeColors.primary);

  // Shadow configuration
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = 5;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = color(themeColors.secondary);

  // Draw curve 10 times
  for (let i = 0; i < 10; i++) {
    drawCurve();
  }
}

function drawVertex() {
  p1 = getRandomPoint();
  p2 = getRandomPoint();
  p3 = getRandomPoint();
  p4 = getRandomPoint();

  return bezierVertex(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
}

function drawCurve() {
  p1 = getRandomPoint();
  p2 = getRandomPoint();
  p3 = getRandomPoint();
  p4 = getRandomPoint();

  bezier(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
}

function drawGridPattern() {
  const themeColors = {
    primary: color(random(255), random(255), random(255), 120),
    secondary: color(random(255), random(255), random(255), 255),
    tertiary: color(random(255), random(255), random(255)),
  };

  strokeWeight(10);
  stroke(themeColors.primary);

  // Shadow configuration
  drawingContext.shadowOffsetX = 3;
  drawingContext.shadowOffsetY = 3;
  drawingContext.shadowBlur = 5;
  drawingContext.shadowColor = color(themeColors.secondary);

  let grid = get2DGrid();
  console.log(grid);
  grid.map((column) =>
    column.map((point) =>
      triangle(point.x, point.y, point.x + 4, point.y, point.x + 2, point.y + 2)
    )
  );
}

// ----------
// Utils
// ----------

function getRandomPoint() {
  return {
    x: random(0, canvasWidth),
    y: random(0, canvasHeight),
  };
}

function getRandomPoints(n) {
  let points = new Array(n);

  return points.map((p) => getRandomPoint());
}

function get2DGrid() {
  const offsetX = 56;
  const offsetY = 31;

  const distanceX = 43;
  const distanceY = 27;

  const lengthX = Math.floor((canvasWidth - offsetX) / distanceX);
  const lengthY = Math.floor((canvasHeight - offsetY) / distanceY);

  const grid = new Array(lengthX);

  for (let i = 0; i < lengthX; i++) {
    grid[i] = new Array(lengthY);
    for (let j = 0; j < lengthY; j++) {
      grid[i][j] = {
        x: offsetX + i * distanceX,
        y: offsetY + j * distanceY,
      };
    }
  }

  return grid;
}
