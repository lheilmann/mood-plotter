// NOTE: `valence` and `arousal` are available as global variables here.

const canvasWidth = 360;
const canvasHeight = canvasWidth;

// IMPORTANT: The order of the moods is crucial for the color generation.
const moods = [
  "exicted",
  "delighted",
  "happy",
  "content",
  "relaxed",
  "calm",
  "tired",
  "bored",
  "depressed",
  "frustrated",
  "angry",
  "tense",
];

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("sketch");

  // Background
  const backgroundOpacity = 50;
  const secondaryColor = getSecondaryColor(backgroundOpacity);
  background(secondaryColor);

  // Patterns
  drawCurvePattern();
  drawShapePattern();
}

function draw() {
  // Nothing dynamic/interactive really
}

// ----------
// Patterns
// ----------

function drawCurvePattern() {
  // Parameters
  const numberOfCurves = getNumberOfCurves();

  for (let i = 0; i < numberOfCurves; i++) {
    // More parameters (with small variances around a base value)
    const weight = getStrokeWeight();
    const primaryColor = getPrimaryColor();
    const secondaryColor = getSecondaryColor();
    // shadowOffsets, shadowBlur

    // Styling
    stroke(primaryColor);
    strokeWeight(weight);
    drawingContext.shadowOffsetX = 5;
    drawingContext.shadowOffsetY = 5;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = color(secondaryColor);

    // Drawing
    drawRandomCurve();
  }
}

