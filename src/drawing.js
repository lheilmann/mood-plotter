const canvasWidth = 360;
const canvasHeight = canvasWidth;

// NOTE: `valence` and `arousal` are available as global variables here.

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("sketch");

  drawCurvePattern();
  drawShapePattern();
}

function draw() {}

// ----------
// Patterns
// ----------

function drawCurvePattern() {
  let numberOfCurves;

  const themeColors = {
    primary: color(random(255), random(255), random(255), 120),
    secondary: color(random(255), random(255), random(255), 255),
    tertiary: color(random(255), random(255), random(255)),
  };

  // Parameters
  const weight = chooseStrokeWeight();

  // Shadow configuration
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = 5;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = color(themeColors.secondary);

  // Draw curve 10 times
  for (let i = 0; i < 10; i++) {
    stroke(themeColors.primary);
    strokeWeight(random(weight - 1, weight + 1));

    drawRandomCurve();
  }
}

function drawShapePattern() {
  const themeColors = {
    primary: color(random(255), random(255), random(255), 120),
    secondary: color(random(255), random(255), random(255), 255),
    tertiary: color(random(255), random(255), random(255)),
  };

  // Parameters
  const numberOfShapes = chooseNumberOfShapes();
  const shapeType = chooseShapeType();
  const shapeSize = chooseShapeSize();
  const weight = chooseStrokeWeight();
  // rotation
  // shouldFill
  // strokeColor
  // shadowColor, shadowBlur

  drawingContext.shadowOffsetX = 3;
  drawingContext.shadowOffsetY = 3;
  drawingContext.shadowBlur = 5;
  drawingContext.shadowColor = color(themeColors.secondary);

  for (let i = 0; i < numberOfShapes; i++) {
    const anchorPoint = getRandomPoint();

    stroke(themeColors.primary);
    strokeWeight(random(weight - 1, weight + 1));

    if (shapeType === "circle") {
      ellipse(anchorPoint.x, anchorPoint.y, shapeSize, shapeSize);
      continue;
    }

    if (shapeType === "rounded rect") {
      rect(anchorPoint.x, anchorPoint.y, shapeSize, shapeSize, 20);
      continue;
    }

    if (shapeType === "rect") {
      rect(anchorPoint.x, anchorPoint.y, shapeSize, shapeSize);
      continue;
    }

    if (shapeType === "triangle") {
      triangle(
        anchorPoint.x,
        anchorPoint.y,
        anchorPoint.x + shapeSize,
        anchorPoint.y,
        anchorPoint.x + shapeSize / 2,
        anchorPoint.y + shapeSize / 2
      );
      continue;
    }

    if (shapeType === "line") {
      const targetPoint = getRandomPoint();
      line(anchorPoint.x, anchorPoint.y, targetPoint.x, targetPoint.y);
      continue;
    }
  }
}

// ----------
// Generation
// ----------

function chooseNumberOfShapes() {
  return arousal;
}

function chooseShapeType() {
  if (arousal < 50) {
    return "circle";
  } else if (arousal < 70) {
    return "rounded rect";
  } else if (arousal < 80) {
    return "rect";
  } else if (arousal < 90) {
    return "triangle";
  } else {
    return "line";
  }
}

function chooseShapeSize() {
  return ((100 - arousal) / 3) * 2;
}

function chooseStrokeWeight() {
  return 20 - Math.ceil(arousal / 5);
}

// ----------
// Helpers
// ----------

function drawRandomCurve() {
  noFill();

  p1 = getRandomPoint();
  p2 = getRandomPoint();
  p3 = getRandomPoint();
  p4 = getRandomPoint();

  bezier(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
}

// ----------
// Utils
// ----------

function getRandomPoint() {
  return {
    x: random(canvasWidth),
    y: random(canvasHeight),
  };
}

function getRandomPoints(n) {
  let points = new Array(n);
  return points.map((p) => getRandomPoint());
}
