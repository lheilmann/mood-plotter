const canvasWidth = 360;
const canvasHeight = canvasWidth;

const origin = {
  x: canvasWidth / 2,
  y: canvasHeight / 2,
};

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("input");

  stroke(0);
  strokeWeight(2);

  radiusOuter = 150;
  diameterOuter = 2 * radiusOuter;

  radiusInner = 30;

  centerX = canvasWidth / 2;
  centerY = canvasHeight / 2;
}

function draw() {
  background(255);

  // Draw outer wheel
  ellipse(origin.x, origin.y, diameterOuter, diameterOuter);

  distance = dist(mouseX, mouseY, centerX, centerY);

  if (distance < radiusInner) {
    overPointer = true;
  } else {
    overPointer = false;
  }

  // Draw the circle
  ellipse(centerX, centerY, 20, 20);
}

function mousePressed() {
  xOffset = mouseX - centerX;
  yOffset = mouseY - centerY;
}

function mouseDragged() {
  if (overPointer) {
    centerX = mouseX - xOffset;
    centerY = mouseY - yOffset;
  }
}

// function mouseReleased() {
//   locked = false;
// }

// ----------
// Draw
// ----------

// ----------
// Utils
// ----------

function getPointOnCircle(origin, angle) {}