function drawShapePattern() {
  // Parameters
  const numberOfShapes = getNumberOfShapes();
  const shapeType = getShapeType();

  for (let i = 0; i < numberOfShapes; i++) {
    // More parameters (with small variances around a base value)
    const shapeSize = getShapeSize();
    const weight = getStrokeWeight();
    const primaryColor = getPrimaryColor();
    const secondaryColor = getSecondaryColor();
    const borderRadius = getBorderRadius();
    // rotation
    // shouldFill
    // shadowSize, shadowBlur
    // borderRadius

    // Styling
    stroke(primaryColor);
    strokeWeight(weight);

    drawingContext.shadowOffsetX = 3;
    drawingContext.shadowOffsetY = 3;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = color(secondaryColor);

    const anchorPoint = getRandomPoint();

    // Drawing
    if (shapeType === "circle") {
      ellipse(anchorPoint.x, anchorPoint.y, shapeSize, shapeSize);
      continue;
    }

    if (shapeType === "rounded rect") {
      rect(anchorPoint.x, anchorPoint.y, shapeSize, shapeSize, borderRadius);
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

function getNumberOfShapes() {
  const baseNumber = arousal;
  return random(Math.max(baseNumber - 5, 1), Math.min(baseNumber + 5, 100));
}

function getNumberOfCurves() {
  const baseNumber = arousal / 2;
  return random(Math.max(baseNumber - 5, 1), Math.min(baseNumber + 5, 100));
}

function getShapeType() {
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

/**
 * Only applied to "rounded rect" shape type
 *
 * Return value in range [0, 10]
 */
function getBorderRadius() {
  return (arousal - 50) / 2 / 4 + ((valence / 10) * 3) / 4;
}

function getShapeSize() {
  const baseSize = (100 - arousal) / 3 + valence / 3;
  return random(Math.max(baseSize - 1, 1), Math.min(baseSize + 1, 20));
}

function getStrokeWeight() {
  const baseWeight =
    ((((100 - arousal) * 3) / 10 + (valence * 5) / 10) / 100) * 15;
  console.log(baseWeight);
  return random(Math.max(baseWeight - 1, 1), Math.min(baseWeight + 1, 18));
}

function getOpacity() {
  const baseOpacity = parseInt(arousal) + 100;
  return random(Math.max(baseOpacity - 20, 1), Math.min(baseOpacity + 20, 255));
}

function getPrimaryColor() {
  const baseMood = getBaseMood();
  return getColorByMood(baseMood);
}

function getSecondaryColors(opacity = getOpacity()) {
  const adjacentMoods = getAdjacentMoods();
  return adjacentMoods.map((mood) => getColorByMood(mood, opacity));
}

function getSecondaryColor(opacity = getOpacity()) {
  const colors = getSecondaryColors(opacity);
  const randomiser = Math.random(100);

  if (randomiser >= 75) {
    // Return first secondary color (closest adjacent mood) with 75% probability
    return colors[0];
  }
  // Return second secondary color (second closest adjacent mood) with 25% probability
  return colors[1];
}

function getColorByMood(mood, opacity = getOpacity()) {
  let baseColor;

  if (mood === "excited") {
    baseColor = [250, 175, 77];
  } else if (mood === "delighted") {
    baseColor = [242, 234, 83];
  } else if (mood === "happy") {
    baseColor = [238, 89, 51];
  } else if (mood === "content") {
    baseColor = [184, 187, 214];
  } else if (mood === "relaxed") {
    baseColor = [196, 142, 188];
  } else if (mood === "calm") {
    baseColor = [125, 99, 167];
  } else if (mood === "tired") {
    baseColor = [73, 191, 188];
  } else if (mood === "bored") {
    baseColor = [39, 127, 156];
  } else if (mood === "depressed") {
    baseColor = [37, 66, 121];
  } else if (mood === "frustrated") {
    baseColor = [100, 113, 52];
  } else if (mood === "angry") {
    baseColor = [62, 62, 63];
  } else {
    // "tense"
    baseColor = [135, 90, 36];
  }

  // Randomise
  const red = random(
    Math.max(baseColor[0] - 20, 0),
    Math.min(baseColor[0] + 20, 255)
  );
  const green = random(
    Math.max(baseColor[1] - 20, 0),
    Math.min(baseColor[1] + 20, 255)
  );
  const blue = random(
    Math.max(baseColor[2] - 20, 0),
    Math.min(baseColor[2] + 20, 255)
  );
  return color(red, green, blue, opacity);
}

function getBaseMood() {
  const moodIndex = Math.round((angle / 360) * 12) - 1;
  return moods[moodIndex];
}

function getAdjacentMoods() {
  const moodIndex = Math.round((angle / 360) * 12) - 1;
  const remainder = ((angle / 360) * 12) % 1;

  let primary, secondary;

  if (remainder >= 0.5) {
    primary = moodIndex + 1;
    secondary = moodIndex - 1;
  } else {
    primary = moodIndex - 1;
    secondary = moodIndex + 1;
  }

  // Ensure that indices are in [0, 11] interval
  primary = Math.min(primary, 11);
  primary = Math.max(primary, 0);
  secondary = Math.min(secondary, 11);
  secondary = Math.max(secondary, 0);

  return [moods[primary], moods[secondary]];
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

// ----------
// Overrrides
// ----------

function rotatedTriangle(x1, y1, x2, y2, x3, y3) {
  const theta = 280;
  console.log(theta);

  console.log(
    Math.cos(theta) * x1 - Math.sin(theta) * y1,
    Math.sin(theta) * x1 + Math.cos(theta) * y1,
    Math.cos(theta) * x2 - Math.sin(theta) * y2,
    Math.sin(theta) * x2 + Math.cos(theta) * y2,
    Math.cos(theta) * x3 - Math.sin(theta) * y3,
    Math.sin(theta) * x3 + Math.cos(theta) * y3
  );
  return triangle(
    Math.cos(theta) * x1 - Math.sin(theta) * y1,
    Math.sin(theta) * x1 + Math.cos(theta) * y1,
    Math.cos(theta) * x2 - Math.sin(theta) * y2,
    Math.sin(theta) * x2 + Math.cos(theta) * y2,
    Math.cos(theta) * x3 - Math.sin(theta) * y3,
    Math.sin(theta) * x3 + Math.cos(theta) * y3
  );
}
