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
let pressed = false;
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
}

function mousePressed() {
  // Distance from mouse to center of marker
  distance = dist(mouseX, mouseY, markerX, markerY);
  acceptedDistance = 2 * radiusMarker;

  if (distance < acceptedDistance) {
    overMarker = true;
  } else {
    overMarker = false;
  }

  locked = overMarker;

  xOffset = mouseX - markerX;
  yOffset = mouseY - markerY;
}

function mouseDragged() {
  if (locked) {
    const newMarkerX = mouseX - xOffset;
    const newMarkerY = mouseY - yOffset;

    if (isInsideWheel(newMarkerX, newMarkerY)) {
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
    angle = getAngleInDegrees(markerX, markerY);
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
  strokeWeight(0.8);
  textSize(14);
  textFont("Roboto");

  text("excited", originX + 20, originY - 110);
  text("delighted", originX + 60, originY - 70);
  text("happy", originX + 90, originY - 20);
  text("content", originX + 80, originY + 30);
  text("relaxed", originX + 60, originY + 80);
  text("calm", originX + 30, originY + 120);
  text("tired", originX - 60, originY + 120);
  text("bored", originX - 100, originY + 80);
  text("depressed", originX - 130, originY + 30);
  text("frustrated", originX - 130, originY - 20);
  text("angry", originX - 110, originY - 70);
  text("tense", originX - 60, originY - 110);
}

function drawMarker() {
  // Style
  smooth();
  strokeWeight(2);
  stroke(152, 37, 251, 200);

  if (locked || pressed) {
    fill(152, 37, 251, 100);
  } else {
    fill(152, 37, 251, 30);
  }

  const radius = locked || pressed ? 3 * radiusMarker : radiusMarker;
  const diameter = 2 * radius;

  // Draw marker circle
  ellipse(markerX, markerY, diameter, diameter);
}

// ----------
// Utils
// ----------

function isInsideWheel(x, y) {
  return (
    Math.pow(x - originX, 2) + Math.pow(y - originY, 2) <=
    Math.pow(radiusWheel, 2)
  );
}

function getClosestPointOnWheel(x, y) {
  if (isInsideWheel(x, y)) {
    return {
      x: x,
      y: y,
    };
  }

  return {
    x: originX + (radiusWheel * (x - originX)) / dist(x, y, originX, originY),
    y: originY + (radiusWheel * (y - originY)) / dist(x, y, originX, originY),
  };
}

function translateToValence(x) {
  return int(((x - wheelMarginX) / diameterWheel) * 100);
}

function translateToArousal(y) {
  return 100 - int(((y - wheelMarginY) / diameterWheel) * 100);
}

function translateToCanvasX(valence) {
  return wheelMarginX + (valence / 100) * diameterWheel;
}

function translateToCanvasY(arousal) {
  return wheelMarginY + diameterWheel - (arousal / 100) * diameterWheel;
}

function getAngleInDegrees(x, y) {
  x = x - originX;
  y = y - originY;

  if (x < 0) {
    return 270 - (Math.atan(y / -x) * 180) / Math.PI;
  }

  return 90 + (Math.atan(y / x) * 180) / Math.PI;
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
