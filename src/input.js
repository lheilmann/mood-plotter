const canvasWidth = 360;
const canvasHeight = canvasWidth;

const originX = canvasWidth / 2;
const originY = canvasHeight / 2;

const radiusOuter = 150;
const diameterOuter = 2 * radiusOuter;

const radiusInner = 10;

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("input");

  stroke(0);
  strokeWeight(2);

  innerCenterX = canvasWidth / 2;
  innerCenterY = canvasHeight / 2;
}

function draw() {
  background(255);

  // Draw outer wheel
  ellipse(originX, originY, diameterOuter, diameterOuter);

  distance = dist(mouseX, mouseY, innerCenterX, innerCenterY);

  if (distance < radiusInner) {
    overMarker = true;
  } else {
    overMarker = false;
  }

  // Draw inner marker
  ellipse(innerCenterX, innerCenterY, 2 * radiusInner, 2 * radiusInner);
}

function mousePressed() {
  xOffset = mouseX - innerCenterX;
  yOffset = mouseY - innerCenterY;
}

function mouseDragged() {
  if (overMarker) {
    innerCenterX = mouseX - xOffset;
    innerCenterY = mouseY - yOffset;
  }
}

// ----------
// Draw
// ----------

function drawLabels() {}

// ----------
// Utils
// ----------

function getPointOnCircle(origin, angle) {}
