const canvasWidth = 360;
const canvasHeight = canvasWidth;

const originX = canvasWidth / 2;
const originY = canvasHeight / 2;

const radiusWheel = 150;
const diameterWheel = 2 * radiusWheel;

const wheelMarginX = (canvasWidth - diameterWheel) / 2;
const wheelMarginY = (canvasHeight - diameterWheel) / 2;

const radiusMarker = 15;
const diameterMarker = 2 * radiusMarker;

let overBox = false;
let locked = false;

let markerX = translateToCanvasX(valence);
let markerY = translateToCanvasY(arousal);

// var scribble = new Scribble();

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("sketch");
}

function draw() {
  // Draw on "clean" white canvas
  background(255);

  // Draw static (outer) wheel
  drawWheel();

  // Draw dynamic (inner) marker
  drawMarker();

  // Distance from mouse to center of marker
  distance = dist(mouseX, mouseY, markerX, markerY);

  if (distance < radiusMarker) {
    overMarker = true;
  } else {
    overMarker = false;
  }
}

function mousePressed() {
  locked = overMarker;
  xOffset = mouseX - markerX;
  yOffset = mouseY - markerY;
}

function mouseDragged() {
  if (locked) {
    const newMarkerX = mouseX - xOffset;
    const newMarkerY = mouseY - yOffset;

    if (isPointInWheel(newMarkerX, newMarkerY)) {
      markerX = newMarkerX;
      markerY = newMarkerY;
    } else {
      const closestPoint = getClosestPointOnWheel(newMarkerX, newMarkerY);
      markerX = closestPoint.x;
      markerY = closestPoint.y;
    }

    // Compute valence and arousal to fit in [-50, 50] interval, update values accordingly
    valence = translateToValence(markerX);
    arousal = translateToArousal(markerY);
  }

  // Prevent default browser behaviour
  return false;
}

function mouseReleased() {
  locked = false;
}

// ----------
// Draw
// ----------

function drawWheel() {
  // General style
  smooth();
  noFill();

  // Draw axes
  stroke(150);
  strokeWeight(2);

  // Valence axis
  customLine(wheelMarginX, originY, wheelMarginX + diameterWheel, originY, 7);

  // Arousal axis
  customLine(originX, wheelMarginY, originX, wheelMarginY + diameterWheel, 7);

  // Draw outer circle
  stroke(0);
  strokeWeight(2);
  ellipse(originX, originY, diameterWheel, diameterWheel);

  // Draw labels
  stroke(150);
  strokeWeight(1);
  textSize(16);
  textFont("Roboto");

  text("excited", originX + 20, originY - 100);
  text("delighted", originX + 60, originY - 60);
  text("happy", originX + 90, originY - 20);
  text("content", originX + 80, originY + 40);
  text("relaxed", originX + 50, originY + 80);
  text("calm", originX + 20, originY + 120);
  text("tired", originX - 50, originY + 120);
  text("bored", originX - 90, originY + 80);
  text("depressed", originX - 120, originY + 40);
  text("frustrated", originX - 120, originY - 20);
  text("angry", originX - 100, originY - 60);
  text("tense", originX - 60, originY - 100);
}

function drawMarker() {
  // Style
  smooth();
  strokeWeight(2);
  stroke(255, 0, 0, 180);

  if (locked) {
    fill(255, 0, 0, 100);
  } else {
    fill(255, 0, 0, 30);
  }

  // Draw marker circle
  ellipse(markerX, markerY, diameterMarker, diameterMarker);
}

// ----------
// Utils
// ----------

function isPointInWheel(pointX, pointY) {
  return (
    Math.pow(pointX - originX, 2) + Math.pow(pointY - originY, 2) <
    Math.pow(radiusWheel, 2)
  );
}

function getClosestPointOnWheel(pointX, pointY) {
  if (isPointInWheel(pointX, pointY)) {
    return {
      x: pointX,
      y: pointY,
    };
  }

  return {
    x:
      originX +
      (radiusWheel * (pointX - originX)) /
        dist(pointX, pointY, originX, originY),
    y:
      originY +
      (radiusWheel * (pointY - originY)) /
        dist(pointX, pointY, originX, originY),
  };
}

function translateToValence(pointX) {
  return int(((pointX - wheelMarginX) / diameterWheel) * 100);
}

function translateToArousal(pointY) {
  return 100 - int(((pointY - wheelMarginY) / diameterWheel) * 100);
}

function translateToCanvasX(valence) {
  return wheelMarginX + (valence / 100) * diameterWheel;
}

function translateToCanvasY(arousal) {
  return wheelMarginY + diameterWheel - (arousal / 100) * diameterWheel;
}

// ----------
// Overrides
// ----------

/**
 * Draws advanced line based on specified style.
 *
 * Adopted from https://github.com/processing/p5.js/issues/3336#issue-383843856
 */
function customLine(x1, y1, x2, y2, delta, style = "-") {
  let distance = dist(x1, y1, x2, y2);
  let dashNumber = distance / delta;
  let xDelta = (x2 - x1) / dashNumber;
  let yDelta = (y2 - y1) / dashNumber;

  for (let i = 0; i < dashNumber; i += 2) {
    let xi1 = i * xDelta + x1;
    let yi1 = i * yDelta + y1;
    let xi2 = (i + 1) * xDelta + x1;
    let yi2 = (i + 1) * yDelta + y1;

    if (style == "-") {
      line(xi1, yi1, xi2, yi2);
    } else if (style == ".") {
      point(xi1, yi1);
    } else if (style == "o") {
      ellipse(xi1, yi1, delta / 2);
    }
  }
}
